import { api } from '../client';
import { LoginDto, RegisterDto, AuthResponse } from '@hotel/shared-types';

export const authApi = {
  login: (data: LoginDto): Promise<{ code: number; data: AuthResponse; message: string }> =>
    api.post('/auth/login', data),

  register: (data: RegisterDto): Promise<{ code: number; data: any; message: string }> =>
    api.post('/auth/register', data),
};