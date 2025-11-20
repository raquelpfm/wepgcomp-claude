/**
 * Serviço de usuários (Mock)
 * Gestão de usuários, aprovações e permissões
 */

import { User, UserRole, UserStatus, ApproveUserDTO, GrantPermissionsDTO, UpdateUserDTO } from '../../types';
import MockStorage from './storage';
import { delay, sendMockEmail } from './helpers';

const STORAGE_KEYS = {
  USERS: 'users',
};

export const userService = {
  /**
   * Lista todos os usuários (apenas admins)
   * FUNC35
   */
  getAllUsers: async (): Promise<User[]> => {
    await delay(200);

    const users = MockStorage.get<User[]>(STORAGE_KEYS.USERS) || [];
    return users;
  },

  /**
   * Lista usuários pendentes de aprovação (professores)
   * FUNC16
   */
  getPendingApprovals: async (): Promise<User[]> => {
    await delay(200);

    const users = MockStorage.get<User[]>(STORAGE_KEYS.USERS) || [];
    return users.filter(u => u.status === UserStatus.PENDING_APPROVAL);
  },

  /**
   * Aprova ou rejeita um professor
   * FUNC16
   */
  approveUser: async (dto: ApproveUserDTO, approverId: string): Promise<User> => {
    await delay(300);

    const { userId, approve, reason } = dto;

    const users = MockStorage.get<User[]>(STORAGE_KEYS.USERS) || [];
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
      throw new Error('Usuário não encontrado');
    }

    const user = users[userIndex];

    if (user.status !== UserStatus.PENDING_APPROVAL) {
      throw new Error('Usuário não está pendente de aprovação');
    }

    // Atualiza status
    if (approve) {
      user.status = UserStatus.ACTIVE;
      user.approvedAt = new Date().toISOString();
      user.approvedBy = approverId;

      sendMockEmail(
        user.email,
        'Cadastro aprovado - WEPGCOMP',
        `Olá ${user.name},\n\nSeu cadastro foi aprovado! Você já pode fazer login no sistema.`
      );

      console.log(`✅ User approved: ${user.email}`);
    } else {
      user.status = UserStatus.REJECTED;

      sendMockEmail(
        user.email,
        'Cadastro rejeitado - WEPGCOMP',
        `Olá ${user.name},\n\nSeu cadastro foi rejeitado.\n\nMotivo: ${reason || 'Não especificado'}`
      );

      console.log(`❌ User rejected: ${user.email}`);
    }

    user.updatedAt = new Date().toISOString();
    users[userIndex] = user;
    MockStorage.set(STORAGE_KEYS.USERS, users);

    return user;
  },

  /**
   * Remove usuário (apenas admins)
   * FUNC35
   */
  deleteUser: async (userId: string): Promise<void> => {
    await delay(200);

    const users = MockStorage.get<User[]>(STORAGE_KEYS.USERS) || [];
    const filteredUsers = users.filter(u => u.id !== userId);

    if (filteredUsers.length === users.length) {
      throw new Error('Usuário não encontrado');
    }

    MockStorage.set(STORAGE_KEYS.USERS, filteredUsers);
    console.log(`🗑️  User deleted: ${userId}`);
  },

  /**
   * Concede ou revoga permissões
   * FUNC08, FUNC10, FUNC11, FUNC12, FUNC13, FUNC14, FUNC15
   */
  grantPermissions: async (dto: GrantPermissionsDTO, granterId: string): Promise<User> => {
    await delay(300);

    const { userId, isSuperAdmin, isAdmin, isCoordinator, coordinatorOfEventId } = dto;

    const users = MockStorage.get<User[]>(STORAGE_KEYS.USERS) || [];
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
      throw new Error('Usuário não encontrado');
    }

    const user = users[userIndex];

    // FUNC14: Apenas um coordenador por edição de evento
    if (isCoordinator && coordinatorOfEventId) {
      const existingCoordinator = users.find(
        u => u.isCoordinator && u.coordinatorOfEventId === coordinatorOfEventId && u.id !== userId
      );

      if (existingCoordinator) {
        throw new Error('Já existe um coordenador para este evento');
      }
    }

    // Atualiza permissões
    if (isSuperAdmin !== undefined) {
      user.isSuperAdmin = isSuperAdmin;

      // FUNC12: Coordenador vira Super Admin automaticamente
      if (isCoordinator && !isSuperAdmin) {
        user.isSuperAdmin = true;
      }
    }

    if (isAdmin !== undefined) {
      user.isAdmin = isAdmin;

      // Super Admins são sempre admins
      if (user.isSuperAdmin && !isAdmin) {
        user.isAdmin = true;
      }

      // FUNC15: Coordenador é admin até o fim do evento
      if (user.isCoordinator && !isAdmin) {
        user.isAdmin = true;
      }
    }

    if (isCoordinator !== undefined) {
      user.isCoordinator = isCoordinator;

      if (isCoordinator && coordinatorOfEventId) {
        user.coordinatorOfEventId = coordinatorOfEventId;

        // FUNC12: Coordenador vira Super Admin automaticamente
        user.isSuperAdmin = true;
        user.isAdmin = true;
      } else {
        user.coordinatorOfEventId = undefined;
      }
    }

    user.updatedAt = new Date().toISOString();
    users[userIndex] = user;
    MockStorage.set(STORAGE_KEYS.USERS, users);

    console.log(`🔑 Permissions updated for: ${user.email}`);

    return user;
  },

  /**
   * Atualiza dados do usuário
   */
  updateUser: async (userId: string, dto: UpdateUserDTO): Promise<User> => {
    await delay(200);

    const users = MockStorage.get<User[]>(STORAGE_KEYS.USERS) || [];
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
      throw new Error('Usuário não encontrado');
    }

    const user = users[userIndex];

    // Atualiza campos permitidos
    if (dto.name) user.name = dto.name;
    if (dto.phone) user.phone = dto.phone;
    if (dto.bio) user.bio = dto.bio;
    if (dto.profileImageUrl) user.profileImageUrl = dto.profileImageUrl;

    user.updatedAt = new Date().toISOString();
    users[userIndex] = user;
    MockStorage.set(STORAGE_KEYS.USERS, users);

    return user;
  },

  /**
   * Busca usuário por ID
   */
  getUserById: async (userId: string): Promise<User | null> => {
    await delay(100);

    const users = MockStorage.get<User[]>(STORAGE_KEYS.USERS) || [];
    return users.find(u => u.id === userId) || null;
  },

  /**
   * Busca usuários por papel
   */
  getUsersByRole: async (role: UserRole): Promise<User[]> => {
    await delay(150);

    const users = MockStorage.get<User[]>(STORAGE_KEYS.USERS) || [];
    return users.filter(u => u.role === role);
  },
};

export default userService;
