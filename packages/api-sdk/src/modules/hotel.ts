import { api } from '../client';
import { 
  Hotel, 
  CreateHotelDto, 
  UpdateHotelDto, 
  AuditHotelDto,
  HotelListParams,
  PaginatedResponse 
} from '@hotel/shared-types';

export const hotelApi = {
  getList: (params?: HotelListParams): Promise<{ code: number; data: PaginatedResponse<Hotel>; message: string }> =>
    api.get('/hotels', { params }),

  getDetail: (id: string): Promise<{ code: number; data: Hotel; message: string }> =>
    api.get(`/hotels/${id}`),

  create: (data: CreateHotelDto): Promise<{ code: number; data: Hotel; message: string }> =>
    api.post('/hotels', data),

  update: (id: string, data: UpdateHotelDto): Promise<{ code: number; data: Hotel; message: string }> =>
    api.put(`/hotels/${id}`, data),

  delete: (id: string): Promise<{ code: number; data: null; message: string }> =>
    api.delete(`/hotels/${id}`),

  submitForAudit: (id: string): Promise<{ code: number; data: Hotel; message: string }> =>
    api.post(`/hotels/${id}/submit`),

  audit: (id: string, data: AuditHotelDto): Promise<{ code: number; data: Hotel; message: string }> =>
    api.post(`/hotels/${id}/audit`, data),

  offline: (id: string): Promise<{ code: number; data: Hotel; message: string }> =>
    api.post(`/hotels/${id}/offline`),

  restore: (id: string): Promise<{ code: number; data: Hotel; message: string }> =>
    api.post(`/hotels/${id}/restore`),
};