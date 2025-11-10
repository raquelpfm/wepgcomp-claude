/**
 * Event Context
 * Manages active event edition state
 */

import React, { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { eventService } from '@/services';
import { EventEdition } from '@/types';

interface EventContextType {
  activeEvent: EventEdition | null;
  allEvents: EventEdition[];
  isLoading: boolean;
  error: string | null;
  refreshActiveEvent: () => Promise<void>;
  refreshAllEvents: () => Promise<void>;
  setActiveEvent: (eventId: string) => Promise<void>;
}

export const EventContext = createContext<EventContextType | undefined>(undefined);

interface EventProviderProps {
  children: ReactNode;
}

export const EventProvider: React.FC<EventProviderProps> = ({ children }) => {
  const [activeEvent, setActiveEventState] = useState<EventEdition | null>(null);
  const [allEvents, setAllEvents] = useState<EventEdition[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Load active event on mount
   */
  useEffect(() => {
    loadActiveEvent();
    loadAllEvents();
  }, []);

  /**
   * Load active event edition
   */
  const loadActiveEvent = async () => {
    try {
      const response = await eventService.getActiveEventEdition();

      if (response.success && response.data) {
        setActiveEventState(response.data);
        // Store in localStorage for quick access
        localStorage.setItem('activeEventId', response.data.id);
      }
    } catch (err: any) {
      console.error('Failed to load active event:', err);
      setError(err.message || 'Erro ao carregar evento ativo');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Load all events
   */
  const loadAllEvents = async () => {
    try {
      const response = await eventService.getEventEditions();

      if (response.success && response.data) {
        setAllEvents(response.data);
      }
    } catch (err: any) {
      console.error('Failed to load events:', err);
    }
  };

  /**
   * Refresh active event data
   */
  const refreshActiveEvent = useCallback(async () => {
    await loadActiveEvent();
  }, []);

  /**
   * Refresh all events
   */
  const refreshAllEvents = useCallback(async () => {
    await loadAllEvents();
  }, []);

  /**
   * Set active event by ID
   */
  const setActiveEvent = useCallback(async (eventId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await eventService.setActiveEventEdition(eventId);

      if (response.success && response.data) {
        setActiveEventState(response.data);
        localStorage.setItem('activeEventId', response.data.id);
        await loadAllEvents(); // Refresh all events to update isActive flags
      } else {
        throw new Error(response.message || 'Erro ao definir evento ativo');
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Erro ao definir evento ativo';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value: EventContextType = {
    activeEvent,
    allEvents,
    isLoading,
    error,
    refreshActiveEvent,
    refreshAllEvents,
    setActiveEvent,
  };

  return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
};
