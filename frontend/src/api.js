import axios from 'axios';

// Create axios instance with base URL from environment variable
// Falls back to relative URLs (for local development) if not set
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000, // 60 second timeout
});

export default api;