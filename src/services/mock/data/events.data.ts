/**
 * Dados mockados de eventos e sessões
 */

import { Event, Session } from '../../../types';

export const MOCK_EVENTS: Event[] = [
  // Evento anterior (2023)
  {
    id: 'event-000',
    name: 'WEPGCOMP 2023',
    edition: '2023',
    description: 'Workshop de Apresentações de Doutorado do PGCOMP - Edição 2023',
    startDate: '2023-12-04T08:00:00.000Z',
    endDate: '2023-12-06T18:00:00.000Z',
    submissionDeadline: '2023-11-15T23:59:59.000Z',
    presentationDuration: 30,
    maxPresentationsPerDay: 12,
    availableRooms: ['Sala 1', 'Sala 2', 'Auditório'],
    venue: 'Instituto de Computação - UFBA',
    address: 'Av. Milton Santos, s/n - Ondina, Salvador - BA, 40170-110',
    contactEmail: 'pgcomp@ufba.br',
    website: 'https://pgcomp.ufba.br',
    coordinatorId: 'user-001',
    coordinatorName: 'Prof. Dr. Carlos Silva',
    isActive: false,
    createdAt: '2023-08-01T10:00:00.000Z',
    updatedAt: '2023-12-06T18:00:00.000Z',
  },

  // Evento atual (2024)
  {
    id: 'event-001',
    name: 'WEPGCOMP 2024',
    edition: '2024',
    description: 'Workshop de Apresentações de Doutorado do PGCOMP - Edição 2024. Evento anual que reúne doutorandos para apresentarem seus trabalhos de pesquisa, promovendo troca de conhecimentos e avaliação pela comunidade acadêmica.',
    startDate: '2024-12-02T08:00:00.000Z',
    endDate: '2024-12-04T18:00:00.000Z',
    submissionDeadline: '2024-11-25T23:59:59.000Z',
    presentationDuration: 30,
    maxPresentationsPerDay: 15,
    availableRooms: ['Sala 1', 'Sala 2', 'Auditório', 'Sala 3'],
    venue: 'Instituto de Computação - UFBA',
    address: 'Av. Milton Santos, s/n - Ondina, Salvador - BA, 40170-110',
    contactEmail: 'wepgcomp@pgcomp.ufba.br',
    website: 'https://pgcomp.ufba.br/wepgcomp',
    logoUrl: '/assets/logo-wepgcomp.png',
    bannerUrl: '/assets/banner-wepgcomp-2024.jpg',
    coordinatorId: 'user-002',
    coordinatorName: 'Profa. Dra. Maria Santos',
    isActive: true,
    createdAt: '2024-06-01T10:00:00.000Z',
    updatedAt: '2024-11-15T14:00:00.000Z',
  },
];

export const MOCK_SESSIONS: Session[] = [
  // Dia 1 - 02/12/2024 (Segunda-feira)
  {
    id: 'session-001',
    eventId: 'event-001',
    name: 'Sessão Manhã - Dia 1',
    date: '2024-12-02T00:00:00.000Z',
    startTime: '08:30',
    endTime: '12:00',
    room: 'Auditório',
    maxPresentations: 7,
    presentationIds: ['pres-001', 'pres-002', 'pres-003', 'pres-004', 'pres-005'],
    createdAt: '2024-09-01T10:00:00.000Z',
    updatedAt: '2024-11-10T15:00:00.000Z',
  },

  {
    id: 'session-002',
    eventId: 'event-001',
    name: 'Sessão Tarde - Dia 1 (Sala 1)',
    date: '2024-12-02T00:00:00.000Z',
    startTime: '14:00',
    endTime: '17:30',
    room: 'Sala 1',
    maxPresentations: 7,
    presentationIds: ['pres-006', 'pres-007', 'pres-008'],
    createdAt: '2024-09-01T10:00:00.000Z',
    updatedAt: '2024-11-10T15:00:00.000Z',
  },

  {
    id: 'session-003',
    eventId: 'event-001',
    name: 'Sessão Tarde - Dia 1 (Sala 2)',
    date: '2024-12-02T00:00:00.000Z',
    startTime: '14:00',
    endTime: '17:30',
    room: 'Sala 2',
    maxPresentations: 7,
    presentationIds: [],
    createdAt: '2024-09-01T10:00:00.000Z',
    updatedAt: '2024-11-10T15:00:00.000Z',
  },

  // Dia 2 - 03/12/2024 (Terça-feira)
  {
    id: 'session-004',
    eventId: 'event-001',
    name: 'Sessão Manhã - Dia 2',
    date: '2024-12-03T00:00:00.000Z',
    startTime: '08:30',
    endTime: '12:00',
    room: 'Auditório',
    maxPresentations: 7,
    presentationIds: ['pres-009', 'pres-010', 'pres-011', 'pres-012'],
    createdAt: '2024-09-01T10:00:00.000Z',
    updatedAt: '2024-11-10T15:00:00.000Z',
  },

  {
    id: 'session-005',
    eventId: 'event-001',
    name: 'Sessão Tarde - Dia 2',
    date: '2024-12-03T00:00:00.000Z',
    startTime: '14:00',
    endTime: '17:30',
    room: 'Auditório',
    maxPresentations: 7,
    presentationIds: ['pres-013', 'pres-014', 'pres-015'],
    createdAt: '2024-09-01T10:00:00.000Z',
    updatedAt: '2024-11-10T15:00:00.000Z',
  },

  // Dia 3 - 04/12/2024 (Quarta-feira)
  {
    id: 'session-006',
    eventId: 'event-001',
    name: 'Sessão Manhã - Dia 3',
    date: '2024-12-04T00:00:00.000Z',
    startTime: '08:30',
    endTime: '12:00',
    room: 'Auditório',
    maxPresentations: 7,
    presentationIds: ['pres-016', 'pres-017', 'pres-018'],
    createdAt: '2024-09-01T10:00:00.000Z',
    updatedAt: '2024-11-10T15:00:00.000Z',
  },

  {
    id: 'session-007',
    eventId: 'event-001',
    name: 'Sessão Tarde - Dia 3 e Encerramento',
    date: '2024-12-04T00:00:00.000Z',
    startTime: '14:00',
    endTime: '17:00',
    room: 'Auditório',
    maxPresentations: 5,
    presentationIds: ['pres-019', 'pres-020'],
    createdAt: '2024-09-01T10:00:00.000Z',
    updatedAt: '2024-11-10T15:00:00.000Z',
  },
];

// Helper para obter o evento ativo
export const getActiveEvent = (): Event => {
  return MOCK_EVENTS.find(e => e.isActive) || MOCK_EVENTS[MOCK_EVENTS.length - 1];
};

// Helper para obter sessões de um evento
export const getEventSessions = (eventId: string): Session[] => {
  return MOCK_SESSIONS.filter(s => s.eventId === eventId);
};
