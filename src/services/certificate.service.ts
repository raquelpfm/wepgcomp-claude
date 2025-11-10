/**
 * Certificate Service
 * Handles certificate and award-related API calls
 */

import api from './api';
import {
  ApiResponse,
  Certificate,
  Award,
  CertificateGenerationRequest,
  AwardSelection,
  PaginatedResponse,
  PaginationOptions,
} from '@/types';

const certificateService = {
  /**
   * Get all certificates for event edition
   */
  async getCertificates(
    eventEditionId: string,
    pagination?: PaginationOptions
  ): Promise<ApiResponse<PaginatedResponse<Certificate>>> {
    const response = await api.get('/certificates', {
      params: {
        eventEditionId,
        page: pagination?.page,
        limit: pagination?.limit,
      },
    });
    return response.data;
  },

  /**
   * Get certificate by ID
   */
  async getCertificateById(certificateId: string): Promise<ApiResponse<Certificate>> {
    const response = await api.get(`/certificates/${certificateId}`);
    return response.data;
  },

  /**
   * Get user's certificates
   */
  async getMyCertificates(): Promise<ApiResponse<Certificate[]>> {
    const response = await api.get('/certificates/me');
    return response.data;
  },

  /**
   * FUNC32 - Generate certificates
   * Generate participation certificates in PDF format
   * Can be for specific users or all participants
   */
  async generateCertificates(
    request: CertificateGenerationRequest
  ): Promise<ApiResponse<Certificate[]>> {
    const response = await api.post('/certificates/generate', request);
    return response.data;
  },

  /**
   * FUNC32 - Send certificates via email
   * Send generated certificates to recipients
   */
  async sendCertificates(certificateIds: string[]): Promise<ApiResponse> {
    const response = await api.post('/certificates/send', { certificateIds });
    return response.data;
  },

  /**
   * Download certificate PDF
   */
  async downloadCertificate(certificateId: string): Promise<Blob> {
    const response = await api.get(`/certificates/${certificateId}/download`, {
      responseType: 'blob',
    });
    return response.data;
  },

  // ============ Awards ============

  /**
   * Get all awards for event edition
   */
  async getAwards(eventEditionId: string): Promise<ApiResponse<Award[]>> {
    const response = await api.get('/awards', {
      params: { eventEditionId },
    });
    return response.data;
  },

  /**
   * FUNC31 - Select award recipients
   * Admin selects 3 evaluators and top presenters for awards
   */
  async selectAwardRecipients(selection: AwardSelection): Promise<ApiResponse<Award[]>> {
    const response = await api.post('/awards/select', selection);
    return response.data;
  },

  /**
   * Get evaluators ranked by participation
   * For selecting best evaluators
   */
  async getEvaluatorRankings(eventEditionId: string): Promise<ApiResponse<any[]>> {
    const response = await api.get('/awards/evaluator-rankings', {
      params: { eventEditionId },
    });
    return response.data;
  },

  /**
   * Delete award
   */
  async deleteAward(awardId: string): Promise<ApiResponse> {
    const response = await api.delete(`/awards/${awardId}`);
    return response.data;
  },
};

export default certificateService;
