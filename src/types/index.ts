/**
 * Central exports for all types
 */

export * from './user.types';
export * from './presentation.types';
export * from './event.types';
export * from './certificate.types';
export * from './auth.types';

// Common API response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T = any> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Common UI state types
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

// Filter and sort options
export interface FilterOptions {
  search?: string;
  status?: string;
  role?: string;
  eventEditionId?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface SortOptions {
  field: string;
  direction: 'asc' | 'desc';
}

export interface PaginationOptions {
  page: number;
  limit: number;
}
