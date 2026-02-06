import { UserRole, HotelStatus, StarLevel, Tag, BedType, WindowType } from '../enums';

// User Model
export interface User {
  id: string;
  username: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

// Room Model
export interface Room {
  id: string;
  name: string;
  area?: number;
  bedType: BedType;
  windowType: WindowType;
  hasBreakfast: boolean;
  cancelPolicy?: string;
  priceWeekday: number;
  priceHoliday: number;
  stock: number;
  hotelId: string;
  createdAt: string;
  updatedAt: string;
}

// Hotel Model
export interface Hotel {
  id: string;
  name: string;
  starLevel: StarLevel;
  address: string;
  contactPhone?: string;
  description?: string;
  tags: Tag[];
  images: string[];
  mainImage?: string;
  status: HotelStatus;
  latitude?: number;
  longitude?: number;
  auditReason?: string;
  auditedAt?: string;
  merchantId: string;
  auditorId?: string;
  createdAt: string;
  updatedAt: string;
  // Relations
  rooms?: Room[];
  merchant?: User;
  minPrice?: number;
}

// Audit Model
export interface Audit {
  id: string;
  status: HotelStatus;
  reason?: string;
  hotelId: string;
  auditorId: string;
  createdAt: string;
  hotel?: Hotel;
  auditor?: User;
}