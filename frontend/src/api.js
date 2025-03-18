import axios from 'axios';
import { mockRecommendations, mockTopTracks, mockPlaybackEvents, mockSearchEvents } from './mockData';

// Update the API_BASE_URL to handle Cloudflare domain
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://music-analytics.abenezeranglo.uk";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000,
  withCredentials: true,
});

// Add request interceptor to handle credentials and CORS
api.interceptors.request.use(
  config => {
    // Ensure CORS headers are properly set
    config.headers['Access-Control-Allow-Origin'] = 'https://musicanalytics.netlify.app';
    config.headers['Access-Control-Allow-Credentials'] = 'true';
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Add response interceptor for more robust error handling
api.interceptors.response.use(
  response => {
    // Check if the response is HTML instead of JSON (likely error page)
    if (typeof response.data === 'string' && (response.data.includes('<!DOCTYPE html>') || response.data.includes('<html'))) {
      console.warn('Received HTML instead of JSON, falling back to mock data');
      // Extract the URL path to determine which mock data to return
      const path = response.config.url;
      if (path.includes('/recommendation/getAIRecommendations')) {
        return { data: mockRecommendations };
      } else if (path.includes('/statistics/topTracks')) {
        return { data: mockTopTracks };
      } else if (path.includes('/user-tracking/playbacks')) {
        return { data: mockPlaybackEvents };
      } else if (path.includes('/user-tracking/searches')) {
        return { data: mockSearchEvents };
      }
      // Default mock data if path doesn't match specific endpoints
      return { data: {} };
    }
    return response;
  },
  error => {
    console.warn('API error:', error);
    
    // Check if the error is CORS-related
    if (error.message && (
        error.message.includes('Network Error') || 
        error.message.includes('CORS') ||
        error.message.includes('Failed to fetch'))) {
      console.error('CORS or network error detected. Check backend CORS configuration.');
    }
    
    // Return mock data based on the URL path
    try {
      const url = error.config.url;
      if (url.includes('/recommendation/getAIRecommendations')) {
        return Promise.resolve({ data: mockRecommendations });
      } else if (url.includes('/statistics/topTracks')) {
        return Promise.resolve({ data: mockTopTracks });
      } else if (url.includes('/user-tracking/playbacks')) {
        return Promise.resolve({ data: mockPlaybackEvents });
      } else if (url.includes('/user-tracking/searches')) {
        return Promise.resolve({ data: mockSearchEvents });
      }
    } catch (e) {
      console.error('Error determining mock data to return:', e);
      // If we can't determine the URL, return empty data
      return Promise.resolve({ data: {} });
    }
    
    return Promise.reject(error);
  }
);

export default api;