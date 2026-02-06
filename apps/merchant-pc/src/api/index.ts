import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token')
      window.location.href = '/login'
    }
    return Promise.reject(error.response?.data || error)
  }
)

// Auth APIs
export const authApi = {
  login: (username: string, password: string) =>
    apiClient.post('/auth/login', { username, password }),
  
  register: (username: string, password: string, role: string) =>
    apiClient.post('/auth/register', { username, password, role }),
}

// Hotel APIs
export const hotelApi = {
  getList: (params?: any) =>
    apiClient.get('/hotels', { params }),
  
  getDetail: (id: string) =>
    apiClient.get(`/hotels/${id}`),
  
  create: (data: any) =>
    apiClient.post('/hotels', data),
  
  update: (id: string, data: any) =>
    apiClient.put(`/hotels/${id}`, data),
  
  delete: (id: string) =>
    apiClient.delete(`/hotels/${id}`),
  
  submitForAudit: (id: string) =>
    apiClient.post(`/hotels/${id}/submit`),
  
  audit: (id: string, status: string, reason?: string) =>
    apiClient.post(`/hotels/${id}/audit`, { status, reason }),
  
  offline: (id: string) =>
    apiClient.post(`/hotels/${id}/offline`),
  
  restore: (id: string) =>
    apiClient.post(`/hotels/${id}/restore`),
}

// Room APIs
export const roomApi = {
  add: (hotelId: string, data: any) =>
    apiClient.post(`/hotels/${hotelId}/rooms`, data),
  
  update: (hotelId: string, roomId: string, data: any) =>
    apiClient.put(`/hotels/${hotelId}/rooms/${roomId}`, data),
  
  delete: (hotelId: string, roomId: string) =>
    apiClient.delete(`/hotels/${hotelId}/rooms/${roomId}`),
}

export default apiClient