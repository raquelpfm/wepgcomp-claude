/**
 * Mock User Data
 * Contains all test users with different roles and statuses
 */

import { User, UserRole, UserStatus, Professor, DoctoralStudent, Listener } from '../../../types';

// Passwords are hashed using bcrypt (these are the plain text versions for testing)
// Admin@123, Coord@123, Prof@123, Dout@123, Ouvinte@123
// @ts-ignore
const HASHED_PASSWORD = '$2a$10$XxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXx'; // Mock hash

export const mockUsers: User[] = [
  // Super Admin
  {
    id: 'user-001',
    email: 'admin@ufba.br',
    name: 'Admin Super',
    role: UserRole.SUPER_ADMIN,
    status: UserStatus.ACTIVE,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  } as Professor,

  // Coordenador
  {
    id: 'user-002',
    email: 'coordenador@ufba.br',
    name: 'Carlos Coordenador',
    role: UserRole.COORDINATOR,
    status: UserStatus.ACTIVE,
    matricula: '2023001',
    isAdmin: false,
    isSuperAdmin: false,
    approvedBy: 'user-001',
    approvedAt: '2024-02-01T09:00:00Z',
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-02-01T09:00:00Z',
  } as Professor,

  // Professor 1 (Aprovado)
  {
    id: 'user-003',
    email: 'professor1@ufba.br',
    name: 'Maria Silva',
    role: UserRole.PROFESSOR,
    status: UserStatus.ACTIVE,
    matricula: '2023002',
    isAdmin: false,
    isSuperAdmin: false,
    approvedBy: 'user-001',
    approvedAt: '2024-03-01T10:00:00Z',
    createdAt: '2024-02-15T11:00:00Z',
    updatedAt: '2024-03-01T10:00:00Z',
  } as Professor,

  // Professor 2 (Aprovado)
  {
    id: 'user-004',
    email: 'professor2@ufba.br',
    name: 'João Santos',
    role: UserRole.PROFESSOR,
    status: UserStatus.ACTIVE,
    matricula: '2023003',
    isAdmin: false,
    isSuperAdmin: false,
    approvedBy: 'user-001',
    approvedAt: '2024-03-05T14:00:00Z',
    createdAt: '2024-02-20T15:00:00Z',
    updatedAt: '2024-03-05T14:00:00Z',
  } as Professor,

  // Professor Pendente (Aguardando aprovação)
  {
    id: 'user-005',
    email: 'pendente@ufba.br',
    name: 'Ana Pendente',
    role: UserRole.PROFESSOR,
    status: UserStatus.PENDING_APPROVAL,
    matricula: '2023004',
    isAdmin: false,
    isSuperAdmin: false,
    createdAt: '2024-10-15T10:00:00Z',
    updatedAt: '2024-10-15T10:00:00Z',
  } as Professor,

  // Doutorando 1
  {
    id: 'user-006',
    email: 'doutorando1@ufba.br',
    name: 'Pedro Oliveira',
    role: UserRole.DOCTORAL_STUDENT,
    status: UserStatus.ACTIVE,
    matricula: '2021001',
    presentationId: 'pres-001',
    createdAt: '2024-08-01T09:00:00Z',
    updatedAt: '2024-08-01T09:00:00Z',
  } as DoctoralStudent,

  // Doutorando 2
  {
    id: 'user-007',
    email: 'doutorando2@ufba.br',
    name: 'Julia Costa',
    role: UserRole.DOCTORAL_STUDENT,
    status: UserStatus.ACTIVE,
    matricula: '2021002',
    presentationId: 'pres-002',
    createdAt: '2024-08-02T10:00:00Z',
    updatedAt: '2024-08-02T10:00:00Z',
  } as DoctoralStudent,

  // Doutorando 3
  {
    id: 'user-008',
    email: 'doutorando3@ufba.br',
    name: 'Lucas Ferreira',
    role: UserRole.DOCTORAL_STUDENT,
    status: UserStatus.ACTIVE,
    matricula: '2021003',
    presentationId: 'pres-003',
    createdAt: '2024-08-03T11:00:00Z',
    updatedAt: '2024-08-03T11:00:00Z',
  } as DoctoralStudent,

  // Doutorando 4
  {
    id: 'user-009',
    email: 'doutorando4@ufba.br',
    name: 'Fernanda Lima',
    role: UserRole.DOCTORAL_STUDENT,
    status: UserStatus.ACTIVE,
    matricula: '2021004',
    presentationId: 'pres-004',
    createdAt: '2024-08-04T12:00:00Z',
    updatedAt: '2024-08-04T12:00:00Z',
  } as DoctoralStudent,

  // Doutorando 5
  {
    id: 'user-010',
    email: 'doutorando5@ufba.br',
    name: 'Roberto Alves',
    role: UserRole.DOCTORAL_STUDENT,
    status: UserStatus.ACTIVE,
    matricula: '2021005',
    presentationId: 'pres-005',
    createdAt: '2024-08-05T13:00:00Z',
    updatedAt: '2024-08-05T13:00:00Z',
  } as DoctoralStudent,

  // Doutorando 6
  {
    id: 'user-011',
    email: 'doutorando6@ufba.br',
    name: 'Camila Rocha',
    role: UserRole.DOCTORAL_STUDENT,
    status: UserStatus.ACTIVE,
    matricula: '2021006',
    presentationId: 'pres-006',
    createdAt: '2024-08-06T14:00:00Z',
    updatedAt: '2024-08-06T14:00:00Z',
  } as DoctoralStudent,

  // Doutorando 7
  {
    id: 'user-012',
    email: 'doutorando7@ufba.br',
    name: 'Rafael Mendes',
    role: UserRole.DOCTORAL_STUDENT,
    status: UserStatus.ACTIVE,
    matricula: '2021007',
    presentationId: 'pres-007',
    createdAt: '2024-08-07T15:00:00Z',
    updatedAt: '2024-08-07T15:00:00Z',
  } as DoctoralStudent,

  // Doutorando 8 (sem apresentação ainda)
  {
    id: 'user-013',
    email: 'doutorando8@ufba.br',
    name: 'Beatriz Souza',
    role: UserRole.DOCTORAL_STUDENT,
    status: UserStatus.ACTIVE,
    matricula: '2021008',
    createdAt: '2024-08-08T16:00:00Z',
    updatedAt: '2024-08-08T16:00:00Z',
  } as DoctoralStudent,

  // Doutorando 9 (sem apresentação ainda)
  {
    id: 'user-014',
    email: 'doutorando9@ufba.br',
    name: 'Gabriel Martins',
    role: UserRole.DOCTORAL_STUDENT,
    status: UserStatus.ACTIVE,
    matricula: '2021009',
    createdAt: '2024-08-09T17:00:00Z',
    updatedAt: '2024-08-09T17:00:00Z',
  } as DoctoralStudent,

  // Doutorando 10
  {
    id: 'user-015',
    email: 'doutorando10@ufba.br',
    name: 'Patricia Nunes',
    role: UserRole.DOCTORAL_STUDENT,
    status: UserStatus.ACTIVE,
    matricula: '2021010',
    presentationId: 'pres-008',
    createdAt: '2024-08-10T18:00:00Z',
    updatedAt: '2024-08-10T18:00:00Z',
  } as DoctoralStudent,

  // Ouvinte 1
  {
    id: 'user-016',
    email: 'ouvinte1@gmail.com',
    name: 'Marcos Ouvinte',
    role: UserRole.LISTENER,
    status: UserStatus.ACTIVE,
    createdAt: '2024-09-01T09:00:00Z',
    updatedAt: '2024-09-01T09:00:00Z',
  } as Listener,

  // Ouvinte 2
  {
    id: 'user-017',
    email: 'ouvinte2@hotmail.com',
    name: 'Sandra Visitante',
    role: UserRole.LISTENER,
    status: UserStatus.ACTIVE,
    createdAt: '2024-09-02T10:00:00Z',
    updatedAt: '2024-09-02T10:00:00Z',
  } as Listener,

  // Ouvinte 3
  {
    id: 'user-018',
    email: 'ouvinte3@yahoo.com',
    name: 'Ricardo Externo',
    role: UserRole.LISTENER,
    status: UserStatus.ACTIVE,
    createdAt: '2024-09-03T11:00:00Z',
    updatedAt: '2024-09-03T11:00:00Z',
  } as Listener,
];

// Test credentials for easy reference
export const testCredentials = {
  superAdmin: {
    email: 'admin@ufba.br',
    password: 'Admin@123',
    userId: 'user-001',
  },
  coordinator: {
    email: 'coordenador@ufba.br',
    password: 'Coord@123',
    userId: 'user-002',
  },
  professor1: {
    email: 'professor1@ufba.br',
    password: 'Prof@123',
    userId: 'user-003',
  },
  professor2: {
    email: 'professor2@ufba.br',
    password: 'Prof@123',
    userId: 'user-004',
  },
  professorPending: {
    email: 'pendente@ufba.br',
    password: 'Prof@123',
    userId: 'user-005',
  },
  doctoral1: {
    email: 'doutorando1@ufba.br',
    password: 'Dout@123',
    userId: 'user-006',
  },
  doctoral2: {
    email: 'doutorando2@ufba.br',
    password: 'Dout@123',
    userId: 'user-007',
  },
  listener1: {
    email: 'ouvinte1@gmail.com',
    password: 'Ouvinte@123',
    userId: 'user-016',
  },
  listener2: {
    email: 'ouvinte2@hotmail.com',
    password: 'Ouvinte@123',
    userId: 'user-017',
  },
};

// Helper function to get user by email
export const getUserByEmail = (email: string): User | undefined => {
  return mockUsers.find((user) => user.email === email);
};

// Helper function to get user by ID
export const getUserById = (id: string): User | undefined => {
  return mockUsers.find((user) => user.id === id);
};

// Helper function to verify credentials
export const verifyCredentials = (email: string, password: string): User | null => {
  const user = getUserByEmail(email);
  if (!user) return null;

  // Check if password matches one of the test passwords
  const validPasswords: { [key: string]: string } = {
    'admin@ufba.br': 'Admin@123',
    'coordenador@ufba.br': 'Coord@123',
    'professor1@ufba.br': 'Prof@123',
    'professor2@ufba.br': 'Prof@123',
    'pendente@ufba.br': 'Prof@123',
    'doutorando1@ufba.br': 'Dout@123',
    'doutorando2@ufba.br': 'Dout@123',
    'doutorando3@ufba.br': 'Dout@123',
    'doutorando4@ufba.br': 'Dout@123',
    'doutorando5@ufba.br': 'Dout@123',
    'doutorando6@ufba.br': 'Dout@123',
    'doutorando7@ufba.br': 'Dout@123',
    'doutorando8@ufba.br': 'Dout@123',
    'doutorando9@ufba.br': 'Dout@123',
    'doutorando10@ufba.br': 'Dout@123',
    'ouvinte1@gmail.com': 'Ouvinte@123',
    'ouvinte2@hotmail.com': 'Ouvinte@123',
    'ouvinte3@yahoo.com': 'Ouvinte@123',
  };

  if (validPasswords[email] === password) {
    return user;
  }

  return null;
};
