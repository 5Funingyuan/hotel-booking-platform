import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

// API Client Configuration
export interface ApiConfig {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
}

// Create API Client
export const createApiClient = (config: ApiConfig): AxiosInstance => {
  const client = axios.create({
    baseURL: config.baseURL,
    timeout: config.timeout || 10000,
    headers: {
      'Content-Type': 'application/json',
      ...config.headers,
    },
  });

  // Request interceptor
  client.interceptors.request.use(
    (config) => {
      const token = typeof window !== 'undefined' 
        ? localStorage.getItem('auth_token') 
        : null;
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor
  client.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      if (error.response?.status === 401) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth_token');
          window.location.href = '/login';
        }
      }
      
      return Promise.reject(error.response?.data || error);
    }
  );

  return client;
};

// Default API Client
let defaultClient: AxiosInstance | null = null;

export const setDefaultClient = (client: AxiosInstance) => {
  defaultClient = client;
};

export const getDefaultClient = (): AxiosInstance => {
  if (!defaultClient) {
    throw new Error('API client not initialized. Call setDefaultClient first.');
  }
  return defaultClient;
};

// Generic API methods
export const api = {
  get: (url: string, config?: AxiosRequestConfig) => 
    getDefaultClient().get(url, config),
  
  post: (url: string, data?: any, config?: AxiosRequestConfig) => 
    getDefaultClient().post(url, data, config),
  
  put: (url: string, data?: any, config?: AxiosRequestConfig) => 
    getDefaultClient().put(url, data, config),
  
  delete: (url: string, config?: AxiosRequestConfig) => 
    getDefaultClient().delete(url, config),
};