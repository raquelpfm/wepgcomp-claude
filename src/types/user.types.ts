/**
 * Tipos relacionados a usuários do sistema
 */

export enum UserRole {
  LISTENER = 'LISTENER', // Ouvinte
  STUDENT = 'STUDENT', // Doutorando
  PROFESSOR = 'PROFESSOR', // Professor
  ADMIN = 'ADMIN', // Administrador
  SUPER_ADMIN = 'SUPER_ADMIN', // Super Administrador
  COORDINATOR = 'COORDINATOR', // Coordenador de Edição
}

export enum UserStatus {
  PENDING_EMAIL_CONFIRMATION = 'PENDING_EMAIL_CONFIRMATION', // Aguardando confirmação de email
  PENDING_APPROVAL = 'PENDING_APPROVAL', // Aguardando aprovação (apenas professores)
  ACTIVE = 'ACTIVE', // Ativo
  INACTIVE = 'INACTIVE', // Inativo
  REJECTED = 'REJECTED', // Rejeitado
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  status: UserStatus;
  registrationNumber?: string; // Matrícula UFBA (para professores e doutorandos)
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  emailConfirmedAt?: string; // ISO date string
  approvedAt?: string; // ISO date string - quando foi aprovado (para professores)
  approvedBy?: string; // ID do admin que aprovou

  // Permissões especiais
  isSuperAdmin: boolean;
  isAdmin: boolean;
  isCoordinator: boolean;
  coordinatorOfEventId?: string; // ID do evento que coordena

  // Informações adicionais
  profileImageUrl?: string;
  phone?: string;
  bio?: string;
}

export interface CreateUserDTO {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  registrationNumber?: string;
}

export interface UpdateUserDTO {
  name?: string;
  phone?: string;
  bio?: string;
  profileImageUrl?: string;
}

export interface ApproveUserDTO {
  userId: string;
  approve: boolean; // true = aprovar, false = rejeitar
  reason?: string; // Motivo da rejeição
}

export interface GrantPermissionsDTO {
  userId: string;
  isSuperAdmin?: boolean;
  isAdmin?: boolean;
  isCoordinator?: boolean;
  coordinatorOfEventId?: string;
}
