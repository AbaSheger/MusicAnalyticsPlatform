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

// In-memory storage for mock data when services are sleeping
const tempMockData = {
  playbackEvents: [...mockPlaybackEvents],
  searchEvents: [...mockSearchEvents],
};

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
api.interceptors.response.use(response => {
  // If we get a successful response, make sure we're not using mock data
  if (response && response.status >= 200 && response.status < 300) {
    notifyMockDataStateChange(false);
  }
  return response;
}, async error => {
  // If the error is due to server issues (503, 504, etc.)
  const isServerIssue = 
    error.response && (error.response.status >= 500 || error.response.status === 0) || 
    error.code === 'ECONNABORTED' || 
    !error.response;
  
  if (isServerIssue) {
    const { config } = error;
    
    // Don't retry if we've already retried or if maxRetries is set and exceeded
    config.retryCount = config.retryCount || 0;
    const maxRetries = 3;
    
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
        return Promise.resolve({ data: tempMockData.playbackEvents });
      } else if (config.url.includes('/user-tracking/searches')) {
        return Promise.resolve({ data: tempMockData.searchEvents });
      } else if (config.url.includes('/user-tracking/logPlayback')) {
        // Extract the playback data and add to our temporary mock storage
        const playbackData = JSON.parse(config.data);
        const newPlayback = {
          id: tempMockData.playbackEvents.length + 1,
          playback: playbackData.playback,
          timestamp: new Date().toISOString()
        };
        tempMockData.playbackEvents.unshift(newPlayback); // Add to beginning of array
        
        // Mock successful logging response
        return Promise.resolve({ 
          data: { 
            status: 'success', 
            message: 'Playback logged successfully (Mock)' 
          } 
        });
      } else if (config.url.includes('/user-tracking/logSearch')) {
        const searchData = JSON.parse(config.data);
        const newSearch = {
          id: tempMockData.searchEvents.length + 1,
          searchQuery: searchData.search,
          timestamp: new Date().toISOString()
        };
        tempMockData.searchEvents.unshift(newSearch); // Add to beginning of array
        
        // Mock successful logging response
        return Promise.resolve({ 
          data: { 
            status: 'success', 
            message: 'Search logged successfully (Mock)' 
          } 
        });
      }
      
      return Promise.reject(error);
    }
    
    // Increase retry count
    config.retryCount += 1;
    
    // Backoff strategy
    const backoff = Math.pow(1.5, config.retryCount) * 1000 + Math.random() * 1000;
    
    // Show loading state or notification to user on first retry
    if (config.retryCount === 1) {
      console.log('Services are starting up. This may take a moment...');
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
  
  return Promise.reject(error);
});

// Add request interceptor to switch back to real data when services are back
api.interceptors.request.use(async config => {
  if (useMockData) {
    // Periodically check if real services are available
    try {
      const response = await fetch(`${API_BASE_URL}/statistics/topTracks`, { 
        method: 'HEAD',
        timeout: 3000
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
export const resetMockData = () => {
  tempMockData.playbackEvents = [...mockPlaybackEvents];
  tempMockData.searchEvents = [...mockSearchEvents];
};

export default api;