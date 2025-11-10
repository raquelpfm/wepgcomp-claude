/**
 * useEvent Hook
 * Custom hook to access EventContext
 */

import { useContext } from 'react';
import { EventContext } from '@/contexts/EventContext';

export const useEvent = () => {
  const context = useContext(EventContext);

  if (context === undefined) {
    throw new Error('useEvent must be used within an EventProvider');
  }

  return context;
};
