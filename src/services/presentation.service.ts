/**
 * Presentation Service
 * Handles presentation-related API calls
 */

import api from './api';
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
} from '@/types';

const presentationService = {
  /**
   * Get all presentations with filters
   */
  async getPresentations(
    filters?: FilterOptions,
    sort?: SortOptions,
    pagination?: PaginationOptions
  ): Promise<ApiResponse<PaginatedResponse<Presentation>>> {
    const response = await api.get('/presentations', {
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
   * FUNC34 - Get presentation by ID with full details
   * Public endpoint for viewing presentation details
   */
  async getPresentationById(presentationId: string): Promise<ApiResponse<PresentationWithDetails>> {
    const response = await api.get(`/presentations/${presentationId}`);
    return response.data;
  },

  /**
   * FUNC18, FUNC19 - Create new presentation
   * Doctoral student creates their presentation
   */
  async createPresentation(data: PresentationFormData): Promise<ApiResponse<Presentation>> {
    const response = await api.post('/presentations', data);
    return response.data;
  },

  /**
   * FUNC18, FUNC28 - Update presentation
   * Student or admin can update presentation details
   */
  async updatePresentation(
    presentationId: string,
    data: Partial<PresentationFormData>
  ): Promise<ApiResponse<Presentation>> {
    const response = await api.put(`/presentations/${presentationId}`, data);
    return response.data;
  },

  /**
   * FUNC21 - Upload presentation PDF
   * Max file size: 10MB
   */
  async uploadPDF(presentationId: string, file: File): Promise<ApiResponse<{ pdfUrl: string }>> {
    const formData = new FormData();
    formData.append('pdf', file);

    const response = await api.post(`/presentations/${presentationId}/upload-pdf`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  /**
   * FUNC22 - Get presentation PDF URL
   */
  async getPDFUrl(presentationId: string): Promise<ApiResponse<{ pdfUrl: string }>> {
    const response = await api.get(`/presentations/${presentationId}/pdf`);
    return response.data;
  },

  /**
   * Delete presentation
   */
  async deletePresentation(presentationId: string): Promise<ApiResponse> {
    const response = await api.delete(`/presentations/${presentationId}`);
    return response.data;
  },

  /**
   * FUNC23, FUNC24 - Submit vote/evaluation for presentation
   * Professors and listeners can vote
   */
  async votePresentation(
    presentationId: string,
    score: number,
    comment?: string
  ): Promise<ApiResponse<PresentationVote>> {
    const response = await api.post(`/presentations/${presentationId}/vote`, {
      score,
      comment,
    });
    return response.data;
  },

  /**
   * Get votes for a presentation
   */
  async getPresentationVotes(presentationId: string): Promise<ApiResponse<PresentationVote[]>> {
    const response = await api.get(`/presentations/${presentationId}/votes`);
    return response.data;
  },

  /**
   * Get user's vote for a presentation
   */
  async getUserVote(presentationId: string): Promise<ApiResponse<PresentationVote | null>> {
    const response = await api.get(`/presentations/${presentationId}/my-vote`);
    return response.data;
  },

  /**
   * FUNC29, FUNC30 - Get presentation rankings
   * Sorted by average score
   */
  async getPresentationRankings(eventEditionId: string): Promise<ApiResponse<PresentationRanking[]>> {
    const response = await api.get('/presentations/rankings', {
      params: { eventEditionId },
    });
    return response.data;
  },

  /**
   * Get presentation by student
   */
  async getStudentPresentation(studentId: string): Promise<ApiResponse<Presentation>> {
    const response = await api.get(`/presentations/student/${studentId}`);
    return response.data;
  },

  /**
   * Get my presentation (for current student)
   */
  async getMyPresentation(): Promise<ApiResponse<Presentation>> {
    const response = await api.get('/presentations/me');
    return response.data;
  },

  /**
   * FUNC40 - Reorder presentations in schedule
   * Admin can reorder presentations to handle absences
   */
  async reorderPresentations(
    sessionId: string,
    presentationIds: string[]
  ): Promise<ApiResponse> {
    const response = await api.post(`/presentations/reorder`, {
      sessionId,
      presentationIds,
    });
    return response.data;
  },

  /**
   * Submit presentation (change status from DRAFT to SUBMITTED)
   */
  async submitPresentation(presentationId: string): Promise<ApiResponse<Presentation>> {
    const response = await api.post(`/presentations/${presentationId}/submit`);
    return response.data;
  },
};

export default presentationService;
