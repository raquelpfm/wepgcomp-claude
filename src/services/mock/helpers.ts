/**
 * Mock Service Helpers
 * Utility functions for mock services
 */

import { ApiResponse, PaginatedResponse } from '../../types';

/**
 * Simulates network delay
 */
export const simulateDelay = (ms: number = 300): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Creates a successful API response
 */
export const createSuccessResponse = <T>(data: T, message?: string): ApiResponse<T> => {
  return {
    success: true,
    data,
    message,
  };
};

/**
 * Creates an error API response
 */
export const createErrorResponse = (message: string, errors?: Record<string, string[]>): ApiResponse => {
  return {
    success: false,
    message,
    errors,
  };
};

/**
 * Creates a paginated response
 */
export const createPaginatedResponse = <T>(
  data: T[],
  page: number = 1,
  limit: number = 10
): PaginatedResponse<T> => {
  const total = data.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = data.slice(startIndex, endIndex);

  return {
    data: paginatedData,
    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
  };
};

/**
 * Generates a unique ID
 */
let idCounter = 1000;
export const generateId = (prefix: string = 'id'): string => {
  return `${prefix}-${++idCounter}`;
};

/**
 * Generates a JWT-like token (mock)
 */
export const generateMockToken = (userId: string, expiresIn: number = 3600): string => {
  const payload = {
    userId,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + expiresIn,
  };

  // Simple base64 encoding (not real JWT)
  return btoa(JSON.stringify(payload));
};

/**
 * Validates a mock token
 */
export const validateMockToken = (token: string): { valid: boolean; userId?: string } => {
  try {
    const payload = JSON.parse(atob(token));
    const now = Math.floor(Date.now() / 1000);

    if (payload.exp < now) {
      return { valid: false };
    }

    return { valid: true, userId: payload.userId };
  } catch {
    return { valid: false };
  }
};

/**
 * Generates a certificate number
 */
export const generateCertificateNumber = (
  eventName: string,
  type: string,
  sequence: number
): string => {
  const year = new Date().getFullYear();
  return `${eventName.toUpperCase()}-${year}-${type.toUpperCase()}-${String(sequence).padStart(3, '0')}`;
};

/**
 * Calculates average score from votes
 */
export const calculateAverageScore = (scores: number[]): number => {
  if (scores.length === 0) return 0;
  const sum = scores.reduce((acc, score) => acc + score, 0);
  return Math.round((sum / scores.length) * 10) / 10;
};

/**
 * Filters array by search term
 */
export const filterBySearch = <T>(
  items: T[],
  searchTerm: string,
  fields: (keyof T)[]
): T[] => {
  if (!searchTerm) return items;

  const lowerSearch = searchTerm.toLowerCase();
  return items.filter((item) =>
    fields.some((field) => {
      const value = item[field];
      return value && String(value).toLowerCase().includes(lowerSearch);
    })
  );
};

/**
 * Sorts array by field
 */
export const sortBy = <T>(
  items: T[],
  field: keyof T,
  direction: 'asc' | 'desc' = 'asc'
): T[] => {
  return [...items].sort((a, b) => {
    const aVal = a[field];
    const bVal = b[field];

    if (aVal === bVal) return 0;

    const comparison = aVal < bVal ? -1 : 1;
    return direction === 'asc' ? comparison : -comparison;
  });
};

/**
 * Validates email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates UFBA matricula format
 */
export const isValidMatricula = (matricula: string): boolean => {
  // Format: 7 digits
  const matriculaRegex = /^\d{7}$/;
  return matriculaRegex.test(matricula);
};

/**
 * Validates password strength
 */
export const validatePassword = (password: string): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('A senha deve ter pelo menos 8 caracteres');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('A senha deve conter pelo menos uma letra maiúscula');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('A senha deve conter pelo menos uma letra minúscula');
  }

  if (!/[0-9]/.test(password)) {
    errors.push('A senha deve conter pelo menos um número');
  }

  if (!/[^A-Za-z0-9]/.test(password)) {
    errors.push('A senha deve conter pelo menos um caractere especial');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Formats date to ISO string
 */
export const formatToISO = (date: Date): string => {
  return date.toISOString();
};

/**
 * Checks if two date ranges overlap
 */
export const dateRangesOverlap = (
  start1: Date,
  end1: Date,
  start2: Date,
  end2: Date
): boolean => {
  return start1 <= end2 && start2 <= end1;
};

/**
 * Parses time string (HH:mm) to minutes
 */
export const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

/**
 * Checks if two time ranges overlap
 */
export const timeRangesOverlap = (
  start1: string,
  end1: string,
  start2: string,
  end2: string
): boolean => {
  const start1Min = timeToMinutes(start1);
  const end1Min = timeToMinutes(end1);
  const start2Min = timeToMinutes(start2);
  const end2Min = timeToMinutes(end2);

  return start1Min < end2Min && start2Min < end1Min;
};
