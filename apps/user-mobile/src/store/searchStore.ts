import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type StarLevel = 'ECONOMY' | 'COMFORT' | 'HIGH_END' | 'LUXURY'
export type QuickTag = 'FAMILY' | 'LUXURY' | 'FREE_PARKING' | 'SEA_VIEW' | 'BREAKFAST' | 'FREE_CANCEL'

interface SearchState {
  // Location
  city: string
  location: { lat: number; lng: number } | null
  
  // Dates
  checkIn: string
  checkOut: string
  nights: number
  
  // Search
  keyword: string
  searchHistory: string[]
  
  // Filters
  priceRange: [number, number]
  starLevel: StarLevel[]
  quickTags: QuickTag[]
  
  // Actions
  setCity: (city: string) => void
  setLocation: (location: { lat: number; lng: number }) => void
  setDates: (checkIn: string, checkOut: string) => void
  setNights: (nights: number) => void
  setKeyword: (keyword: string) => void
  addSearchHistory: (keyword: string) => void
  clearSearchHistory: () => void
  setPriceRange: (range: [number, number]) => void
  toggleStarLevel: (level: StarLevel) => void
  toggleQuickTag: (tag: QuickTag) => void
  resetFilters: () => void
  resetAll: () => void
}

const getDefaultDates = () => {
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  
  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0]
  }
  
  return {
    checkIn: formatDate(tomorrow),
    checkOut: formatDate(new Date(tomorrow.getTime() + 24 * 60 * 60 * 1000)),
    nights: 1
  }
}

export const useSearchStore = create<SearchState>()(
  persist(
    (set, get) => ({
      city: '',
      location: null,
      ...getDefaultDates(),
      keyword: '',
      searchHistory: [],
      priceRange: [0, 1000],
      starLevel: [],
      quickTags: [],
      
      setCity: (city) => set({ city }),
      setLocation: (location) => set({ location }),
      setDates: (checkIn, checkOut) => {
        const checkInDate = new Date(checkIn)
        const checkOutDate = new Date(checkOut)
        const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))
        set({ checkIn, checkOut, nights })
      },
      setNights: (nights) => {
        const { checkIn } = get()
        const checkInDate = new Date(checkIn)
        const checkOutDate = new Date(checkInDate.getTime() + nights * 24 * 60 * 60 * 1000)
        set({ 
          nights,
          checkOut: checkOutDate.toISOString().split('T')[0]
        })
      },
      setKeyword: (keyword) => set({ keyword }),
      addSearchHistory: (keyword) => {
        if (!keyword.trim()) return
        const { searchHistory } = get()
        const newHistory = [keyword, ...searchHistory.filter(h => h !== keyword)].slice(0, 10)
        set({ searchHistory: newHistory })
      },
      clearSearchHistory: () => set({ searchHistory: [] }),
      setPriceRange: (priceRange) => set({ priceRange }),
      toggleStarLevel: (level) => {
        const { starLevel } = get()
        const exists = starLevel.includes(level)
        if (exists) {
          set({ starLevel: starLevel.filter(l => l !== level) })
        } else {
          set({ starLevel: [...starLevel, level] })
        }
      },
      toggleQuickTag: (tag) => {
        const { quickTags } = get()
        const exists = quickTags.includes(tag)
        if (exists) {
          set({ quickTags: quickTags.filter(t => t !== tag) })
        } else {
          set({ quickTags: [...quickTags, tag] })
        }
      },
      resetFilters: () => set({ 
        priceRange: [0, 1000],
        starLevel: [],
        quickTags: []
      }),
      resetAll: () => set({
        city: '',
        location: null,
        ...getDefaultDates(),
        keyword: '',
        priceRange: [0, 1000],
        starLevel: [],
        quickTags: []
      })
    }),
    {
      name: 'search-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
)