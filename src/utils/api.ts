import axios from "axios";

// Get the base URL for client-side API calls
function getClientBaseUrl() {
  // In production on Vercel, use the current origin
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  
  // For SSR, use the environment variable
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }
  
  // Fallback to localhost for development
  return 'http://localhost:3000';
}

// Create axios instance with base configuration
export const apiClient = axios.create({
  baseURL: getClientBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout for Vercel
});

// Request interceptor to add auth token if available
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for global error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);
