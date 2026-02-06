// 开发环境下优先使用当前访问的主机名（H5），小程序可通过环境变量覆盖
const DEFAULT_DEV_HOST = '127.0.0.1'
const globalProcess = typeof globalThis !== 'undefined' ? (globalThis as any).process : undefined
const env = globalProcess?.env ?? {}
const isDev =
  env.NODE_ENV === 'development' ||
  (typeof window !== 'undefined' && !env.NODE_ENV)
const devHost =
  env.TARO_APP_API_HOST ||
  (typeof window !== 'undefined'
    ? window.location.hostname || DEFAULT_DEV_HOST
    : DEFAULT_DEV_HOST)

export const API_BASE_URL = isDev
  ? `http://${devHost}:3001/api`
  : 'https://your-production-api.com/api'

export const request = async (url: string, options: any = {}) => {
  const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`
  
  const defaultOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }
  
  const mergedOptions = { ...defaultOptions, ...options }
  
  if (options.body && typeof options.body === 'object') {
    mergedOptions.body = JSON.stringify(options.body)
  }
  
  try {
    const response = await fetch(fullUrl, mergedOptions)
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed')
    }
    
    return data
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}

// Hotel APIs
export const hotelApi = {
  getList: (params?: any) => {
    const queryString = params ? '?' + new URLSearchParams(params).toString() : ''
    return request(`/hotels${queryString}`)
  },
  
  getDetail: (id: string) => {
    return request(`/hotels/${id}`)
  },
  
  getRooms: (hotelId: string) => {
    return request(`/hotels/${hotelId}/rooms`)
  }
}
