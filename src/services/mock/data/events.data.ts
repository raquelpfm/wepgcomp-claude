/**
 * Mock Event Data
 * Contains event editions, sessions, and rooms
 */

import { EventEdition, EventEditionStatus, Session, Room } from '../../../types';

// Calculate dates relative to today
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

const nextWeek = new Date(today);
nextWeek.setDate(today.getDate() + 7);

const twoWeeksFromNow = new Date(today);
twoWeeksFromNow.setDate(today.getDate() + 14);

const threeWeeksFromNow = new Date(today);
threeWeeksFromNow.setDate(today.getDate() + 21);

const lastYear = new Date(today);
lastYear.setFullYear(today.getFullYear() - 1);

// Helper to format date as ISO string
const toISOString = (date: Date): string => date.toISOString();

// Event Editions
export const mockEventEditions: EventEdition[] = [
  // Active Edition - V WEPGCOMP 2025
  {
    id: 'event-001',
    name: 'V WEPGCOMP - 2025',
    year: 2025,
    edition: 5,
    description:
      'V Workshop dos Estudantes de Pós-Graduação em Ciência da Computação. Evento anual do PGCOMP-UFBA destinado à apresentação e avaliação dos avanços de pesquisa dos doutorandos.',
    submissionDeadline: toISOString(nextWeek),
    eventStartDate: toISOString(twoWeeksFromNow),
    eventEndDate: toISOString(threeWeeksFromNow),
    maxPresentations: 15,
    presentationDuration: 20,
    allowVoting: true,
    coordinatorId: 'user-002',
    coordinatorName: 'Carlos Coordenador',
    status: EventEditionStatus.REGISTRATION_OPEN,
    isActive: true,
    createdAt: '2024-09-01T10:00:00Z',
    updatedAt: '2024-10-01T14:00:00Z',
    createdBy: 'user-001',
  },

  // Previous Edition - IV WEPGCOMP 2024 (Completed)
  {
    id: 'event-002',
    name: 'IV WEPGCOMP - 2024',
    year: 2024,
    edition: 4,
    description:
      'IV Workshop dos Estudantes de Pós-Graduação em Ciência da Computação. Edição anterior finalizada com sucesso.',
    submissionDeadline: new Date(lastYear.getFullYear(), 10, 1).toISOString(),
    eventStartDate: new Date(lastYear.getFullYear(), 10, 20).toISOString(),
    eventEndDate: new Date(lastYear.getFullYear(), 10, 22).toISOString(),
    maxPresentations: 12,
    presentationDuration: 20,
    allowVoting: true,
    coordinatorId: 'user-002',
    coordinatorName: 'Carlos Coordenador',
    status: EventEditionStatus.COMPLETED,
    isActive: false,
    createdAt: new Date(lastYear.getFullYear(), 8, 1).toISOString(),
    updatedAt: new Date(lastYear.getFullYear(), 11, 1).toISOString(),
    createdBy: 'user-001',
  },
];

// Rooms
export const mockRooms: Room[] = [
  {
    id: 'room-001',
    name: 'Sala 201',
    building: 'Instituto de Computação',
    capacity: 50,
    hasProjector: true,
    hasComputer: true,
    notes: 'Sala principal com equipamento multimídia completo',
    isActive: true,
  },
  {
    id: 'room-002',
    name: 'Sala 202',
    building: 'Instituto de Computação',
    capacity: 40,
    hasProjector: true,
    hasComputer: true,
    notes: 'Sala com boa acústica',
    isActive: true,
  },
  {
    id: 'room-003',
    name: 'Auditório do IC',
    building: 'Instituto de Computação',
    capacity: 100,
    hasProjector: true,
    hasComputer: true,
    notes: 'Auditório principal para sessões plenárias',
    isActive: true,
  },
  {
    id: 'room-004',
    name: 'Sala 301',
    building: 'Instituto de Computação',
    capacity: 30,
    hasProjector: false,
    hasComputer: false,
    notes: 'Sala pequena - em manutenção',
    isActive: false,
  },
];

// Sessions for Active Event (event-001)
export const mockSessions: Session[] = [
  // Day 1 - Session 1 (with room)
  {
    id: 'session-001',
    eventEditionId: 'event-001',
    name: 'Sessão 1 - Manhã',
    description: 'Primeira sessão de apresentações - Inteligência Artificial e Machine Learning',
    date: toISOString(twoWeeksFromNow),
    startTime: '09:00',
    endTime: '12:00',
    roomId: 'room-003',
    roomName: 'Auditório do IC',
    presentationIds: ['pres-001', 'pres-002', 'pres-003'],
    maxPresentations: 8,
    createdAt: '2024-10-05T10:00:00Z',
    updatedAt: '2024-10-05T10:00:00Z',
    createdBy: 'user-002',
  },

  // Day 1 - Session 2 (with room)
  {
    id: 'session-002',
    eventEditionId: 'event-001',
    name: 'Sessão 2 - Tarde',
    description: 'Segunda sessão - Sistemas Distribuídos e Redes',
    date: toISOString(twoWeeksFromNow),
    startTime: '14:00',
    endTime: '17:00',
    roomId: 'room-001',
    roomName: 'Sala 201',
    presentationIds: ['pres-004', 'pres-005'],
    maxPresentations: 8,
    createdAt: '2024-10-05T11:00:00Z',
    updatedAt: '2024-10-05T11:00:00Z',
    createdBy: 'user-002',
  },

  // Day 2 - Session 3 (WITHOUT room - blocks all rooms)
  {
    id: 'session-003',
    eventEditionId: 'event-001',
    name: 'Sessão 3 - Manhã',
    description: 'Terceira sessão - Engenharia de Software e Banco de Dados (Sala não definida)',
    date: (() => {
      const day2 = new Date(twoWeeksFromNow);
      day2.setDate(day2.getDate() + 1);
      return toISOString(day2);
    })(),
    startTime: '09:00',
    endTime: '12:00',
    // No roomId - this blocks all rooms during this time
    presentationIds: ['pres-006', 'pres-007'],
    maxPresentations: 8,
    createdAt: '2024-10-05T12:00:00Z',
    updatedAt: '2024-10-05T12:00:00Z',
    createdBy: 'user-002',
  },

  // Day 2 - Session 4 (with room)
  {
    id: 'session-004',
    eventEditionId: 'event-001',
    name: 'Sessão 4 - Tarde',
    description: 'Quarta sessão - Computação Gráfica e Visão Computacional',
    date: (() => {
      const day2 = new Date(twoWeeksFromNow);
      day2.setDate(day2.getDate() + 1);
      return toISOString(day2);
    })(),
    startTime: '14:00',
    endTime: '17:00',
    roomId: 'room-002',
    roomName: 'Sala 202',
    presentationIds: ['pres-008'],
    maxPresentations: 8,
    createdAt: '2024-10-05T13:00:00Z',
    updatedAt: '2024-10-05T13:00:00Z',
    createdBy: 'user-002',
  },
];

// Helper functions
export const getActiveEventEdition = (): EventEdition | undefined => {
  return mockEventEditions.find((event) => event.isActive);
};

export const getEventEditionById = (id: string): EventEdition | undefined => {
  return mockEventEditions.find((event) => event.id === id);
};

export const getSessionsByEventId = (eventId: string): Session[] => {
  return mockSessions.filter((session) => session.eventEditionId === eventId);
};

export const getSessionById = (id: string): Session | undefined => {
  return mockSessions.find((session) => session.id === id);
};

export const getRoomById = (id: string): Room | undefined => {
  return mockRooms.find((room) => room.id === id);
};

export const getActiveRooms = (): Room[] => {
  return mockRooms.filter((room) => room.isActive);
};

// Check for room conflicts
export const hasRoomConflict = (
  roomId: string,
  date: string,
  startTime: string,
  endTime: string,
  excludeSessionId?: string
): boolean => {
  const sessionsOnDate = mockSessions.filter(
    (s) => s.date === date && s.id !== excludeSessionId
  );

  // Check if any session without a room blocks this time
  const blockingSession = sessionsOnDate.find(
    (s) => !s.roomId && s.startTime <= endTime && s.endTime >= startTime
  );
  if (blockingSession) return true;

  // Check if the specific room is occupied
  return sessionsOnDate.some(
    (s) =>
      s.roomId === roomId &&
      s.startTime <= endTime &&
      s.endTime >= startTime
  );
};
