/**
 * Mock Certificate Service
 * Mocks certificate and award-related API endpoints for testing
 */

import {
  ApiResponse,
  Certificate,
  Award,
  CertificateGenerationRequest,
  AwardSelection,
  PaginatedResponse,
  PaginationOptions,
  CertificateType,
} from '@/types';

import { getMockStorage } from './storage';
import {
  simulateDelay,
  createSuccessResponse,
  createErrorResponse,
  createPaginatedResponse,
  validateMockToken,
  generateId,
  generateCertificateNumber,
  calculateAverageScore,
} from './helpers';

const storage = getMockStorage();

const mockCertificateService = {
  /**
   * Get all certificates for event edition
   */
  async getCertificates(
    eventEditionId: string,
    pagination?: PaginationOptions
  ): Promise<ApiResponse<PaginatedResponse<Certificate>>> {
    await simulateDelay();

    const token = localStorage.getItem('accessToken');
    if (!token) {
      return createErrorResponse('Não autenticado');
    }

    const validation = validateMockToken(token);
    if (!validation.valid) {
      return createErrorResponse('Token inválido ou expirado');
    }

    const event = storage.getEventById(eventEditionId);
    if (!event) {
      return createErrorResponse('Evento não encontrado');
    }

    let certificates = storage.getCertificates();
    certificates = certificates.filter((c) => c.eventEditionId === eventEditionId);

    const page = pagination?.page || 1;
    const limit = pagination?.limit || 10;

    const paginatedResponse = createPaginatedResponse(certificates, page, limit);

    return createSuccessResponse(paginatedResponse);
  },

  /**
   * Get certificate by ID
   */
  async getCertificateById(certificateId: string): Promise<ApiResponse<Certificate>> {
    await simulateDelay();

    const token = localStorage.getItem('accessToken');
    if (!token) {
      return createErrorResponse('Não autenticado');
    }

    const validation = validateMockToken(token);
    if (!validation.valid) {
      return createErrorResponse('Token inválido ou expirado');
    }

    const certificate = storage.getCertificateById(certificateId);
    if (!certificate) {
      return createErrorResponse('Certificado não encontrado');
    }

    return createSuccessResponse(certificate);
  },

  /**
   * Get user's certificates
   */
  async getMyCertificates(): Promise<ApiResponse<Certificate[]>> {
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

    const certificates = storage.getCertificatesByUserId(validation.userId);
    return createSuccessResponse(certificates);
  },

  /**
   * Generate certificates
   */
  async generateCertificates(
    request: CertificateGenerationRequest
  ): Promise<ApiResponse<Certificate[]>> {
    await simulateDelay();

    const token = localStorage.getItem('accessToken');
    if (!token) {
      return createErrorResponse('Não autenticado');
    }

    const validation = validateMockToken(token);
    if (!validation.valid) {
      return createErrorResponse('Token inválido ou expirado');
    }

    const event = storage.getEventById(request.eventEditionId);
    if (!event) {
      return createErrorResponse('Evento não encontrado');
    }

    const generatedCertificates: Certificate[] = [];

    // Determine which users get certificates
    let recipients: any[] = [];

    if (request.userIds && request.userIds.length > 0) {
      // Specific users
      recipients = request.userIds
        .map((userId) => storage.getUserById(userId))
        .filter((u) => u !== undefined);
    } else if (request.type === CertificateType.PARTICIPANT) {
      // All users who attended
      const users = storage.getUsers();
      recipients = users.filter((u) => u.id !== undefined);
    } else if (request.type === CertificateType.PRESENTER) {
      // Presenters
      const presentations = storage.getPresentationsByEventId(request.eventEditionId);
      recipients = presentations
        .map((p) => storage.getUserById(p.studentId))
        .filter((u) => u !== undefined);
    } else if (request.type === CertificateType.EVALUATOR) {
      // Users who voted
      const votes = storage.getVotes();
      const evaluatorIds = [...new Set(votes.map((v) => v.userId))];
      recipients = evaluatorIds
        .map((userId) => storage.getUserById(userId))
        .filter((u) => u !== undefined);
    }

    // Generate certificates
    let sequence = 1;
    recipients.forEach((user) => {
      const certificate: Certificate = {
        id: generateId('cert'),
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        eventEditionId: request.eventEditionId,
        type: request.type,
        certificateNumber: generateCertificateNumber(
          event.name,
          request.type,
          sequence
        ),
        issuedAt: new Date().toISOString(),
        pdfUrl: `/certificates/${request.eventEditionId}/${user.id}.pdf`,
        isSent: false,
      };

      storage.addCertificate(certificate);
      generatedCertificates.push(certificate);
      sequence++;
    });

    return createSuccessResponse(
      generatedCertificates,
      `${generatedCertificates.length} certificados gerados com sucesso`
    );
  },

  /**
   * Send certificates via email
   */
  async sendCertificates(certificateIds: string[]): Promise<ApiResponse> {
    await simulateDelay();

    const token = localStorage.getItem('accessToken');
    if (!token) {
      return createErrorResponse('Não autenticado');
    }

    const validation = validateMockToken(token);
    if (!validation.valid) {
      return createErrorResponse('Token inválido ou expirado');
    }

    // Validate all certificates exist
    const certificates = certificateIds
      .map((id) => storage.getCertificateById(id))
      .filter((c) => c !== undefined);

    if (certificates.length !== certificateIds.length) {
      return createErrorResponse('Alguns certificados não foram encontrados');
    }

    return createSuccessResponse(
      null,
      `${certificates.length} certificados enviados com sucesso`
    );
  },

  /**
   * Download certificate PDF
   */
  async downloadCertificate(certificateId: string): Promise<Blob> {
    await simulateDelay();

    const certificate = storage.getCertificateById(certificateId);
    if (!certificate) {
      throw new Error('Certificado não encontrado');
    }

    // Mock PDF blob
    const event = storage.getEventById(certificate.eventEditionId);
    const pdfContent = `
      Certificado de ${certificate.type}

      Certificamos que ${certificate.userName}
      participou do evento ${event?.name || 'WEPGCOMP'}
      em ${new Date(certificate.issuedAt).toLocaleDateString('pt-BR')}

      Número: ${certificate.certificateNumber}
    `;

    return new Blob([pdfContent], { type: 'application/pdf' });
  },

  // ============ Awards ============

  /**
   * Get all awards for event edition
   */
  async getAwards(eventEditionId: string): Promise<ApiResponse<Award[]>> {
    await simulateDelay();

    const event = storage.getEventById(eventEditionId);
    if (!event) {
      return createErrorResponse('Evento não encontrado');
    }

    const awards = storage.getAwardsByEventId(eventEditionId);
    return createSuccessResponse(awards);
  },

  /**
   * Select award recipients
   */
  async selectAwardRecipients(selection: AwardSelection): Promise<ApiResponse<Award[]>> {
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

    const event = storage.getEventById(selection.eventEditionId);
    if (!event) {
      return createErrorResponse('Evento não encontrado');
    }

    const generatedAwards: Award[] = [];

    // Process each selection
    selection.selections.forEach((sel) => {
      if (selection.type === 'presentation' && sel.presentationId) {
        // Award for best presentation
        const presentation = storage.getPresentationById(sel.presentationId);
        if (presentation) {
          const award: Award = {
            id: generateId('award'),
            eventEditionId: selection.eventEditionId,
            type: 'presentation',
            rank: sel.rank,
            recipientId: presentation.studentId,
            recipientName: presentation.studentName,
            presentationId: presentation.id,
            presentationTitle: presentation.title,
            awardedAt: new Date().toISOString(),
            awardedBy: validation.userId || '',
          };

          storage.addAward(award);
          generatedAwards.push(award);
        }
      } else if (selection.type === 'evaluator') {
        // Award for best evaluator
        const evaluator = storage.getUserById(sel.userId);
        if (evaluator) {
          const award: Award = {
            id: generateId('award'),
            eventEditionId: selection.eventEditionId,
            type: 'evaluator',
            rank: sel.rank,
            recipientId: sel.userId,
            recipientName: evaluator.name,
            awardedAt: new Date().toISOString(),
            awardedBy: validation.userId || '',
          };

          storage.addAward(award);
          generatedAwards.push(award);
        }
      }
    });

    return createSuccessResponse(
      generatedAwards,
      `${generatedAwards.length} prêmios atribuídos com sucesso`
    );
  },

  /**
   * Get evaluators ranked by participation
   */
  async getEvaluatorRankings(eventEditionId: string): Promise<ApiResponse<any[]>> {
    await simulateDelay();

    const event = storage.getEventById(eventEditionId);
    if (!event) {
      return createErrorResponse('Evento não encontrado');
    }

    const presentations = storage.getPresentationsByEventId(eventEditionId);
    const votes = storage.getVotes();

    // Filter votes for presentations in this event
    const eventVotes = votes.filter((v) =>
      presentations.some((p) => p.id === v.presentationId)
    );

    // Count votes per evaluator
    const evaluatorCounts: { [userId: string]: number } = {};
    eventVotes.forEach((v) => {
      evaluatorCounts[v.userId] = (evaluatorCounts[v.userId] || 0) + 1;
    });

    // Build evaluator rankings
    const rankings: any[] = [];

    Object.entries(evaluatorCounts).forEach(([userId, voteCount]) => {
      const evaluator = storage.getUserById(userId);
      if (!evaluator) return;

      // Calculate average score given by this evaluator
      const evaluatorVotes = eventVotes.filter((v) => v.userId === userId);
      const scores = evaluatorVotes.map((v) => v.score);
      const averageScore = calculateAverageScore(scores);

      rankings.push({
        evaluatorId: userId,
        evaluatorName: evaluator.name,
        evaluatorEmail: evaluator.email,
        voteCount,
        averageScore,
        rank: 0,
      });
    });

    // Sort by vote count descending, then by average score descending
    rankings.sort((a, b) => {
      if (b.voteCount !== a.voteCount) {
        return b.voteCount - a.voteCount;
      }
      return b.averageScore - a.averageScore;
    });

    // Add rank
    rankings.forEach((r, index) => {
      r.rank = index + 1;
    });

    return createSuccessResponse(rankings);
  },

  /**
   * Delete award
   */
  async deleteAward(awardId: string): Promise<ApiResponse> {
    await simulateDelay();

    const token = localStorage.getItem('accessToken');
    if (!token) {
      return createErrorResponse('Não autenticado');
    }

    const validation = validateMockToken(token);
    if (!validation.valid) {
      return createErrorResponse('Token inválido ou expirado');
    }

    const award = storage.getAwardById(awardId);
    if (!award) {
      return createErrorResponse('Prêmio não encontrado');
    }

    // Awards can't actually be deleted in this mock - just return success
    return createSuccessResponse(null, 'Prêmio removido com sucesso');
  },
};

export default mockCertificateService;
