// Date utilities
export const formatDate = (date: Date | string, format = 'YYYY-MM-DD'): string => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  
  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day);
};

export const addDays = (date: Date | string, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const getDaysDiff = (start: Date | string, end: Date | string): number => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffTime = endDate.getTime() - startDate.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// Validation utilities
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^1[3-9]\d{9}$/;
  return phoneRegex.test(phone);
};

// Price utilities
export const formatPrice = (price: number): string => {
  return `¥${price.toFixed(2)}`;
};

// Status utilities
export const statusMap: Record<string, { color: string; label: string }> = {
  PENDING: { color: 'gold', label: '审核中' },
  APPROVED: { color: 'green', label: '已通过' },
  REJECTED: { color: 'red', label: '不通过' },
  OFFLINE: { color: 'default', label: '已下线' },
};

export const starMap: Record<string, string> = {
  ECONOMY: '经济型',
  COMFORT: '舒适型',
  HIGH_END: '高档型',
  LUXURY: '豪华型',
};

// Storage utilities (for web)
export const storage = {
  get: (key: string): any => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },
  
  set: (key: string, value: any): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Storage set error:', error);
    }
  },
  
  remove: (key: string): void => {
    localStorage.removeItem(key);
  },
  
  clear: (): void => {
    localStorage.clear();
  },
};

// Re-export all from china-regions (lightweight version for mobile)
export * from './china-regions';