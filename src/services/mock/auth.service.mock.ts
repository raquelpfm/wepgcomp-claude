/**
 * Mock Authentication Service
 * Simulates authentication API calls for testing without backend
 */

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
  User,
  UserRole,
  UserStatus,
} from '../../types';

import { getMockStorage } from './storage';
import {
  simulateDelay,
  createSuccessResponse,
  createErrorResponse,
  generateId,
  generateMockToken,
  validateMockToken,
  isValidEmail,
  validatePassword,
} from './helpers';
import { verifyCredentials } from './data/users.data';

const storage = getMockStorage();

const mockAuthService = {
  /**
   * Register a new professor
   */
  async registerProfessor(data: ProfessorRegistrationData): Promise<ApiResponse<AuthResponse>> {
    await simulateDelay();

    // Validate email
    if (!isValidEmail(data.email)) {
      return createErrorResponse('Email inválido', { email: ['Formato de email inválido'] });
    }

    // Validate UFBA email
    if (!data.email.endsWith('@ufba.br')) {
      return createErrorResponse('Email deve ser institucional (@ufba.br)', {
        email: ['Apenas emails @ufba.br são permitidos para professores'],
      });
    }

    // Check if email already exists
    if (storage.getUserByEmail(data.email)) {
      return createErrorResponse('Email já cadastrado', {
        email: ['Este email já está em uso'],
      });
    }

    // Validate password
    const passwordValidation = validatePassword(data.password);
    if (!passwordValidation.valid) {
      return createErrorResponse('Senha inválida', {
        password: passwordValidation.errors,
      });
    }

    // Validate password confirmation
    if (data.password !== data.confirmPassword) {
      return createErrorResponse('Senhas não conferem', {
        confirmPassword: ['As senhas não conferem'],
      });
    }

    // Create new professor user (PENDING_APPROVAL status)
    const newUser: User = {
      id: generateId('user'),
      email: data.email,
      name: data.name,
      role: UserRole.PROFESSOR,
      status: UserStatus.PENDING_APPROVAL,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    storage.addUser(newUser);

    // Generate tokens
    const accessToken = generateMockToken(newUser.id, 3600);
    const refreshToken = generateMockToken(newUser.id, 86400);

    // Store tokens
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    return createSuccessResponse(
      {
        user: newUser,
        accessToken,
        refreshToken,
        expiresIn: 3600,
      },
      'Professor cadastrado com sucesso! Aguarde aprovação do administrador.'
    );
  },

  /**
   * Register a new doctoral student
   */
  async registerStudent(data: StudentRegistrationData): Promise<ApiResponse<AuthResponse>> {
    await simulateDelay();

    // Validate email
    if (!isValidEmail(data.email)) {
      return createErrorResponse('Email inválido', { email: ['Formato de email inválido'] });
    }

    // Validate UFBA email
    if (!data.email.endsWith('@ufba.br')) {
      return createErrorResponse('Email deve ser institucional (@ufba.br)', {
        email: ['Apenas emails @ufba.br são permitidos para doutorandos'],
      });
    }

    // Check if email already exists
    if (storage.getUserByEmail(data.email)) {
      return createErrorResponse('Email já cadastrado', {
        email: ['Este email já está em uso'],
      });
    }

    // Validate password
    const passwordValidation = validatePassword(data.password);
    if (!passwordValidation.valid) {
      return createErrorResponse('Senha inválida', {
        password: passwordValidation.errors,
      });
    }

    // Validate password confirmation
    if (data.password !== data.confirmPassword) {
      return createErrorResponse('Senhas não conferem', {
        confirmPassword: ['As senhas não conferem'],
      });
    }

    // Create new student user (ACTIVE status - no approval needed)
    const newUser: User = {
      id: generateId('user'),
      email: data.email,
      name: data.name,
      role: UserRole.DOCTORAL_STUDENT,
      status: UserStatus.ACTIVE,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    storage.addUser(newUser);

    // Generate tokens
    const accessToken = generateMockToken(newUser.id, 3600);
    const refreshToken = generateMockToken(newUser.id, 86400);

    // Store tokens
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    return createSuccessResponse(
      {
        user: newUser,
        accessToken,
        refreshToken,
        expiresIn: 3600,
      },
      'Doutorando cadastrado com sucesso!'
    );
  },

  /**
   * Register a new listener
   */
  async registerListener(data: ListenerRegistrationData): Promise<ApiResponse<AuthResponse>> {
    await simulateDelay();

    // Validate email
    if (!isValidEmail(data.email)) {
      return createErrorResponse('Email inválido', { email: ['Formato de email inválido'] });
    }

    // Check if email already exists
    if (storage.getUserByEmail(data.email)) {
      return createErrorResponse('Email já cadastrado', {
        email: ['Este email já está em uso'],
      });
    }

    // Validate password
    const passwordValidation = validatePassword(data.password);
    if (!passwordValidation.valid) {
      return createErrorResponse('Senha inválida', {
        password: passwordValidation.errors,
      });
    }

    // Validate password confirmation
    if (data.password !== data.confirmPassword) {
      return createErrorResponse('Senhas não conferem', {
        confirmPassword: ['As senhas não conferem'],
      });
    }

    // Create new listener user (ACTIVE status - no approval needed)
    const newUser: User = {
      id: generateId('user'),
      email: data.email,
      name: data.name,
      role: UserRole.LISTENER,
      status: UserStatus.ACTIVE,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    storage.addUser(newUser);

    // Generate tokens
    const accessToken = generateMockToken(newUser.id, 3600);
    const refreshToken = generateMockToken(newUser.id, 86400);

    // Store tokens
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    return createSuccessResponse(
      {
        user: newUser,
        accessToken,
        refreshToken,
        expiresIn: 3600,
      },
      'Ouvinte cadastrado com sucesso!'
    );
  },

  /**
   * Confirm email (mock - always succeeds)
   */
  async confirmEmail(_data: EmailConfirmationRequest): Promise<ApiResponse> {
    await simulateDelay();
    return createSuccessResponse(null, 'Email confirmado com sucesso!');
  },

  /**
   * Login with credentials
   */
  async login(credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> {
    await simulateDelay();

    // Verify credentials
    const user = verifyCredentials(credentials.email, credentials.password);

    if (!user) {
      return createErrorResponse('Credenciais inválidas', {
        email: ['Email ou senha incorretos'],
      });
    }

    // Check if user is blocked (pending approval)
    if (user.status === UserStatus.PENDING_APPROVAL) {
      return createErrorResponse(
        'Usuário aguardando aprovação',
        {
          status: ['Seu cadastro ainda está aguardando aprovação do administrador'],
        }
      );
    }

    if (user.status === UserStatus.REJECTED) {
      return createErrorResponse(
        'Usuário rejeitado',
        {
          status: ['Seu cadastro foi rejeitado pelo administrador'],
        }
      );
    }

    if (user.status === UserStatus.INACTIVE) {
      return createErrorResponse(
        'Usuário inativo',
        {
          status: ['Sua conta está inativa. Entre em contato com o administrador'],
        }
      );
    }

    // Generate tokens
    const accessToken = generateMockToken(user.id, 3600);
    const refreshToken = generateMockToken(user.id, 86400);

    // Store tokens
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    return createSuccessResponse({
      user,
      accessToken,
      refreshToken,
      expiresIn: 3600,
    });
  },

  /**
   * Logout
   */
  async logout(): Promise<void> {
    await simulateDelay(100);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },

  /**
   * Get current authenticated user
   */
  async getCurrentUser(): Promise<ApiResponse<User>> {
    await simulateDelay();

    const token = localStorage.getItem('accessToken');
    if (!token) {
      return createErrorResponse('Não autenticado');
    }

    const validation = validateMockToken(token);
    if (!validation.valid || !validation.userId) {
      return createErrorResponse('Token inválido ou expirado');
    }

    const user = storage.getUserById(validation.userId);
    if (!user) {
      return createErrorResponse('Usuário não encontrado');
    }

    return createSuccessResponse(user);
  },

  /**
   * Refresh access token
   */
  async refreshToken(): Promise<ApiResponse<{ accessToken: string }>> {
    await simulateDelay();

    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      return createErrorResponse('Refresh token não encontrado');
    }

    const validation = validateMockToken(refreshToken);
    if (!validation.valid || !validation.userId) {
      return createErrorResponse('Refresh token inválido ou expirado');
    }

    // Generate new access token
    const accessToken = generateMockToken(validation.userId, 3600);
    localStorage.setItem('accessToken', accessToken);

    return createSuccessResponse({ accessToken });
  },

  /**
   * Request password reset
   */
  async requestPasswordReset(data: PasswordResetRequest): Promise<ApiResponse> {
    await simulateDelay();

    const user = storage.getUserByEmail(data.email);
    if (!user) {
      // For security, always return success even if email not found
      return createSuccessResponse(
        null,
        'Se o email existir, você receberá um link de recuperação'
      );
    }

    return createSuccessResponse(
      null,
      'Link de recuperação enviado para seu email'
    );
  },

  /**
   * Confirm password reset
   */
  async confirmPasswordReset(data: PasswordResetConfirm): Promise<ApiResponse> {
    await simulateDelay();

    // Validate new password
    const passwordValidation = validatePassword(data.newPassword);
    if (!passwordValidation.valid) {
      return createErrorResponse('Senha inválida', {
        newPassword: passwordValidation.errors,
      });
    }

    // Validate password confirmation
    if (data.newPassword !== data.confirmPassword) {
      return createErrorResponse('Senhas não conferem', {
        confirmPassword: ['As senhas não conferem'],
      });
    }

    return createSuccessResponse(null, 'Senha alterada com sucesso!');
  },

  /**
   * Change password for logged-in user
   */
  async changePassword(data: ChangePasswordRequest): Promise<ApiResponse> {
    await simulateDelay();

    const token = localStorage.getItem('accessToken');
    if (!token) {
      return createErrorResponse('Não autenticado');
    }

    const validation = validateMockToken(token);
    if (!validation.valid || !validation.userId) {
      return createErrorResponse('Token inválido ou expirado');
    }

    // Validate new password
    const passwordValidation = validatePassword(data.newPassword);
    if (!passwordValidation.valid) {
      return createErrorResponse('Senha inválida', {
        newPassword: passwordValidation.errors,
      });
    }

    // Validate password confirmation
    if (data.newPassword !== data.confirmPassword) {
      return createErrorResponse('Senhas não conferem', {
        confirmPassword: ['As senhas não conferem'],
      });
    }

    return createSuccessResponse(null, 'Senha alterada com sucesso!');
  },
};

export default mockAuthService;
