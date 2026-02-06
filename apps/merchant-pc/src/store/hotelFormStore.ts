import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Room {
  id?: string
  name: string
  area: number
  bedType: string
  windowType: string
  hasBreakfast: boolean
  cancelPolicy: string
  priceWeekday: number
  priceHoliday: number
  stock: number
}

interface StepData {
  0: {  // 基本信息
    name?: string
    starLevel?: string
    address?: string
    contactPhone?: string
    description?: string
    tags?: string[]
    latitude?: number
    longitude?: number
  }
  1: {  // 图片
    images?: string[]
    mainImage?: string
  }
  2: {  // 房型
    rooms?: Room[]
  }
}

interface HotelFormState {
  currentStep: number
  stepData: StepData
  fileList: any[]
  
  // Actions
  setCurrentStep: (step: number) => void
  setStepData: (step: number, data: any) => void
  setFileList: (fileList: any[]) => void
  setRooms: (rooms: Room[] | ((prev: Room[]) => Room[])) => void
  resetForm: () => void
  getAllData: () => any
}

export const useHotelFormStore = create<HotelFormState>()(
  persist(
    (set, get) => ({
      currentStep: 0,
      stepData: {
        0: {},
        1: {},
        2: { rooms: [] }
      },
      fileList: [],
      
      setCurrentStep: (step) => set({ currentStep: step }),
      
      setStepData: (step, data) => set((state) => ({
        stepData: {
          ...state.stepData,
          [step]: { ...state.stepData[step as keyof StepData], ...data }
        }
      })),
      
      setFileList: (fileList) => set({ fileList }),
      
      setRooms: (rooms) => set((state) => {
        const newRooms = typeof rooms === 'function' 
          ? (rooms as (prev: Room[]) => Room[])(state.stepData[2].rooms || [])
          : rooms
        return {
          stepData: {
            ...state.stepData,
            2: { ...state.stepData[2], rooms: newRooms }
          }
        }
      }),
      
      resetForm: () => set({
        currentStep: 0,
        stepData: { 0: {}, 1: {}, 2: { rooms: [] } },
        fileList: []
      }),
      
      getAllData: () => {
        const state = get()
        const images = state.fileList
          .filter((file) => file.status === 'done')
          .map((file) => file.url || file.response?.url)
          .filter(Boolean)
        
        return {
          ...state.stepData[0],
          ...state.stepData[1],
          images,
          mainImage: images[0] || '',
          rooms: state.stepData[2].rooms || []
        }
      }
    }),
    {
      name: 'hotel-form-storage'
    }
  )
)