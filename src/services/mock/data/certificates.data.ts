/**
 * Mock Certificate and Award Data
 */

import { Certificate, CertificateType, Award } from '../../../types';

// Mock Certificates (for previous event - event-002)
export const mockCertificates: Certificate[] = [
  // Presenter certificates
  {
    id: 'cert-001',
    eventEditionId: 'event-002',
    userId: 'user-006',
    userName: 'Pedro Oliveira',
    userEmail: 'doutorando1@ufba.br',
    type: CertificateType.PRESENTER,
    issuedAt: '2024-11-25T10:00:00Z',
    pdfUrl: '/mock/certificates/cert-001.pdf',
    certificateNumber: 'WEPGCOMP-2024-PRES-001',
    presentationTitle: 'Aprendizado Profundo Aplicado à Detecção de Anomalias em Redes de Computadores',
    isSent: true,
    sentAt: '2024-11-25T10:30:00Z',
  },
  {
    id: 'cert-002',
    eventEditionId: 'event-002',
    userId: 'user-007',
    userName: 'Julia Costa',
    userEmail: 'doutorando2@ufba.br',
    type: CertificateType.AWARD_PRESENTER,
    issuedAt: '2024-11-25T10:05:00Z',
    pdfUrl: '/mock/certificates/cert-002.pdf',
    certificateNumber: 'WEPGCOMP-2024-AWARD-001',
    awardTitle: 'Melhor Apresentação - 1º Lugar',
    presentationTitle: 'Otimização de Consultas em Bancos de Dados Distribuídos usando Algoritmos Genéticos',
    isSent: true,
    sentAt: '2024-11-25T10:35:00Z',
  },

  // Evaluator certificates
  {
    id: 'cert-003',
    eventEditionId: 'event-002',
    userId: 'user-003',
    userName: 'Maria Silva',
    userEmail: 'professor1@ufba.br',
    type: CertificateType.EVALUATOR,
    issuedAt: '2024-11-25T10:10:00Z',
    pdfUrl: '/mock/certificates/cert-003.pdf',
    certificateNumber: 'WEPGCOMP-2024-EVAL-001',
    isSent: true,
    sentAt: '2024-11-25T10:40:00Z',
  },
  {
    id: 'cert-004',
    eventEditionId: 'event-002',
    userId: 'user-004',
    userName: 'João Santos',
    userEmail: 'professor2@ufba.br',
    type: CertificateType.AWARD_EVALUATOR,
    issuedAt: '2024-11-25T10:15:00Z',
    pdfUrl: '/mock/certificates/cert-004.pdf',
    certificateNumber: 'WEPGCOMP-2024-EVAL-AWARD-001',
    awardTitle: 'Melhor Avaliador',
    isSent: true,
    sentAt: '2024-11-25T10:45:00Z',
  },

  // Organizer certificates
  {
    id: 'cert-005',
    eventEditionId: 'event-002',
    userId: 'user-001',
    userName: 'Admin Super',
    userEmail: 'admin@ufba.br',
    type: CertificateType.ORGANIZER,
    issuedAt: '2024-11-25T10:20:00Z',
    pdfUrl: '/mock/certificates/cert-005.pdf',
    certificateNumber: 'WEPGCOMP-2024-ORG-001',
    isSent: true,
    sentAt: '2024-11-25T10:50:00Z',
  },
  {
    id: 'cert-006',
    eventEditionId: 'event-002',
    userId: 'user-002',
    userName: 'Carlos Coordenador',
    userEmail: 'coordenador@ufba.br',
    type: CertificateType.ORGANIZER,
    issuedAt: '2024-11-25T10:25:00Z',
    pdfUrl: '/mock/certificates/cert-006.pdf',
    certificateNumber: 'WEPGCOMP-2024-ORG-002',
    isSent: true,
    sentAt: '2024-11-25T10:55:00Z',
  },
];

// Mock Awards (for previous event - event-002)
export const mockAwards: Award[] = [
  // Presentation awards
  {
    id: 'award-001',
    eventEditionId: 'event-002',
    type: 'presentation',
    rank: 1,
    recipientId: 'user-007',
    recipientName: 'Julia Costa',
    presentationId: 'pres-002',
    presentationTitle: 'Otimização de Consultas em Bancos de Dados Distribuídos usando Algoritmos Genéticos',
    score: 9.0,
    awardedAt: '2024-11-24T15:00:00Z',
    awardedBy: 'user-001',
  },
  {
    id: 'award-002',
    eventEditionId: 'event-002',
    type: 'presentation',
    rank: 2,
    recipientId: 'user-006',
    recipientName: 'Pedro Oliveira',
    presentationId: 'pres-001',
    presentationTitle: 'Aprendizado Profundo Aplicado à Detecção de Anomalias em Redes de Computadores',
    score: 8.5,
    awardedAt: '2024-11-24T15:05:00Z',
    awardedBy: 'user-001',
  },
  {
    id: 'award-003',
    eventEditionId: 'event-002',
    type: 'presentation',
    rank: 3,
    recipientId: 'user-008',
    recipientName: 'Lucas Ferreira',
    presentationId: 'pres-003',
    presentationTitle: 'Blockchain para Rastreabilidade de Dados Médicos em Sistemas de Saúde',
    score: 7.7,
    awardedAt: '2024-11-24T15:10:00Z',
    awardedBy: 'user-001',
  },

  // Evaluator award
  {
    id: 'award-004',
    eventEditionId: 'event-002',
    type: 'evaluator',
    rank: 1,
    recipientId: 'user-004',
    recipientName: 'João Santos',
    totalVotes: 12,
    awardedAt: '2024-11-24T15:15:00Z',
    awardedBy: 'user-001',
  },
];

// Helper functions
export const getCertificateById = (id: string): Certificate | undefined => {
  return mockCertificates.find((cert) => cert.id === id);
};

export const getCertificatesByEventId = (eventId: string): Certificate[] => {
  return mockCertificates.filter((cert) => cert.eventEditionId === eventId);
};

export const getCertificatesByUserId = (userId: string): Certificate[] => {
  return mockCertificates.filter((cert) => cert.userId === userId);
};

export const getUserCertificateForEvent = (
  userId: string,
  eventId: string
): Certificate | undefined => {
  return mockCertificates.find(
    (cert) => cert.userId === userId && cert.eventEditionId === eventId
  );
};

export const getAwardsByEventId = (eventId: string): Award[] => {
  return mockAwards.filter((award) => award.eventEditionId === eventId);
};

export const getAwardById = (id: string): Award | undefined => {
  return mockAwards.find((award) => award.id === id);
};

export const getAwardsByUserId = (userId: string): Award[] => {
  return mockAwards.filter((award) => award.recipientId === userId);
};
