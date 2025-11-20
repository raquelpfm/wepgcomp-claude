/**
 * Tipos relacionados a certificados
 */

export enum CertificateType {
  PARTICIPATION = 'PARTICIPATION', // Certificado de participação
  PRESENTATION = 'PRESENTATION', // Certificado de apresentação (para doutorandos)
  EVALUATION = 'EVALUATION', // Certificado de avaliação (para professores avaliadores)
  BEST_EVALUATOR = 'BEST_EVALUATOR', // Certificado de melhor avaliador
  BEST_PRESENTATION = 'BEST_PRESENTATION', // Certificado de melhor apresentação
  ORGANIZATION = 'ORGANIZATION', // Certificado de organização (para admins)
}

export interface Certificate {
  id: string;
  eventId: string;
  userId: string;
  type: CertificateType;

  // Dados do certificado
  userName: string;
  userEmail: string;
  eventName: string;
  eventDate: string;

  // Informações específicas por tipo
  presentationTitle?: string; // Para PRESENTATION e BEST_PRESENTATION
  evaluationCount?: number; // Para EVALUATION e BEST_EVALUATOR
  rank?: number; // Para BEST_PRESENTATION

  // Dados de geração
  generatedAt: string; // ISO date string
  pdfUrl?: string; // URL do PDF gerado (ou base64)
  verificationCode: string; // Código único para validação

  createdAt: string;
}

export interface GenerateCertificateDTO {
  userId: string;
  eventId: string;
  type: CertificateType;
  presentationTitle?: string;
  evaluationCount?: number;
  rank?: number;
}

export interface CertificateTemplate {
  type: CertificateType;
  title: string;
  description: string;
  backgroundColor: string;
  borderColor: string;
}

export interface BulkGenerateCertificatesDTO {
  eventId: string;
  userIds: string[];
  type: CertificateType;
}
