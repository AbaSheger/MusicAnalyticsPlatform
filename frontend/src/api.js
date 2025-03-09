import axios from 'axios';

// Create axios instance with base URL from environment variable
// Falls back to relative URLs (for local development) if not set
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000, // 20 second timeout
});

// Create a global waking up state
let isWakingUpServices = false;

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
    const maxRetries = 3;
    
    if (config.retryCount >= maxRetries) {
      notifyWakeUpStateChange(false);
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
  
  notifyWakeUpStateChange(false);
  return Promise.reject(error);
});

export default api;