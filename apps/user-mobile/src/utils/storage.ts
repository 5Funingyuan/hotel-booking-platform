import Taro from '@tarojs/taro'

const STORAGE_KEY = 'hotel_storage'

export const storage = {
  // Search history
  getSearchHistory(): string[] {
    try {
      const data = Taro.getStorageSync(`${STORAGE_KEY}_search_history`)
      return data ? JSON.parse(data) : []
    } catch {
      return []
    }
  },
  
  setSearchHistory(history: string[]) {
    Taro.setStorageSync(`${STORAGE_KEY}_search_history`, JSON.stringify(history))
  },
  
  // User preferences
  getUserPrefs() {
    try {
      const data = Taro.getStorageSync(`${STORAGE_KEY}_user_prefs`)
      return data ? JSON.parse(data) : {}
    } catch {
      return {}
    }
  },
  
  setUserPrefs(prefs: any) {
    Taro.setStorageSync(`${STORAGE_KEY}_user_prefs`, JSON.stringify(prefs))
  },
  
  // Clear all
  clear() {
    Taro.clearStorage()
  }
}