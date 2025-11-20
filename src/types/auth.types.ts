/**
 * Tipos relacionados à autenticação e autorização
 */

import { User, UserRole } from './user.types';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthToken {
  token: string;
  expiresAt: string; // ISO date string
}

export interface AuthResponse {
  user: User;
  token: AuthToken;
}

export interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  role: UserRole;
  registrationNumber?: string; // Obrigatório para professores e doutorandos
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirm {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface EmailConfirmation {
  token: string;
}

// Contexto de autenticação
export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  confirmEmail: (token: string) => Promise<void>;
  updateUser: (user: User) => void;
  hasPermission: (requiredRole: UserRole | UserRole[]) => boolean;
  isSuperAdmin: boolean;
  isAdmin: boolean;
  isCoordinator: boolean;
}
