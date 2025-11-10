/**
 * User Types and Interfaces
 * Defines all user-related types for the WEPGCOMP system
 */

// User roles in the system
export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  COORDINATOR = 'COORDINATOR',
  PROFESSOR = 'PROFESSOR',
  DOCTORAL_STUDENT = 'DOCTORAL_STUDENT',
  LISTENER = 'LISTENER',
}

// User account status
export enum UserStatus {
  PENDING_EMAIL_CONFIRMATION = 'PENDING_EMAIL_CONFIRMATION',
  PENDING_APPROVAL = 'PENDING_APPROVAL', // For professors
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  REJECTED = 'REJECTED',
}

// Base user interface
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
}

// Professor-specific fields
export interface Professor extends User {
  role: UserRole.PROFESSOR | UserRole.ADMIN | UserRole.SUPER_ADMIN | UserRole.COORDINATOR;
  matricula: string; // UFBA registration number
  isAdmin: boolean;
  isSuperAdmin: boolean;
  approvedBy?: string; // User ID of admin who approved
  approvedAt?: string;
}

// Doctoral student-specific fields
export interface DoctoralStudent extends User {
  role: UserRole.DOCTORAL_STUDENT;
  matricula: string; // UFBA registration number
  presentationId?: string; // Link to their presentation
}

// Listener-specific fields
export interface Listener extends User {
  role: UserRole.LISTENER;
}

// Union type for all user types
export type AnyUser = Professor | DoctoralStudent | Listener;

// Registration forms data
export interface ProfessorRegistrationData {
  name: string;
  email: string;
  matricula: string;
  password: string;
  confirmPassword: string;
}

export interface StudentRegistrationData {
  name: string;
  email: string;
  matricula: string;
  password: string;
  confirmPassword: string;
}

export interface ListenerRegistrationData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Login credentials
export interface LoginCredentials {
  email: string;
  password: string;
}

// User approval action
export interface UserApprovalAction {
  userId: string;
  action: 'approve' | 'reject';
  reason?: string; // Optional reason for rejection
}
