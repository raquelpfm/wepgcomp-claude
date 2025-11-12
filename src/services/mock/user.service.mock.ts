/**
 * Mock User Service
 * Mocks user management API endpoints for testing
 */

import {
  ApiResponse,
  PaginatedResponse,
  User,
  UserApprovalAction,
  FilterOptions,
  SortOptions,
  PaginationOptions,
  UserStatus,
} from '@/types';

import { getMockStorage } from './storage';
import {
  simulateDelay,
  createSuccessResponse,
  createErrorResponse,
  createPaginatedResponse,
  validateMockToken,
  sortBy,
  filterBySearch,
} from './helpers';

const storage = getMockStorage();

const mockUserService = {
  /**
   * Get all users with filters, sorting, and pagination
   */
  async getUsers(
    filters?: FilterOptions,
    sort?: SortOptions,
    pagination?: PaginationOptions
  ): Promise<ApiResponse<PaginatedResponse<User>>> {
    await simulateDelay();

    // Check authentication
    const token = localStorage.getItem('accessToken');
    if (!token) {
      return createErrorResponse('Não autenticado');
    }

    const validation = validateMockToken(token);
    if (!validation.valid) {
      return createErrorResponse('Token inválido ou expirado');
    }

    let users = storage.getUsers();

    // Apply filters
    if (filters?.role) {
      users = users.filter((u) => u.role === filters.role);
    }

    if (filters?.status) {
      users = users.filter((u) => u.status === filters.status);
    }

    if (filters?.search) {
      users = filterBySearch(users, filters.search, ['name', 'email']);
    }

    // Apply sorting
    if (sort?.field) {
      users = sortBy(users, sort.field as keyof User, sort.direction || 'asc');
    }

    // Apply pagination
    const page = pagination?.page || 1;
    const limit = pagination?.limit || 10;

    const paginatedResponse = createPaginatedResponse(users, page, limit);

    return createSuccessResponse(paginatedResponse);
  },

  /**
   * Get user by ID
   */
  async getUserById(userId: string): Promise<ApiResponse<User>> {
    await simulateDelay();

    const token = localStorage.getItem('accessToken');
    if (!token) {
      return createErrorResponse('Não autenticado');
    }

    const validation = validateMockToken(token);
    if (!validation.valid) {
      return createErrorResponse('Token inválido ou expirado');
    }

    const user = storage.getUserById(userId);
    if (!user) {
      return createErrorResponse('Usuário não encontrado');
    }

    return createSuccessResponse(user);
  },

  /**
   * Get pending professor approvals
   */
  async getPendingProfessors(): Promise<ApiResponse<User[]>> {
    await simulateDelay();

    const token = localStorage.getItem('accessToken');
    if (!token) {
      return createErrorResponse('Não autenticado');
    }

    const validation = validateMockToken(token);
    if (!validation.valid) {
      return createErrorResponse('Token inválido ou expirado');
    }

    const users = storage.getUsers();
    const pendingProfessors = users.filter(
      (u) => u.status === UserStatus.PENDING_APPROVAL
    );

    return createSuccessResponse(pendingProfessors);
  },

  /**
   * Approve or reject professor registration
   */
  async approveProfessor(action: UserApprovalAction): Promise<ApiResponse> {
    await simulateDelay();

    const token = localStorage.getItem('accessToken');
    if (!token) {
      return createErrorResponse('Não autenticado');
    }

    const validation = validateMockToken(token);
    if (!validation.valid) {
      return createErrorResponse('Token inválido ou expirado');
    }

    const user = storage.getUserById(action.userId);
    if (!user) {
      return createErrorResponse('Usuário não encontrado');
    }

    const status = action.action === 'approve' ? UserStatus.ACTIVE : UserStatus.REJECTED;
    const updates: Partial<User> = {
      status,
    };

    const updated = storage.updateUser(action.userId, updates);
    if (!updated) {
      return createErrorResponse('Erro ao atualizar usuário');
    }

    const message = action.action === 'approve'
      ? 'Professor aprovado com sucesso'
      : 'Professor rejeitado com sucesso';

    return createSuccessResponse(null, message);
  },

  /**
   * Grant admin privileges to user
   */
  async grantAdminPrivileges(userId: string): Promise<ApiResponse> {
    await simulateDelay();

    const token = localStorage.getItem('accessToken');
    if (!token) {
      return createErrorResponse('Não autenticado');
    }

    const validation = validateMockToken(token);
    if (!validation.valid) {
      return createErrorResponse('Token inválido ou expirado');
    }

    const user = storage.getUserById(userId);
    if (!user) {
      return createErrorResponse('Usuário não encontrado');
    }

    // In mock, we just return success - admin role is managed separately
    return createSuccessResponse(null, 'Privilégios de admin concedidos');
  },

  /**
   * Grant Super Admin privileges
   */
  async grantSuperAdminPrivileges(userId: string): Promise<ApiResponse> {
    await simulateDelay();

    const token = localStorage.getItem('accessToken');
    if (!token) {
      return createErrorResponse('Não autenticado');
    }

    const validation = validateMockToken(token);
    if (!validation.valid) {
      return createErrorResponse('Token inválido ou expirado');
    }

    const user = storage.getUserById(userId);
    if (!user) {
      return createErrorResponse('Usuário não encontrado');
    }

    // In mock, we just return success - role is managed separately
    return createSuccessResponse(
      null,
      'Privilégios de Super Admin concedidos'
    );
  },

  /**
   * Assign coordinator role to professor
   */
  async assignCoordinator(userId: string, eventEditionId: string): Promise<ApiResponse> {
    await simulateDelay();

    const token = localStorage.getItem('accessToken');
    if (!token) {
      return createErrorResponse('Não autenticado');
    }

    const validation = validateMockToken(token);
    if (!validation.valid) {
      return createErrorResponse('Token inválido ou expirado');
    }

    const user = storage.getUserById(userId);
    if (!user) {
      return createErrorResponse('Usuário não encontrado');
    }

    const event = storage.getEventById(eventEditionId);
    if (!event) {
      return createErrorResponse('Evento não encontrado');
    }

    // Update event to set the coordinator
    const updated = storage.updateEvent(eventEditionId, {
      coordinatorId: userId,
    });

    if (!updated) {
      return createErrorResponse('Erro ao atualizar coordenador');
    }

    return createSuccessResponse(null, 'Coordenador atribuído com sucesso');
  },

  /**
   * Remove coordinator role
   */
  async removeCoordinator(userId: string, eventEditionId: string): Promise<ApiResponse> {
    await simulateDelay();

    const token = localStorage.getItem('accessToken');
    if (!token) {
      return createErrorResponse('Não autenticado');
    }

    const validation = validateMockToken(token);
    if (!validation.valid) {
      return createErrorResponse('Token inválido ou expirado');
    }

    const user = storage.getUserById(userId);
    if (!user) {
      return createErrorResponse('Usuário não encontrado');
    }

    // Remove coordinator from event
    const updated = storage.updateEvent(eventEditionId, {
      coordinatorId: undefined,
    });

    if (!updated) {
      return createErrorResponse('Erro ao remover coordenador');
    }

    return createSuccessResponse(null, 'Coordenador removido com sucesso');
  },

  /**
   * Delete user
   */
  async deleteUser(userId: string): Promise<ApiResponse> {
    await simulateDelay();

    const token = localStorage.getItem('accessToken');
    if (!token) {
      return createErrorResponse('Não autenticado');
    }

    const validation = validateMockToken(token);
    if (!validation.valid) {
      return createErrorResponse('Token inválido ou expirado');
    }

    const user = storage.getUserById(userId);
    if (!user) {
      return createErrorResponse('Usuário não encontrado');
    }

    const deleted = storage.deleteUser(userId);
    if (!deleted) {
      return createErrorResponse('Erro ao deletar usuário');
    }

    return createSuccessResponse(null, 'Usuário deletado com sucesso');
  },

  /**
   * Update user profile
   */
  async updateUser(userId: string, data: Partial<User>): Promise<ApiResponse<User>> {
    await simulateDelay();

    const token = localStorage.getItem('accessToken');
    if (!token) {
      return createErrorResponse('Não autenticado');
    }

    const validation = validateMockToken(token);
    if (!validation.valid) {
      return createErrorResponse('Token inválido ou expirado');
    }

    const user = storage.getUserById(userId);
    if (!user) {
      return createErrorResponse('Usuário não encontrado');
    }

    // Prevent changing critical fields
    const { role, status, id, createdAt, ...safeData } = data;

    const updated = storage.updateUser(userId, {
      ...safeData,
      updatedAt: new Date().toISOString(),
    });

    if (!updated) {
      return createErrorResponse('Erro ao atualizar usuário');
    }

    return createSuccessResponse(updated, 'Usuário atualizado com sucesso');
  },

  /**
   * Get users by role
   */
  async getUsersByRole(role: string): Promise<ApiResponse<User[]>> {
    await simulateDelay();

    const token = localStorage.getItem('accessToken');
    if (!token) {
      return createErrorResponse('Não autenticado');
    }

    const validation = validateMockToken(token);
    if (!validation.valid) {
      return createErrorResponse('Token inválido ou expirado');
    }

    const users = storage.getUsers();
    const filteredUsers = users.filter((u) => u.role === role);

    return createSuccessResponse(filteredUsers);
  },

  /**
   * Search users
   */
  async searchUsers(query: string): Promise<ApiResponse<User[]>> {
    await simulateDelay();

    const token = localStorage.getItem('accessToken');
    if (!token) {
      return createErrorResponse('Não autenticado');
    }

    const validation = validateMockToken(token);
    if (!validation.valid) {
      return createErrorResponse('Token inválido ou expirado');
    }

    const users = storage.getUsers();
    const searchResults = filterBySearch(users, query, ['name', 'email']);

    return createSuccessResponse(searchResults);
  },
};

export default mockUserService;
