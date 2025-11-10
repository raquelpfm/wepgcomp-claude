/**
 * Event Service
 * Handles event edition, session, and room management API calls
 */

import api from './api';
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

const eventService = {
  // ============ Event Editions ============

  /**
   * Get all event editions
   */
  async getEventEditions(): Promise<ApiResponse<EventEdition[]>> {
    const response = await api.get('/events');
    return response.data;
  },

  /**
   * Get active event edition
   */
  async getActiveEventEdition(): Promise<ApiResponse<EventEdition>> {
    const response = await api.get('/events/active');
    return response.data;
  },

  /**
   * Get event edition by ID
   */
  async getEventEditionById(eventId: string): Promise<ApiResponse<EventEdition>> {
    const response = await api.get(`/events/${eventId}`);
    return response.data;
  },

  /**
   * FUNC36 - Create new event edition
   * Reuses user registrations from previous editions
   */
  async createEventEdition(data: EventEditionFormData): Promise<ApiResponse<EventEdition>> {
    const response = await api.post('/events', data);
    return response.data;
  },

  /**
   * FUNC37, FUNC38, FUNC39 - Update event edition
   * Edit parameters of active event edition with validations
   */
  async updateEventEdition(
    eventId: string,
    data: Partial<EventEditionFormData>
  ): Promise<ApiResponse<EventEdition>> {
    const response = await api.put(`/events/${eventId}`, data);
    return response.data;
  },

  /**
   * Set event edition as active
   */
  async setActiveEventEdition(eventId: string): Promise<ApiResponse<EventEdition>> {
    const response = await api.post(`/events/${eventId}/set-active`);
    return response.data;
  },

  /**
   * Archive event edition
   */
  async archiveEventEdition(eventId: string): Promise<ApiResponse> {
    const response = await api.post(`/events/${eventId}/archive`);
    return response.data;
  },

  // ============ Sessions ============

  /**
   * Get all sessions for event edition
   */
  async getSessions(eventEditionId: string): Promise<ApiResponse<Session[]>> {
    const response = await api.get('/sessions', {
      params: { eventEditionId },
    });
    return response.data;
  },

  /**
   * Get session by ID
   */
  async getSessionById(sessionId: string): Promise<ApiResponse<Session>> {
    const response = await api.get(`/sessions/${sessionId}`);
    return response.data;
  },

  /**
   * FUNC25, FUNC27 - Create session
   * Creates and validates session before adding to schedule
   */
  async createSession(data: SessionFormData): Promise<ApiResponse<Session>> {
    const response = await api.post('/sessions', data);
    return response.data;
  },

  /**
   * Update session
   */
  async updateSession(sessionId: string, data: Partial<SessionFormData>): Promise<ApiResponse<Session>> {
    const response = await api.put(`/sessions/${sessionId}`, data);
    return response.data;
  },

  /**
   * FUNC25 - Delete session
   */
  async deleteSession(sessionId: string): Promise<ApiResponse> {
    const response = await api.delete(`/sessions/${sessionId}`);
    return response.data;
  },

  /**
   * FUNC27 - Validate session for conflicts
   * Checks for room/time conflicts before creating
   */
  async validateSession(data: SessionFormData): Promise<ApiResponse<ScheduleConflict[]>> {
    const response = await api.post('/sessions/validate', data);
    return response.data;
  },

  /**
   * Add presentation to session
   */
  async addPresentationToSession(
    sessionId: string,
    presentationId: string
  ): Promise<ApiResponse> {
    const response = await api.post(`/sessions/${sessionId}/presentations`, {
      presentationId,
    });
    return response.data;
  },

  /**
   * Remove presentation from session
   */
  async removePresentationFromSession(
    sessionId: string,
    presentationId: string
  ): Promise<ApiResponse> {
    const response = await api.delete(`/sessions/${sessionId}/presentations/${presentationId}`);
    return response.data;
  },

  // ============ Schedule ============

  /**
   * FUNC33, FUNC34 - Get full event schedule
   * Returns organized schedule with sessions and presentations
   */
  async getSchedule(eventEditionId: string): Promise<ApiResponse<ScheduleItem[]>> {
    const response = await api.get('/schedule', {
      params: { eventEditionId },
    });
    return response.data;
  },

  // ============ Rooms ============

  /**
   * Get all rooms
   */
  async getRooms(): Promise<ApiResponse<Room[]>> {
    const response = await api.get('/rooms');
    return response.data;
  },

  /**
   * Get room by ID
   */
  async getRoomById(roomId: string): Promise<ApiResponse<Room>> {
    const response = await api.get(`/rooms/${roomId}`);
    return response.data;
  },

  /**
   * Create room
   */
  async createRoom(data: Omit<Room, 'id'>): Promise<ApiResponse<Room>> {
    const response = await api.post('/rooms', data);
    return response.data;
  },

  /**
   * Update room
   */
  async updateRoom(roomId: string, data: Partial<Room>): Promise<ApiResponse<Room>> {
    const response = await api.put(`/rooms/${roomId}`, data);
    return response.data;
  },

  /**
   * Delete room
   */
  async deleteRoom(roomId: string): Promise<ApiResponse> {
    const response = await api.delete(`/rooms/${roomId}`);
    return response.data;
  },

  /**
   * Get available rooms for time slot
   */
  async getAvailableRooms(date: string, startTime: string, endTime: string): Promise<ApiResponse<Room[]>> {
    const response = await api.get('/rooms/available', {
      params: { date, startTime, endTime },
    });
    return response.data;
  },
};

export default eventService;
