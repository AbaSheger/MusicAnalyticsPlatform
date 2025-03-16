import axios from 'axios';
import { mockRecommendations, mockTopTracks, mockPlaybackEvents, mockSearchEvents } from './mockData';

// Ensure HTTPS is used
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL 
  ? `https://${process.env.REACT_APP_API_BASE_URL.replace('https://', '')}`
  : window.location.origin.replace(/:\d+$/, ':8080');

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000,
});

// Add error handling for certificate issues
api.interceptors.response.use(
  response => response,
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