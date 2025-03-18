import axios from 'axios';
import { mockRecommendations, mockTopTracks, mockPlaybackEvents, mockSearchEvents } from './mockData';

// Update the API_BASE_URL to handle Cloudflare domain
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://music-analytics.abenezeranglo.uk";

// Create axios instance with improved configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000,
  withCredentials: true,
});

// Detect if we're dealing with an HTML response that's causing the SyntaxError
const isHtmlResponse = (data) => {
  if (typeof data !== 'string') return false;
  return data.trim().startsWith('<!DOCTYPE html>') || 
         data.trim().startsWith('<html') || 
         data.includes('<head>') || 
         data.includes('<body>');
};

// Get the appropriate mock data based on endpoint path
const getMockDataForPath = (path) => {
  if (path.includes('/recommendation/getAIRecommendations')) {
    return mockRecommendations;
  } else if (path.includes('/statistics/topTracks')) {
    return mockTopTracks;
  } else if (path.includes('/user-tracking/playbacks')) {
    return mockPlaybackEvents;
  } else if (path.includes('/user-tracking/searches')) {
    return mockSearchEvents;
  }
  return {};
};

// Add request interceptor to properly set up CORS headers
api.interceptors.request.use(
  config => {
    // The frontend shouldn't actually need to set CORS headers
    // That's the server's job, but we can add an origin header
    config.headers['Origin'] = window.location.origin;
    return config;
  },
  error => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for more robust error handling
api.interceptors.response.use(
  response => {
    // Check if the response is HTML instead of JSON
    if (isHtmlResponse(response.data)) {
      console.warn('Received HTML instead of JSON, falling back to mock data');
      const mockData = getMockDataForPath(response.config.url);
      return { data: mockData };
    }
    return response;
  },
  error => {
    // Handle network and CORS errors
    console.warn('API error:', error);
    
    // Check if the error is CORS-related
    if (error.message && (
        error.message.includes('Network Error') || 
        error.message.includes('CORS') ||
        error.message.includes('Failed to fetch'))) {
      console.error('CORS or network error detected. Check backend CORS configuration.');
    }
    
    // Check if error response is HTML (causing the SyntaxError)
    if (error.response && isHtmlResponse(error.response.data)) {
      console.warn('Received HTML error response, falling back to mock data');
    }
    
    // Return mock data based on the URL path
    try {
      const mockData = getMockDataForPath(error.config.url);
      return Promise.resolve({ data: mockData });
    } catch (e) {
      console.error('Error determining mock data to return:', e);
      // If we can't determine the URL, return empty data
      return Promise.resolve({ data: {} });
    }
  }
);

export default api;