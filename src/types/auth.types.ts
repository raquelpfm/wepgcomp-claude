/**
 * Authentication Types
 * Defines authentication and authorization related types
 */

import { User, UserRole } from './user.types';

// Authentication response from API
export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresIn: number; // seconds
}

// Token payload
export interface TokenPayload {
  userId: string;
  email: string;
  role: UserRole;
  iat: number; // Issued at
  exp: number; // Expiration
}

// Email confirmation
export interface EmailConfirmationRequest {
  token: string;
}

// Password reset
export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirm {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

// Change password (when logged in)
export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// Permissions based on roles
export const RolePermissions = {
  [UserRole.SUPER_ADMIN]: [
    'manage_users',
    'manage_admins',
    'manage_events',
    'manage_presentations',
    'manage_sessions',
    'manage_certificates',
    'view_all_data',
    'delete_users',
  ],
  [UserRole.ADMIN]: [
    'manage_events',
    'manage_presentations',
    'manage_sessions',
    'manage_certificates',
    'approve_users',
    'view_all_data',
  ],
  [UserRole.COORDINATOR]: [
    'manage_events',
    'manage_presentations',
    'manage_sessions',
    'manage_certificates',
    'approve_users',
    'view_all_data',
  ],
  [UserRole.PROFESSOR]: [
    'view_presentations',
    'vote_presentations',
    'view_schedule',
  ],
  [UserRole.DOCTORAL_STUDENT]: [
    'create_presentation',
    'edit_own_presentation',
    'upload_pdf',
    'view_schedule',
  ],
  [UserRole.LISTENER]: [
    'view_presentations',
    'vote_presentations',
    'view_schedule',
  ],
} as const;

// Permission check helper type
export type Permission = typeof RolePermissions[UserRole][number];
