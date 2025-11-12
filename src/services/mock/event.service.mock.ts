/**
 * Mock Event Service
 * Mocks event edition, session, and room management API endpoints for testing
 */

import {
  ApiResponse,
  EventEdition,
  EventEditionFormData,
  Session,
  SessionFormData,
  Room,
  ScheduleItem,
  ScheduleConflict,
} from '@/types';

import { getMockStorage } from './storage';
import {
  simulateDelay,
  createSuccessResponse,
  createErrorResponse,
  validateMockToken,
  generateId,
  timeRangesOverlap,
} from './helpers';

const storage = getMockStorage();

const mockEventService = {
  // ============ Event Editions ============

  /**
   * Get all event editions
   */
  async getEventEditions(): Promise<ApiResponse<EventEdition[]>> {
    await simulateDelay();

    const events = storage.getEvents();
    return createSuccessResponse(events);
  },

  /**
   * Get active event edition
   */
  async getActiveEventEdition(): Promise<ApiResponse<EventEdition>> {
    await simulateDelay();

    const event = storage.getActiveEvent();
    if (!event) {
      return createErrorResponse('Nenhum evento ativo encontrado');
    }

    return createSuccessResponse(event);
  },

  /**
   * Get event edition by ID
   */
  async getEventEditionById(eventId: string): Promise<ApiResponse<EventEdition>> {
    await simulateDelay();

    const event = storage.getEventById(eventId);
    if (!event) {
      return createErrorResponse('Evento não encontrado');
    }

    return createSuccessResponse(event);
  },

  /**
   * Create new event edition
   */
  async createEventEdition(data: EventEditionFormData): Promise<ApiResponse<EventEdition>> {
    await simulateDelay();

    const token = localStorage.getItem('accessToken');
    if (!token) {
      return createErrorResponse('Não autenticado');
    }

    const validation = validateMockToken(token);
    if (!validation.valid) {
      return createErrorResponse('Token inválido ou expirado');
    }

    // Validate required fields
    if (!data.name || !data.year || !data.submissionDeadline || !data.eventStartDate || !data.eventEndDate) {
      return createErrorResponse('Campos obrigatórios faltando');
    }

    // Deactivate any existing active events
    const events = storage.getEvents();
    events.forEach((e) => {
      if (e.isActive) {
        storage.updateEvent(e.id, { isActive: false });
      }
    });

    // Create new event
    const newEvent: EventEdition = {
      id: generateId('event'),
      name: data.name,
      year: data.year,
      edition: data.edition,
      description: data.description,
      submissionDeadline: data.submissionDeadline,
      eventStartDate: data.eventStartDate,
      eventEndDate: data.eventEndDate,
      maxPresentations: data.maxPresentations,
      presentationDuration: data.presentationDuration,
      allowVoting: true,
      status: 'DRAFT' as any,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: validation.userId || '',
    };

    storage.addEvent(newEvent);
    return createSuccessResponse(newEvent, 'Evento criado com sucesso');
  },

  /**
   * Update event edition
   */
  async updateEventEdition(
    eventId: string,
    data: Partial<EventEditionFormData>
  ): Promise<ApiResponse<EventEdition>> {
    await simulateDelay();

    const token = localStorage.getItem('accessToken');
    if (!token) {
      return createErrorResponse('Não autenticado');
    }

    const validation = validateMockToken(token);
    if (!validation.valid) {
      return createErrorResponse('Token inválido ou expirado');
    }

    const event = storage.getEventById(eventId);
    if (!event) {
      return createErrorResponse('Evento não encontrado');
    }

    const updated = storage.updateEvent(eventId, {
      ...data,
      updatedAt: new Date().toISOString(),
    });

    if (!updated) {
      return createErrorResponse('Erro ao atualizar evento');
    }

    return createSuccessResponse(updated, 'Evento atualizado com sucesso');
  },

  /**
   * Set event edition as active
   */
  async setActiveEventEdition(eventId: string): Promise<ApiResponse<EventEdition>> {
    await simulateDelay();

    const token = localStorage.getItem('accessToken');
    if (!token) {
      return createErrorResponse('Não autenticado');
    }

    const validation = validateMockToken(token);
    if (!validation.valid) {
      return createErrorResponse('Token inválido ou expirado');
    }

    const event = storage.getEventById(eventId);
    if (!event) {
      return createErrorResponse('Evento não encontrado');
    }

    // Deactivate all other events
    const events = storage.getEvents();
    events.forEach((e) => {
      if (e.id !== eventId && e.isActive) {
        storage.updateEvent(e.id, { isActive: false });
      }
    });

    const updated = storage.updateEvent(eventId, {
      isActive: true,
      updatedAt: new Date().toISOString(),
    });

    if (!updated) {
      return createErrorResponse('Erro ao ativar evento');
    }

    return createSuccessResponse(updated, 'Evento ativado com sucesso');
  },

  /**
   * Archive event edition
   */
  async archiveEventEdition(eventId: string): Promise<ApiResponse> {
    await simulateDelay();

    const token = localStorage.getItem('accessToken');
    if (!token) {
      return createErrorResponse('Não autenticado');
    }

    const validation = validateMockToken(token);
    if (!validation.valid) {
      return createErrorResponse('Token inválido ou expirado');
    }

    const event = storage.getEventById(eventId);
    if (!event) {
      return createErrorResponse('Evento não encontrado');
    }

    const updated = storage.updateEvent(eventId, {
      isActive: false,
      updatedAt: new Date().toISOString(),
    });

    if (!updated) {
      return createErrorResponse('Erro ao arquivar evento');
    }

    return createSuccessResponse(null, 'Evento arquivado com sucesso');
  },

  // ============ Sessions ============

  /**
   * Get all sessions for event edition
   */
  async getSessions(eventEditionId: string): Promise<ApiResponse<Session[]>> {
    await simulateDelay();

    const sessions = storage.getSessionsByEventId(eventEditionId);
    return createSuccessResponse(sessions);
  },

  /**
   * Get session by ID
   */
  async getSessionById(sessionId: string): Promise<ApiResponse<Session>> {
    await simulateDelay();

    const session = storage.getSessionById(sessionId);
    if (!session) {
      return createErrorResponse('Sessão não encontrada');
    }

    return createSuccessResponse(session);
  },

  /**
   * Create session
   */
  async createSession(data: SessionFormData): Promise<ApiResponse<Session>> {
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
    if (!data.name || !data.date || !data.startTime || !data.endTime) {
      return createErrorResponse('Campos obrigatórios faltando');
    }

    // Get event from active events (SessionFormData doesn't include eventEditionId)
    const event = storage.getActiveEvent();
    if (!event) {
      return createErrorResponse('Nenhum evento ativo encontrado');
    }

    // Check for room conflicts if room is specified
    if (data.roomId) {
      const sessions = storage.getSessionsByEventId(event.id);
      const conflicts = sessions.filter(
        (s) =>
          s.roomId === data.roomId &&
          s.date === data.date &&
          timeRangesOverlap(s.startTime, s.endTime, data.startTime, data.endTime)
      );

      if (conflicts.length > 0) {
        return createErrorResponse('Conflito de sala/horário detectado', {
          roomId: ['Esta sala não está disponível neste horário'],
        });
      }
    }

    const newSession: Session = {
      id: generateId('session'),
      eventEditionId: event.id,
      name: data.name,
      description: data.description,
      date: data.date,
      startTime: data.startTime,
      endTime: data.endTime,
      roomId: data.roomId,
      presentationIds: [],
      maxPresentations: data.maxPresentations,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: validation.userId,
    };

    storage.addSession(newSession);
    return createSuccessResponse(newSession, 'Sessão criada com sucesso');
  },

  /**
   * Update session
   */
  async updateSession(
    sessionId: string,
    data: Partial<SessionFormData>
  ): Promise<ApiResponse<Session>> {
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

    // Check for conflicts if updating date/time/room
    if (data.date || data.startTime || data.endTime || data.roomId) {
      const sessions = storage.getSessionsByEventId(session.eventEditionId);
      const otherSessions = sessions.filter((s) => s.id !== sessionId);

      const updateDate = data.date || session.date;
      const updateStartTime = data.startTime || session.startTime;
      const updateEndTime = data.endTime || session.endTime;
      const updateRoomId = data.roomId || session.roomId;

      const conflicts = otherSessions.filter(
        (s) =>
          s.roomId === updateRoomId &&
          s.date === updateDate &&
          timeRangesOverlap(s.startTime, s.endTime, updateStartTime, updateEndTime)
      );

      if (conflicts.length > 0) {
        return createErrorResponse('Conflito de sala/horário detectado');
      }
    }

    const updated = storage.updateSession(sessionId, {
      ...data,
      updatedAt: new Date().toISOString(),
    });

    if (!updated) {
      return createErrorResponse('Erro ao atualizar sessão');
    }

    return createSuccessResponse(updated, 'Sessão atualizada com sucesso');
  },

  /**
   * Delete session
   */
  async deleteSession(sessionId: string): Promise<ApiResponse> {
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

    const deleted = storage.deleteSession(sessionId);
    if (!deleted) {
      return createErrorResponse('Erro ao deletar sessão');
    }

    return createSuccessResponse(null, 'Sessão deletada com sucesso');
  },

  /**
   * Validate session for conflicts
   */
  async validateSession(data: SessionFormData): Promise<ApiResponse<ScheduleConflict[]>> {
    await simulateDelay();

    const conflicts: ScheduleConflict[] = [];

    // Get event from active events
    const event = storage.getActiveEvent();
    if (!event) {
      return createErrorResponse('Nenhum evento ativo encontrado');
    }

    // Check for room conflicts
    if (data.roomId) {
      const sessions = storage.getSessionsByEventId(event.id);
      sessions.forEach((s) => {
        if (
          s.roomId === data.roomId &&
          s.date === data.date &&
          timeRangesOverlap(s.startTime, s.endTime, data.startTime, data.endTime)
        ) {
          conflicts.push({
            type: 'room',
            message: `Conflito com sessão '${s.name}' na mesma sala e horário`,
            sessionId: s.id,
            conflictingItems: [s.id],
          });
        }
      });
    }

    return createSuccessResponse(conflicts);
  },

  /**
   * Add presentation to session
   */
  async addPresentationToSession(
    sessionId: string,
    presentationId: string
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

    const presentation = storage.getPresentationById(presentationId);
    if (!presentation) {
      return createErrorResponse('Apresentação não encontrada');
    }

    // Check if already in session
    if (session.presentationIds.includes(presentationId)) {
      return createErrorResponse('Apresentação já está nesta sessão');
    }

    const updated = storage.updateSession(sessionId, {
      presentationIds: [...session.presentationIds, presentationId],
    });

    if (!updated) {
      return createErrorResponse('Erro ao adicionar apresentação');
    }

    return createSuccessResponse(null, 'Apresentação adicionada com sucesso');
  },

  /**
   * Remove presentation from session
   */
  async removePresentationFromSession(
    sessionId: string,
    presentationId: string
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

    const updated = storage.updateSession(sessionId, {
      presentationIds: session.presentationIds.filter((id) => id !== presentationId),
    });

    if (!updated) {
      return createErrorResponse('Erro ao remover apresentação');
    }

    return createSuccessResponse(null, 'Apresentação removida com sucesso');
  },

  // ============ Schedule ============

  /**
   * Get full event schedule
   */
  async getSchedule(eventEditionId: string): Promise<ApiResponse<ScheduleItem[]>> {
    await simulateDelay();

    const event = storage.getEventById(eventEditionId);
    if (!event) {
      return createErrorResponse('Evento não encontrado');
    }

    const sessions = storage.getSessionsByEventId(eventEditionId);
    const presentations = storage.getPresentationsByEventId(eventEditionId);

    // Group sessions by date
    const scheduleByDate: { [date: string]: ScheduleItem['sessions'] } = {};

    sessions.forEach((session) => {
      if (!scheduleByDate[session.date]) {
        scheduleByDate[session.date] = [];
      }

      const sessionPresentations = presentations
        .filter((p) => session.presentationIds.includes(p.id))
        .map((p) => ({
          presentation: {
            id: p.id,
            title: p.title,
            studentName: p.studentName,
            scheduledTime: p.scheduledTime || session.startTime,
            duration: p.duration,
          },
        }));

      scheduleByDate[session.date].push({
        session,
        presentations: sessionPresentations,
      });
    });

    // Sort sessions by time within each date
    Object.keys(scheduleByDate).forEach((date) => {
      scheduleByDate[date].sort((a, b) =>
        a.session.startTime.localeCompare(b.session.startTime)
      );
    });

    // Create schedule items (one per date)
    const scheduleItems: ScheduleItem[] = Object.entries(scheduleByDate).map(([date, sessionsList]) => ({
      date,
      sessions: sessionsList,
    }));

    // Sort by date
    scheduleItems.sort((a, b) => a.date.localeCompare(b.date));

    return createSuccessResponse(scheduleItems);
  },

  // ============ Rooms ============

  /**
   * Get all rooms
   */
  async getRooms(): Promise<ApiResponse<Room[]>> {
    await simulateDelay();

    const rooms = storage.getRooms();
    return createSuccessResponse(rooms);
  },

  /**
   * Get room by ID
   */
  async getRoomById(roomId: string): Promise<ApiResponse<Room>> {
    await simulateDelay();

    const room = storage.getRoomById(roomId);
    if (!room) {
      return createErrorResponse('Sala não encontrada');
    }

    return createSuccessResponse(room);
  },

  /**
   * Create room
   */
  async createRoom(data: Omit<Room, 'id'>): Promise<ApiResponse<Room>> {
    await simulateDelay();

    const token = localStorage.getItem('accessToken');
    if (!token) {
      return createErrorResponse('Não autenticado');
    }

    const validation = validateMockToken(token);
    if (!validation.valid) {
      return createErrorResponse('Token inválido ou expirado');
    }

    if (!data.name || !data.capacity) {
      return createErrorResponse('Campos obrigatórios faltando');
    }

    const newRoom: Room = {
      id: generateId('room'),
      ...data,
    };

    storage.addRoom(newRoom);
    return createSuccessResponse(newRoom, 'Sala criada com sucesso');
  },

  /**
   * Update room
   */
  async updateRoom(roomId: string, data: Partial<Room>): Promise<ApiResponse<Room>> {
    await simulateDelay();

    const token = localStorage.getItem('accessToken');
    if (!token) {
      return createErrorResponse('Não autenticado');
    }

    const validation = validateMockToken(token);
    if (!validation.valid) {
      return createErrorResponse('Token inválido ou expirado');
    }

    const room = storage.getRoomById(roomId);
    if (!room) {
      return createErrorResponse('Sala não encontrada');
    }

    const { id, ...safeData } = data;

    const updated = storage.updateRoom(roomId, safeData);

    if (!updated) {
      return createErrorResponse('Erro ao atualizar sala');
    }

    return createSuccessResponse(updated, 'Sala atualizada com sucesso');
  },

  /**
   * Delete room
   */
  async deleteRoom(roomId: string): Promise<ApiResponse> {
    await simulateDelay();

    const token = localStorage.getItem('accessToken');
    if (!token) {
      return createErrorResponse('Não autenticado');
    }

    const validation = validateMockToken(token);
    if (!validation.valid) {
      return createErrorResponse('Token inválido ou expirado');
    }

    const room = storage.getRoomById(roomId);
    if (!room) {
      return createErrorResponse('Sala não encontrada');
    }

    // Check if room is in use
    const sessions = storage.getSessions();
    const inUse = sessions.some((s) => s.roomId === roomId);
    if (inUse) {
      return createErrorResponse('Sala está sendo usada e não pode ser deletada');
    }

    return createSuccessResponse(null, 'Sala deletada com sucesso');
  },

  /**
   * Get available rooms for time slot
   */
  async getAvailableRooms(
    date: string,
    startTime: string,
    endTime: string
  ): Promise<ApiResponse<Room[]>> {
    await simulateDelay();

    const rooms = storage.getRooms();
    const sessions = storage.getSessions();

    const availableRooms = rooms.filter((room) => {
      const conflicting = sessions.some(
        (s) =>
          s.roomId === room.id &&
          s.date === date &&
          timeRangesOverlap(s.startTime, s.endTime, startTime, endTime)
      );

      return !conflicting;
    });

    return createSuccessResponse(availableRooms);
  },
};

export default mockEventService;
