/**
 * Authentication Service
 * Handles all authentication-related API calls
 */

import api from './api';
import {
  AuthResponse,
  LoginCredentials,
  ProfessorRegistrationData,
  StudentRegistrationData,
  ListenerRegistrationData,
  EmailConfirmationRequest,
  PasswordResetRequest,
  PasswordResetConfirm,
  ChangePasswordRequest,
  ApiResponse,
} from '@/types';

const authService = {
  /**
   * FUNC01, FUNC02, FUNC03 - Professor registration
   * Register a new professor with UFBA email and matricula validation
   */
  async registerProfessor(data: ProfessorRegistrationData): Promise<ApiResponse<AuthResponse>> {
    const response = await api.post('/auth/register/professor', data);
    return response.data;
  },

  /**
   * FUNC01, FUNC02, FUNC03 - Doctoral student registration
   * Register a new doctoral student with UFBA email and matricula validation
   */
  async registerStudent(data: StudentRegistrationData): Promise<ApiResponse<AuthResponse>> {
    const response = await api.post('/auth/register/student', data);
    return response.data;
  },

  /**
   * FUNC05, FUNC06, FUNC07 - Listener registration
   * Register a new listener with any valid email
   */
  async registerListener(data: ListenerRegistrationData): Promise<ApiResponse<AuthResponse>> {
    const response = await api.post('/auth/register/listener', data);
    return response.data;
  },

  /**
   * FUNC03, FUNC07 - Email confirmation
   * Confirm user email with token from confirmation link
   */
  async confirmEmail(data: EmailConfirmationRequest): Promise<ApiResponse> {
    const response = await api.post('/auth/confirm-email', data);
    return response.data;
  },

  /**
   * Login with email and password
   * Returns user data and authentication tokens
   */
  async login(credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> {
    const response = await api.post('/auth/login', credentials);

    // Store tokens in localStorage
    if (response.data.success && response.data.data) {
      const { accessToken, refreshToken } = response.data.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    }

    return response.data;
  },

  /**
   * Logout current user
   * Clears tokens and session data
   */
  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } finally {
      // Clear tokens regardless of API response
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  },

  /**
   * Get current authenticated user
   */
  async getCurrentUser(): Promise<ApiResponse> {
    const response = await api.get('/auth/me');
    return response.data;
  },

  /**
   * Refresh access token using refresh token
   */
  async refreshToken(): Promise<ApiResponse<{ accessToken: string }>> {
    const refreshToken = localStorage.getItem('refreshToken');
    const response = await api.post('/auth/refresh', { refreshToken });

    if (response.data.success && response.data.data) {
      localStorage.setItem('accessToken', response.data.data.accessToken);
    }

    return response.data;
  },

  /**
   * Request password reset
   * Sends reset link to user's email
   */
  async requestPasswordReset(data: PasswordResetRequest): Promise<ApiResponse> {
    const response = await api.post('/auth/forgot-password', data);
    return response.data;
  },

  /**
   * Confirm password reset with token
   * Sets new password for user
   */
  async confirmPasswordReset(data: PasswordResetConfirm): Promise<ApiResponse> {
    const response = await api.post('/auth/reset-password', data);
    return response.data;
  },

  /**
   * Change password for logged-in user
   * Requires current password for security
   */
  async changePassword(data: ChangePasswordRequest): Promise<ApiResponse> {
    const response = await api.post('/auth/change-password', data);
    return response.data;
  },
};

export default authService;
