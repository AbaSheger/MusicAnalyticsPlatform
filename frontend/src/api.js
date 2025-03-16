import axios from 'axios';

// Determine if we're in production by checking the hostname
const isProduction = window.location.hostname === '79.76.48.165';

// Create axios instance with base URL based on environment
const API_BASE_URL = isProduction 
  ? 'http://79.76.48.165:8080'
  : 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000, // 60 second timeout
});

export default api;