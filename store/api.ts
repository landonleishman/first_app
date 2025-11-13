// API Configuration
// For local development, use localhost
// For production, use your EC2 IP or Cloudflare tunnel URL

// IMPORTANT: If you're accessing from a browser on the EC2 instance, use 'http://localhost:8000/api'
// If you're accessing from a different machine or device, use the EC2's public IP
// You can also set this via environment variable: EXPO_PUBLIC_API_URL

const getApiBaseUrl = () => {
  // Check for environment variable first
  if (typeof process !== 'undefined' && process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL;
  }
  
  // Default to localhost for development
  // Change this to your EC2 public IP if accessing from outside
  return __DEV__ 
    ? 'http://localhost:8000/api'
    : 'http://your-ec2-ip:8000/api';
};

const API_BASE_URL = getApiBaseUrl();

// Log the API URL for debugging (remove in production)
if (__DEV__) {
  console.log('API Base URL:', API_BASE_URL);
}

export const API_ENDPOINTS = {
  ENTRIES: `${API_BASE_URL}/entries/`,
  ENTRY: (id: string) => `${API_BASE_URL}/entries/${id}/`,
};

export default API_BASE_URL;

