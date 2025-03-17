import axios from 'axios';
import { mockRecommendations, mockTopTracks, mockPlaybackEvents, mockSearchEvents } from './mockData';

// Ensure HTTPS is used
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://romantic-snake-simple.ngrok-free.app";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000,
});

// Add error handling for certificate issues and HTML responses
api.interceptors.response.use(
  response => {
    // Check if the response is HTML instead of JSON (Ngrok warning page)
    if (typeof response.data === 'string' && response.data.includes('<!DOCTYPE html>')) {
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
    }
    return response;
  },
  error => {
    console.warn('API error:', error);
    // Return mock data based on the URL path
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
    return Promise.reject(error);
  }
);

export default api;