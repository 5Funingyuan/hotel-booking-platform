export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
  timestamp: string;
}

export const successResponse = <T>(data: T, message = 'success'): ApiResponse<T> => ({
  code: 200,
  message,
  data,
  timestamp: new Date().toISOString(),
});

export const errorResponse = (message: string, code = 500): ApiResponse => ({
  code,
  message,
  data: null,
  timestamp: new Date().toISOString(),
});