/**
 * Serviço de autenticação (Mock)
 * Simula todas as operações de autenticação sem backend real
 */

import { User, UserRole, UserStatus, LoginCredentials, RegisterData, AuthResponse } from '../../types';
import MockStorage from './storage';
import {
  delay,
  generateId,
  generateToken,
  verifyToken,
  isUFBAEmail,
  isValidEmail,
  isStrongPassword,
  hashPassword,
  verifyPassword,
  sendMockEmail,
  generateVerificationCode,
} from './helpers';
import { MOCK_USERS, MOCK_PASSWORDS } from './data/users.data';

const STORAGE_KEYS = {
  USERS: 'users',
  PASSWORDS: 'passwords',
  CURRENT_USER: 'current_user',
  AUTH_TOKEN: 'auth_token',
  VERIFICATION_TOKENS: 'verification_tokens',
};

// Inicializa o storage com dados mockados se não existirem
const initializeStorage = () => {
  if (!MockStorage.has(STORAGE_KEYS.USERS)) {
    MockStorage.set(STORAGE_KEYS.USERS, MOCK_USERS);
    MockStorage.set(STORAGE_KEYS.PASSWORDS, MOCK_PASSWORDS);
  }

  if (!MockStorage.has(STORAGE_KEYS.VERIFICATION_TOKENS)) {
    MockStorage.set(STORAGE_KEYS.VERIFICATION_TOKENS, {});
  }
};

initializeStorage();

export const authService = {
  /**
   * Realiza login do usuário
   * FUNC01, FUNC04, FUNC17
   */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    await delay(400);

    const { email, password } = credentials;

    // Validações
    if (!email || !password) {
      throw new Error('Email e senha são obrigatórios');
    }

    if (!isValidEmail(email)) {
      throw new Error('Email inválido');
    }

    // Busca usuário
    const users = MockStorage.get<User[]>(STORAGE_KEYS.USERS) || [];
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      throw new Error('Credenciais inválidas');
    }

    // Verifica senha
    const passwords = MockStorage.get<Record<string, string>>(STORAGE_KEYS.PASSWORDS) || {};
    const storedPasswordHash = passwords[user.id];

    if (!storedPasswordHash || !verifyPassword(password, storedPasswordHash)) {
      throw new Error('Credenciais inválidas');
    }

    // Verifica status do usuário
    if (user.status === UserStatus.PENDING_EMAIL_CONFIRMATION) {
      throw new Error('Por favor, confirme seu email antes de fazer login');
    }

    // FUNC04, FUNC17: Professores precisam de aprovação
    if (user.role === UserRole.PROFESSOR && user.status === UserStatus.PENDING_APPROVAL) {
      throw new Error('Sua conta ainda está aguardando aprovação dos administradores');
    }

    if (user.status === UserStatus.REJECTED) {
      throw new Error('Sua conta foi rejeitada pelos administradores');
    }

    if (user.status === UserStatus.INACTIVE) {
      throw new Error('Sua conta está inativa. Entre em contato com os administradores');
    }

    // Gera token
    const token = generateToken(user.id);
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    // Salva no storage
    MockStorage.set(STORAGE_KEYS.CURRENT_USER, user);
    MockStorage.set(STORAGE_KEYS.AUTH_TOKEN, {
      token,
      expiresAt: expiresAt.toISOString(),
    });

    console.log(`✅ Login successful: ${user.name} (${user.email})`);

    return {
      user,
      token: {
        token,
        expiresAt: expiresAt.toISOString(),
      },
    };
  },

  /**
   * Registra novo usuário
   * FUNC01, FUNC02, FUNC03, FUNC05, FUNC06, FUNC07, FUNC09
   */
  register: async (data: RegisterData): Promise<{ message: string; userId: string }> => {
    await delay(500);

    const { email, password, confirmPassword, name, role, registrationNumber } = data;

    // Validações básicas
    if (!email || !password || !name || !role) {
      throw new Error('Todos os campos obrigatórios devem ser preenchidos');
    }

    if (password !== confirmPassword) {
      throw new Error('As senhas não coincidem');
    }

    // FUNC06: Valida senha forte
    if (!isStrongPassword(password)) {
      throw new Error(
        'A senha deve ter no mínimo 8 caracteres, incluindo maiúsculas, minúsculas, números e caracteres especiais'
      );
    }

    // FUNC02: Valida email UFBA para professores e doutorandos
    if (role === UserRole.PROFESSOR || role === UserRole.STUDENT) {
      if (!isUFBAEmail(email)) {
        throw new Error('Professores e doutorandos devem usar email UFBA (@ufba.br)');
      }

      if (!registrationNumber) {
        throw new Error('Matrícula UFBA é obrigatória para professores e doutorandos');
      }
    }

    // FUNC05: Valida email para ouvintes
    if (role === UserRole.LISTENER) {
      if (!isValidEmail(email)) {
        throw new Error('Email inválido');
      }
    }

    // Verifica se email já existe
    const users = MockStorage.get<User[]>(STORAGE_KEYS.USERS) || [];
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error('Este email já está cadastrado');
    }

    // Verifica se matrícula já existe
    if (registrationNumber) {
      if (users.some(u => u.registrationNumber === registrationNumber)) {
        throw new Error('Esta matrícula já está cadastrada');
      }
    }

    // FUNC09: Primeiro professor se torna Super Admin automaticamente
    const isFirstProfessor = role === UserRole.PROFESSOR &&
                             users.filter(u => u.role === UserRole.PROFESSOR).length === 0;

    // Cria novo usuário
    const newUser: User = {
      id: generateId(),
      email,
      name,
      role,
      status: UserStatus.PENDING_EMAIL_CONFIRMATION,
      registrationNumber,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isSuperAdmin: isFirstProfessor,
      isAdmin: isFirstProfessor,
      isCoordinator: false,
    };

    // Se for o primeiro professor, já aprova automaticamente
    if (isFirstProfessor) {
      newUser.status = UserStatus.ACTIVE;
      newUser.approvedAt = new Date().toISOString();
      console.log('🌟 Primeiro professor cadastrado - Auto-aprovado como Super Admin');
    } else if (role === UserRole.PROFESSOR) {
      // Outros professores ficam pendentes de aprovação
      newUser.status = UserStatus.PENDING_APPROVAL;
      console.log('⏳ Professor cadastrado - Aguardando aprovação');
    }

    // Salva usuário
    users.push(newUser);
    MockStorage.set(STORAGE_KEYS.USERS, users);

    // Salva senha hasheada
    const passwords = MockStorage.get<Record<string, string>>(STORAGE_KEYS.PASSWORDS) || {};
    passwords[newUser.id] = hashPassword(password);
    MockStorage.set(STORAGE_KEYS.PASSWORDS, passwords);

    // FUNC03, FUNC07: Gera token de verificação de email
    const verificationToken = generateVerificationCode();
    const verificationTokens = MockStorage.get<Record<string, string>>(STORAGE_KEYS.VERIFICATION_TOKENS) || {};
    verificationTokens[verificationToken] = newUser.id;
    MockStorage.set(STORAGE_KEYS.VERIFICATION_TOKENS, verificationTokens);

    // FUNC03, FUNC07: Simula envio de email de confirmação
    sendMockEmail(
      email,
      'Confirme seu email - WEPGCOMP',
      `Olá ${name},\n\nClique no link abaixo para confirmar seu email:\nhttp://localhost:5173/confirm-email?token=${verificationToken}\n\nToken: ${verificationToken}`
    );

    return {
      message: isFirstProfessor
        ? 'Cadastro realizado com sucesso! Como primeiro professor, você foi automaticamente aprovado como Super Administrador. Verifique seu email.'
        : role === UserRole.PROFESSOR
          ? 'Cadastro realizado com sucesso! Verifique seu email e aguarde aprovação dos administradores.'
          : 'Cadastro realizado com sucesso! Verifique seu email para confirmar.',
      userId: newUser.id,
    };
  },

  /**
   * Confirma email do usuário
   * FUNC03, FUNC07
   */
  confirmEmail: async (token: string): Promise<{ message: string; user: User }> => {
    await delay(300);

    if (!token) {
      throw new Error('Token inválido');
    }

    // Busca token
    const verificationTokens = MockStorage.get<Record<string, string>>(STORAGE_KEYS.VERIFICATION_TOKENS) || {};
    const userId = verificationTokens[token];

    if (!userId) {
      throw new Error('Token inválido ou expirado');
    }

    // Busca e atualiza usuário
    const users = MockStorage.get<User[]>(STORAGE_KEYS.USERS) || [];
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
      throw new Error('Usuário não encontrado');
    }

    const user = users[userIndex];

    if (user.emailConfirmedAt) {
      throw new Error('Email já confirmado');
    }

    // Atualiza status
    user.emailConfirmedAt = new Date().toISOString();
    user.updatedAt = new Date().toISOString();

    // Se não for professor ou se for o primeiro (Super Admin), ativa a conta
    if (user.role !== UserRole.PROFESSOR || user.isSuperAdmin) {
      user.status = UserStatus.ACTIVE;
    } else {
      user.status = UserStatus.PENDING_APPROVAL;
    }

    users[userIndex] = user;
    MockStorage.set(STORAGE_KEYS.USERS, users);

    // Remove token usado
    delete verificationTokens[token];
    MockStorage.set(STORAGE_KEYS.VERIFICATION_TOKENS, verificationTokens);

    console.log(`✅ Email confirmed: ${user.email}`);

    return {
      message: user.role === UserRole.PROFESSOR && !user.isSuperAdmin
        ? 'Email confirmado! Aguarde aprovação dos administradores para fazer login.'
        : 'Email confirmado! Você já pode fazer login.',
      user,
    };
  },

  /**
   * Logout do usuário
   */
  logout: async (): Promise<void> => {
    await delay(100);

    MockStorage.remove(STORAGE_KEYS.CURRENT_USER);
    MockStorage.remove(STORAGE_KEYS.AUTH_TOKEN);

    console.log('👋 Logout successful');
  },

  /**
   * Obtém usuário atual autenticado
   */
  getCurrentUser: async (): Promise<User | null> => {
    await delay(100);

    const token = MockStorage.get<{ token: string; expiresAt: string }>(STORAGE_KEYS.AUTH_TOKEN);

    if (!token) {
      return null;
    }

    // Verifica se token é válido
    const { valid, userId } = verifyToken(token.token);

    if (!valid || !userId) {
      MockStorage.remove(STORAGE_KEYS.CURRENT_USER);
      MockStorage.remove(STORAGE_KEYS.AUTH_TOKEN);
      return null;
    }

    // Busca usuário atualizado
    const users = MockStorage.get<User[]>(STORAGE_KEYS.USERS) || [];
    const user = users.find(u => u.id === userId);

    if (!user) {
      MockStorage.remove(STORAGE_KEYS.CURRENT_USER);
      MockStorage.remove(STORAGE_KEYS.AUTH_TOKEN);
      return null;
    }

    // Atualiza cache
    MockStorage.set(STORAGE_KEYS.CURRENT_USER, user);

    return user;
  },

  /**
   * Verifica se está autenticado
   */
  isAuthenticated: async (): Promise<boolean> => {
    const user = await authService.getCurrentUser();
    return user !== null;
  },
};

export default authService;
