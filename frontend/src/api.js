import axios from 'axios';
import { 
  mockRecommendations, 
  mockAIRecommendations, 
  mockTopTracks, 
  mockPlaybackEvents, 
  mockSearchEvents 
} from './mockData';

// Create axios instance with base URL from environment variable
// Falls back to relative URLs (for local development) if not set
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000, // 60 second timeout
});

// Create a global waking up state
let isWakingUpServices = false;
let useMockData = false;

// Event emitter for wake-up state changes
const wakeUpListeners = [];
export const onWakeUpStateChange = (callback) => {
  wakeUpListeners.push(callback);
  return () => {
    const index = wakeUpListeners.indexOf(callback);
    if (index !== -1) wakeUpListeners.splice(index, 1);
  };
};

const notifyWakeUpStateChange = (state) => {
  isWakingUpServices = state;
  wakeUpListeners.forEach(callback => callback(state));
};

// Event emitter for mock data state changes
const mockDataListeners = [];
export const onMockDataStateChange = (callback) => {
  mockDataListeners.push(callback);
  callback(useMockData); // Immediately invoke with current state
  return () => {
    const index = mockDataListeners.indexOf(callback);
    if (index !== -1) mockDataListeners.splice(index, 1);
  };
};

const notifyMockDataStateChange = (state) => {
  useMockData = state;
  mockDataListeners.forEach(callback => callback(state));
};

// Add response interceptor for retry logic
api.interceptors.response.use(null, async error => {
  // If the error is due to server issues (503, 504, etc.)
  const isServerIssue = 
    error.response && (error.response.status >= 500 || error.response.status === 0) || 
    error.code === 'ECONNABORTED' || 
    !error.response;
  
  if (isServerIssue) {
    const { config } = error;
    
    // Don't retry if we've already retried or if maxRetries is set and exceeded
    config.retryCount = config.retryCount || 0;
    const maxRetries = 2;
    
    if (config.retryCount >= maxRetries) {
      notifyWakeUpStateChange(false);
      notifyMockDataStateChange(true);
      
      // Handle mock data for different API endpoints
      if (config.url.includes('/recommendation/getRecommendations')) {
        return Promise.resolve({ data: mockRecommendations });
      } else if (config.url.includes('/recommendation/getAIRecommendations')) {
        return Promise.resolve({ data: mockAIRecommendations });
      } else if (config.url.includes('/statistics/topTracks')) {
        return Promise.resolve({ data: mockTopTracks });
      } else if (config.url.includes('/user-tracking/playbacks')) {
        return Promise.resolve({ data: mockPlaybackEvents });
      } else if (config.url.includes('/user-tracking/searches')) {
        return Promise.resolve({ data: mockSearchEvents });
      } else if (config.url.includes('/user-tracking/logPlayback') || config.url.includes('/user-tracking/logSearch')) {
        // Mock successful logging responses
        return Promise.resolve({ data: { status: 'success', message: 'Logged successfully (Mock)' } });
      }
      
      return Promise.reject(error);
    }
    
    // Increase retry count
    config.retryCount += 1;
    
    // Exponential backoff delay with a bit of randomness
    const backoff = Math.pow(2, config.retryCount) * 1000 + Math.random() * 1000;
    
    // Show loading state or notification to user on first retry
    if (config.retryCount === 1) {
      console.log('Services are waking up. This may take a moment...');
      notifyWakeUpStateChange(true);
    }
    
    // Wait for backoff and retry
    await new Promise(resolve => setTimeout(resolve, backoff));
    
    // If this is the last retry, reset wake-up state
    if (config.retryCount === maxRetries - 1) {
      notifyWakeUpStateChange(false);
    }
    
    return api(config);
  }
  
  // If we get a successful response, make sure we're not using mock data
  notifyMockDataStateChange(false);
  notifyWakeUpStateChange(false);
  return Promise.reject(error);
});

// Add request interceptor to switch back to real data when services are back
api.interceptors.request.use(async config => {
  if (useMockData) {
    // Periodically check if real services are available
    try {
      const response = await fetch(`${API_BASE_URL}/statistics/topTracks`, { 
        method: 'HEAD',
        timeout: 2000
      });
      if (response.ok) {
        notifyMockDataStateChange(false);
        console.log('Real services are now available');
      }
    } catch (e) {
      // Continue using mock data
    }
  }
  return config;
}, error => Promise.reject(error));

export const isMockDataActive = () => useMockData;

export default api;