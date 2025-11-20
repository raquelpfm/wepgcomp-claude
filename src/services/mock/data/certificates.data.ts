/**
 * Dados mockados de certificados
 */

import { Certificate, CertificateType } from '../../../types';

export const MOCK_CERTIFICATES: Certificate[] = [
  // Alguns certificados de exemplo da edição anterior
  {
    id: 'cert-001',
    eventId: 'event-000',
    userId: 'user-008',
    type: CertificateType.PRESENTATION,
    userName: 'Rafael Silva',
    userEmail: 'dout.silva@ufba.br',
    eventName: 'WEPGCOMP 2023',
    eventDate: '2023-12-04 a 2023-12-06',
    presentationTitle: 'Arquitetura de Microsserviços com Event Sourcing',
    generatedAt: '2023-12-10T10:00:00.000Z',
    verificationCode: 'WEPC-2023-ABCD-1234',
    createdAt: '2023-12-10T10:00:00.000Z',
  },
  {
    id: 'cert-002',
    eventId: 'event-000',
    userId: 'user-003',
    type: CertificateType.EVALUATION,
    userName: 'Prof. Dr. João Oliveira',
    userEmail: 'prof.oliveira@ufba.br',
    eventName: 'WEPGCOMP 2023',
    eventDate: '2023-12-04 a 2023-12-06',
    evaluationCount: 15,
    generatedAt: '2023-12-10T11:00:00.000Z',
    verificationCode: 'WEPC-2023-EFGH-5678',
    createdAt: '2023-12-10T11:00:00.000Z',
  },
];

// Certificados serão gerados dinamicamente pelo serviço
