// Auth DTOs
export interface LoginDto {
  username: string;
  password: string;
}

export interface RegisterDto {
  username: string;
  password: string;
  role: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    username: string;
    role: string;
  };
}

// Hotel DTOs
export interface CreateHotelDto {
  name: string;
  starLevel: string;
  address: string;
  contactPhone?: string;
  description?: string;
  tags?: string[];
  images?: string[];
  mainImage?: string;
  latitude?: number;
  longitude?: number;
  rooms?: CreateRoomDto[];
}

export interface UpdateHotelDto {
  name?: string;
  starLevel?: string;
  address?: string;
  contactPhone?: string;
  description?: string;
  tags?: string[];
  images?: string[];
  mainImage?: string;
  latitude?: number;
  longitude?: number;
}

export interface AuditHotelDto {
  status: 'APPROVED' | 'REJECTED';
  reason?: string;
}

// Room DTOs
export interface CreateRoomDto {
  name: string;
  area?: number;
  bedType: string;
  windowType?: string;
  hasBreakfast?: boolean;
  cancelPolicy?: string;
  priceWeekday: number;
  priceHoliday: number;
  stock?: number;
}

export interface UpdateRoomDto {
  name?: string;
  area?: number;
  bedType?: string;
  windowType?: string;
  hasBreakfast?: boolean;
  cancelPolicy?: string;
  priceWeekday?: number;
  priceHoliday?: number;
  stock?: number;
}

// List DTOs
export interface HotelListParams {
  page?: number;
  limit?: number;
  status?: string;
  starLevel?: string;
  minPrice?: number;
  maxPrice?: number;
  tags?: string;
  keyword?: string;
}

export interface PaginatedResponse<T> {
  list: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}