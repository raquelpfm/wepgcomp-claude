/**
 * Mock Presentation Service
 * Mocks presentation-related API endpoints for testing
 */

import {
  ApiResponse,
  PaginatedResponse,
  Presentation,
  PresentationFormData,
  PresentationWithDetails,
  PresentationVote,
  PresentationRanking,
  FilterOptions,
  SortOptions,
  PaginationOptions,
  PresentationStatus,
} from '@/types';

import { getMockStorage } from './storage';
import {
  simulateDelay,
  createSuccessResponse,
  createErrorResponse,
  createPaginatedResponse,
  validateMockToken,
  generateId,
  calculateAverageScore,
  sortBy,
  filterBySearch,
} from './helpers';

const storage = getMockStorage();

const mockPresentationService = {
  /**
   * Get all presentations with filters
   */
  async getPresentations(
    filters?: FilterOptions,
    sort?: SortOptions,
    pagination?: PaginationOptions
  ): Promise<ApiResponse<PaginatedResponse<Presentation>>> {
    await simulateDelay();

    let presentations = storage.getPresentations();

    // Apply filters
    if (filters?.eventEditionId) {
      presentations = presentations.filter(
        (p) => p.eventEditionId === filters.eventEditionId
      );
    }

    if (filters?.status) {
      presentations = presentations.filter((p) => p.status === filters.status);
    }

    if (filters?.search) {
      presentations = filterBySearch(presentations, filters.search, [
        'title',
        'studentName',
        'abstract',
      ]);
    }

    // Apply sorting
    if (sort?.field) {
      presentations = sortBy(
        presentations,
        sort.field as keyof Presentation,
        sort.direction || 'asc'
      );
    }

    // Apply pagination
    const page = pagination?.page || 1;
    const limit = pagination?.limit || 10;

    const paginatedResponse = createPaginatedResponse(presentations, page, limit);

    return createSuccessResponse(paginatedResponse);
  },

  /**
   * Get presentation by ID with full details
   */
  async getPresentationById(presentationId: string): Promise<ApiResponse<PresentationWithDetails>> {
    await simulateDelay();

    const presentation = storage.getPresentationById(presentationId);
    if (!presentation) {
      return createErrorResponse('Apresentação não encontrada');
    }

    // Get student and session details
    const student = storage.getUserById(presentation.studentId);
    const session = presentation.sessionId ? storage.getSessionById(presentation.sessionId) : undefined;
    const room = presentation.roomId ? storage.getRoomById(presentation.roomId) : undefined;

    const presentationWithDetails: PresentationWithDetails = {
      ...presentation,
      student: student
        ? {
            id: student.id,
            name: student.name,
            email: student.email,
            matricula: (student as any).matricula || '',
          }
        : {
            id: '',
            name: '',
            email: '',
            matricula: '',
          },
      session: session
        ? {
            id: session.id,
            name: session.name,
            startTime: session.startTime,
            endTime: session.endTime,
          }
        : undefined,
      room: room
        ? {
            id: room.id,
            name: room.name,
            capacity: room.capacity,
          }
        : undefined,
    };

    return createSuccessResponse(presentationWithDetails);
  },

  /**
   * Create new presentation
   */
  async createPresentation(
    data: PresentationFormData
  ): Promise<ApiResponse<Presentation>> {
    await simulateDelay();

    const token = localStorage.getItem('accessToken');
    if (!token) {
      return createErrorResponse('Não autenticado');
    }

    const validation = validateMockToken(token);
    if (!validation.valid) {
      return createErrorResponse('Token inválido ou expirado');
    }

    if (!validation.userId) {
      return createErrorResponse('Usuário não identificado');
    }

    // Validate required fields
    if (!data.title || !data.abstract) {
      return createErrorResponse('Campos obrigatórios faltando');
    }

    // Get current user as student
    const student = storage.getUserById(validation.userId);
    if (!student) {
      return createErrorResponse('Estudante não encontrado');
    }

    // Get active event
    const event = storage.getActiveEvent();
    if (!event) {
      return createErrorResponse('Nenhum evento ativo encontrado');
    }

    // Check if student already has a presentation in this event
    const existingPresentation = storage
      .getPresentationsByEventId(event.id)
      .find((p) => p.studentId === validation.userId);

    if (existingPresentation) {
      return createErrorResponse('Você já tem uma apresentação neste evento');
    }

    const newPresentation: Presentation = {
      id: generateId('pres'),
      studentId: validation.userId,
      studentName: student.name,
      studentMatricula: (student as any).matricula || '',
      eventEditionId: event.id,
      title: data.title,
      abstract: data.abstract,
      keywords: data.keywords || [],
      advisorName: data.advisorName,
      advisorEmail: data.advisorEmail,
      suggestedDate: data.suggestedDate,
      suggestedTime: data.suggestedTime,
      duration: data.duration || 20,
      status: PresentationStatus.DRAFT,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    storage.addPresentation(newPresentation);
    return createSuccessResponse(newPresentation, 'Apresentação criada com sucesso');
  },

  /**
   * Update presentation
   */
  async updatePresentation(
    presentationId: string,
    data: Partial<PresentationFormData>
  ): Promise<ApiResponse<Presentation>> {
    await simulateDelay();

    const token = localStorage.getItem('accessToken');
    if (!token) {
      return createErrorResponse('Não autenticado');
    }

    const validation = validateMockToken(token);
    if (!validation.valid) {
      return createErrorResponse('Token inválido ou expirado');
    }

    const presentation = storage.getPresentationById(presentationId);
    if (!presentation) {
      return createErrorResponse('Apresentação não encontrado');
    }

    const updated = storage.updatePresentation(presentationId, {
      ...data,
      updatedAt: new Date().toISOString(),
    });

    if (!updated) {
      return createErrorResponse('Erro ao atualizar apresentação');
    }

    return createSuccessResponse(updated, 'Apresentação atualizada com sucesso');
  },

  /**
   * Upload presentation PDF
   */
  async uploadPDF(
    presentationId: string,
    file: File
  ): Promise<ApiResponse<{ pdfUrl: string }>> {
    await simulateDelay();

    const token = localStorage.getItem('accessToken');
    if (!token) {
      return createErrorResponse('Não autenticado');
    }

    const validation = validateMockToken(token);
    if (!validation.valid) {
      return createErrorResponse('Token inválido ou expirado');
    }

    // Validate file
    if (file.size > 10 * 1024 * 1024) {
      return createErrorResponse('Arquivo muito grande (máximo 10MB)');
    }

    if (!file.type.includes('pdf')) {
      return createErrorResponse('Apenas arquivos PDF são permitidos');
    }

    const presentation = storage.getPresentationById(presentationId);
    if (!presentation) {
      return createErrorResponse('Apresentação não encontrada');
    }

    // Mock URL for the uploaded PDF
    const pdfUrl = `/uploads/presentations/${presentationId}/${file.name}`;

    const updated = storage.updatePresentation(presentationId, {
      pdfUrl,
      updatedAt: new Date().toISOString(),
    });

    if (!updated) {
      return createErrorResponse('Erro ao fazer upload do PDF');
    }

    return createSuccessResponse({ pdfUrl }, 'PDF enviado com sucesso');
  },

  /**
   * Get presentation PDF URL
   */
  async getPDFUrl(presentationId: string): Promise<ApiResponse<{ pdfUrl: string }>> {
    await simulateDelay();

    const presentation = storage.getPresentationById(presentationId);
    if (!presentation) {
      return createErrorResponse('Apresentação não encontrada');
    }

    if (!presentation.pdfUrl) {
      return createErrorResponse('PDF não disponível para esta apresentação');
    }

    return createSuccessResponse({ pdfUrl: presentation.pdfUrl });
  },

  /**
   * Delete presentation
   */
  async deletePresentation(presentationId: string): Promise<ApiResponse> {
    await simulateDelay();

    const token = localStorage.getItem('accessToken');
    if (!token) {
      return createErrorResponse('Não autenticado');
    }

    const validation = validateMockToken(token);
    if (!validation.valid) {
      return createErrorResponse('Token inválido ou expirado');
    }

    const presentation = storage.getPresentationById(presentationId);
    if (!presentation) {
      return createErrorResponse('Apresentação não encontrada');
    }

    // Check if presentation is scheduled
    if (presentation.sessionId) {
      return createErrorResponse('Não é possível deletar uma apresentação agendada');
    }

    const deleted = storage.deletePresentation(presentationId);
    if (!deleted) {
      return createErrorResponse('Erro ao deletar apresentação');
    }

    return createSuccessResponse(null, 'Apresentação deletada com sucesso');
  },

  /**
   * Submit vote/evaluation for presentation
   */
  async votePresentation(
    presentationId: string,
    score: number,
    comment?: string
  ): Promise<ApiResponse<PresentationVote>> {
    await simulateDelay();

    const token = localStorage.getItem('accessToken');
    if (!token) {
      return createErrorResponse('Não autenticado');
    }

    const validation = validateMockToken(token);
    if (!validation.valid) {
      return createErrorResponse('Token inválido ou expirado');
    }

    if (!validation.userId) {
      return createErrorResponse('Usuário não identificado');
    }

    // Validate score
    if (score < 0 || score > 10) {
      return createErrorResponse('Score deve estar entre 0 e 10');
    }

    const presentation = storage.getPresentationById(presentationId);
    if (!presentation) {
      return createErrorResponse('Apresentação não encontrada');
    }

    // Check if user already voted
    const existingVote = storage.getUserVoteForPresentation(
      validation.userId,
      presentationId
    );

    if (existingVote) {
      // Update existing vote
      const updated = storage.updateVote(existingVote.id, {
        score,
        comment,
        votedAt: new Date().toISOString(),
      });

      if (!updated) {
        return createErrorResponse('Erro ao atualizar voto');
      }

      return createSuccessResponse(updated, 'Voto atualizado com sucesso');
    }

    // Get user info for vote
    const voter = storage.getUserById(validation.userId);

    // Create new vote
    const newVote: PresentationVote = {
      id: generateId('vote'),
      presentationId,
      userId: validation.userId,
      userName: voter?.name || 'Anonymous',
      userRole: (voter as any)?.role || 'LISTENER',
      score,
      comment,
      votedAt: new Date().toISOString(),
    };

    storage.addVote(newVote);
    return createSuccessResponse(newVote, 'Voto registrado com sucesso');
  },

  /**
   * Get votes for a presentation
   */
  async getPresentationVotes(presentationId: string): Promise<ApiResponse<PresentationVote[]>> {
    await simulateDelay();

    const presentation = storage.getPresentationById(presentationId);
    if (!presentation) {
      return createErrorResponse('Apresentação não encontrada');
    }

    const votes = storage.getVotesByPresentationId(presentationId);
    return createSuccessResponse(votes);
  },

  /**
   * Get user's vote for a presentation
   */
  async getUserVote(
    presentationId: string
  ): Promise<ApiResponse<PresentationVote | null>> {
    await simulateDelay();

    const token = localStorage.getItem('accessToken');
    if (!token) {
      return createErrorResponse('Não autenticado');
    }

    const validation = validateMockToken(token);
    if (!validation.valid) {
      return createErrorResponse('Token inválido ou expirado');
    }

    if (!validation.userId) {
      return createErrorResponse('Usuário não identificado');
    }

    const presentation = storage.getPresentationById(presentationId);
    if (!presentation) {
      return createErrorResponse('Apresentação não encontrada');
    }

    const vote = storage.getUserVoteForPresentation(validation.userId, presentationId);

    return createSuccessResponse(vote || null);
  },

  /**
   * Get presentation rankings
   */
  async getPresentationRankings(
    eventEditionId: string
  ): Promise<ApiResponse<PresentationRanking[]>> {
    await simulateDelay();

    const presentations = storage.getPresentationsByEventId(eventEditionId);
    const rankings: PresentationRanking[] = [];

    presentations.forEach((presentation) => {
      const votes = storage.getVotesByPresentationId(presentation.id);
      const scores = votes.map((v) => v.score);
      const averageScore = calculateAverageScore(scores);

      rankings.push({
        presentation,
        averageScore,
        totalVotes: votes.length,
        rank: 0, // Will be set after sorting
      });
    });

    // Sort by average score descending
    rankings.sort((a, b) => b.averageScore - a.averageScore);

    // Add rank
    rankings.forEach((r, index) => {
      r.rank = index + 1;
    });

    return createSuccessResponse(rankings);
  },

  /**
   * Get presentation by student
   */
  async getStudentPresentation(studentId: string): Promise<ApiResponse<Presentation>> {
    await simulateDelay();

    const presentations = storage.getPresentationsByStudentId(studentId);

    if (presentations.length === 0) {
      return createErrorResponse('Nenhuma apresentação encontrada para este estudante');
    }

    // Return the most recent one
    return createSuccessResponse(presentations[0]);
  },

  /**
   * Get my presentation (for current student)
   */
  async getMyPresentation(): Promise<ApiResponse<Presentation>> {
    await simulateDelay();

    const token = localStorage.getItem('accessToken');
    if (!token) {
      return createErrorResponse('Não autenticado');
    }

    const validation = validateMockToken(token);
    if (!validation.valid) {
      return createErrorResponse('Token inválido ou expirado');
    }

    if (!validation.userId) {
      return createErrorResponse('Usuário não identificado');
    }

    const presentations = storage.getPresentationsByStudentId(validation.userId);

    if (presentations.length === 0) {
      return createErrorResponse('Você não tem nenhuma apresentação');
    }

    return createSuccessResponse(presentations[0]);
  },

  /**
   * Reorder presentations in schedule
   */
  async reorderPresentations(
    sessionId: string,
    presentationIds: string[]
  ): Promise<ApiResponse> {
    await simulateDelay();

    const token = localStorage.getItem('accessToken');
    if (!token) {
      return createErrorResponse('Não autenticado');
    }

    const validation = validateMockToken(token);
    if (!validation.valid) {
      return createErrorResponse('Token inválido ou expirado');
    }

    const session = storage.getSessionById(sessionId);
    if (!session) {
      return createErrorResponse('Sessão não encontrada');
    }

    // Validate all presentations belong to this session
    const invalidIds = presentationIds.filter(
      (id) => !session.presentationIds.includes(id)
    );

    if (invalidIds.length > 0) {
      return createErrorResponse('Algumas apresentações não pertencem a esta sessão');
    }

    const updated = storage.updateSession(sessionId, {
      presentationIds,
    });

    if (!updated) {
      return createErrorResponse('Erro ao reordenar apresentações');
    }

    return createSuccessResponse(null, 'Apresentações reordenadas com sucesso');
  },

  /**
   * Submit presentation (change status from DRAFT to SUBMITTED)
   */
  async submitPresentation(presentationId: string): Promise<ApiResponse<Presentation>> {
    await simulateDelay();

    const token = localStorage.getItem('accessToken');
    if (!token) {
      return createErrorResponse('Não autenticado');
    }

    const validation = validateMockToken(token);
    if (!validation.valid) {
      return createErrorResponse('Token inválido ou expirado');
    }

    const presentation = storage.getPresentationById(presentationId);
    if (!presentation) {
      return createErrorResponse('Apresentação não encontrada');
    }

    if (presentation.status !== PresentationStatus.DRAFT) {
      return createErrorResponse('Apenas apresentações em rascunho podem ser submetidas');
    }

    // Require PDF for submission
    if (!presentation.pdfUrl) {
      return createErrorResponse('PDF é obrigatório para submeter a apresentação');
    }

    const updated = storage.updatePresentation(presentationId, {
      status: PresentationStatus.SUBMITTED,
      submittedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    if (!updated) {
      return createErrorResponse('Erro ao submeter apresentação');
    }

    return createSuccessResponse(updated, 'Apresentação submetida com sucesso');
  },
};

export default mockPresentationService;
