/**
 * User Service
 * Handles user management API calls
 */

import api from './api';
import {
  ApiResponse,
  PaginatedResponse,
  User,
  UserApprovalAction,
  FilterOptions,
  SortOptions,
  PaginationOptions,
} from '@/types';

const userService = {
  /**
   * Get all users with filters, sorting, and pagination
   */
  async getUsers(
    filters?: FilterOptions,
    sort?: SortOptions,
    pagination?: PaginationOptions
  ): Promise<ApiResponse<PaginatedResponse<User>>> {
    const response = await api.get('/users', {
      params: {
        ...filters,
        sortBy: sort?.field,
        sortOrder: sort?.direction,
        page: pagination?.page,
        limit: pagination?.limit,
      },
    });
    return response.data;
  },

  /**
   * Get user by ID
   */
  async getUserById(userId: string): Promise<ApiResponse<User>> {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  },

  /**
   * FUNC16 - Get pending professor approvals
   * Returns list of professors awaiting approval
   */
  async getPendingProfessors(): Promise<ApiResponse<User[]>> {
    const response = await api.get('/users/professors/pending');
    return response.data;
  },

  /**
   * FUNC16, FUNC17 - Approve or reject professor registration
   * Admin action to approve/reject professor account
   */
  async approveProfessor(action: UserApprovalAction): Promise<ApiResponse> {
    const response = await api.post('/users/professors/approve', action);
    return response.data;
  },

  /**
   * FUNC08 - Grant admin privileges to user
   * Super Admin or Admin can grant admin role
   */
  async grantAdminPrivileges(userId: string): Promise<ApiResponse> {
    const response = await api.post(`/users/${userId}/grant-admin`);
    return response.data;
  },

  /**
   * FUNC10 - Grant Super Admin privileges
   * Only Super Admins can grant this role
   */
  async grantSuperAdminPrivileges(userId: string): Promise<ApiResponse> {
    const response = await api.post(`/users/${userId}/grant-super-admin`);
    return response.data;
  },

  /**
   * FUNC13, FUNC14 - Assign coordinator role to professor
   * Only one coordinator per event edition
   */
  async assignCoordinator(userId: string, eventEditionId: string): Promise<ApiResponse> {
    const response = await api.post(`/users/${userId}/assign-coordinator`, {
      eventEditionId,
    });
    return response.data;
  },

  /**
   * Remove coordinator role
   */
  async removeCoordinator(userId: string, eventEditionId: string): Promise<ApiResponse> {
    const response = await api.post(`/users/${userId}/remove-coordinator`, {
      eventEditionId,
    });
    return response.data;
  },

  /**
   * FUNC35 - Delete user
   * Remove users with incorrect registrations
   */
  async deleteUser(userId: string): Promise<ApiResponse> {
    const response = await api.delete(`/users/${userId}`);
    return response.data;
  },

  /**
   * Update user profile
   */
  async updateUser(userId: string, data: Partial<User>): Promise<ApiResponse<User>> {
    const response = await api.put(`/users/${userId}`, data);
    return response.data;
  },

  /**
   * Get users by role
   */
  async getUsersByRole(role: string): Promise<ApiResponse<User[]>> {
    const response = await api.get('/users/by-role', {
      params: { role },
    });
    return response.data;
  },

  /**
   * Search users
   */
  async searchUsers(query: string): Promise<ApiResponse<User[]>> {
    const response = await api.get('/users/search', {
      params: { q: query },
    });
    return response.data;
  },
};

export default userService;
