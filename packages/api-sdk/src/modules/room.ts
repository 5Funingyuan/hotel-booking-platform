import { api } from '../client';
import { Room, CreateRoomDto, UpdateRoomDto } from '@hotel/shared-types';

export const roomApi = {
  getByHotel: (hotelId: string): Promise<{ code: number; data: Room[]; message: string }> =>
    api.get(`/hotels/${hotelId}/rooms`),

  add: (hotelId: string, data: CreateRoomDto): Promise<{ code: number; data: Room; message: string }> =>
    api.post(`/hotels/${hotelId}/rooms`, data),

  update: (hotelId: string, roomId: string, data: UpdateRoomDto): Promise<{ code: number; data: Room; message: string }> =>
    api.put(`/hotels/${hotelId}/rooms/${roomId}`, data),

  delete: (hotelId: string, roomId: string): Promise<{ code: number; data: null; message: string }> =>
    api.delete(`/hotels/${hotelId}/rooms/${roomId}`),
};