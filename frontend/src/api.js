import axios from 'axios';

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
  // Add this to handle self-signed certificate
  httpsAgent: new (require('https').Agent)({  
    rejectUnauthorized: false
  })
});

export default api;