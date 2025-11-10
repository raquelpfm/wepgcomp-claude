/**
 * Event Types and Interfaces
 * Defines event edition, session, and room related types
 */

// Event edition status
export enum EventEditionStatus {
  DRAFT = 'DRAFT', // Being configured
  REGISTRATION_OPEN = 'REGISTRATION_OPEN', // Accepting submissions
  REGISTRATION_CLOSED = 'REGISTRATION_CLOSED', // No more submissions
  IN_PROGRESS = 'IN_PROGRESS', // Event is happening
  COMPLETED = 'COMPLETED',
  ARCHIVED = 'ARCHIVED',
}

// Event edition interface
export interface EventEdition {
  id: string;
  name: string; // e.g., "WEPGCOMP 2024"
  year: number;
  edition: number; // e.g., 1st, 2nd, 3rd edition
  description: string;

  // Important dates
  submissionDeadline: string; // ISO date string
  eventStartDate: string; // ISO date string
  eventEndDate: string; // ISO date string

  // Configuration
  maxPresentations: number;
  presentationDuration: number; // Default duration in minutes
  allowVoting: boolean;

  // Coordinator
  coordinatorId?: string;
  coordinatorName?: string;

  // Status
  status: EventEditionStatus;
  isActive: boolean; // Only one edition can be active

  // Metadata
  createdAt: string;
  updatedAt: string;
  createdBy: string; // User ID of creator
}

// Form data for creating/editing event edition
export interface EventEditionFormData {
  name: string;
  year: number;
  edition: number;
  description: string;
  submissionDeadline: string;
  eventStartDate: string;
  eventEndDate: string;
  maxPresentations: number;
  presentationDuration: number;
  coordinatorId?: string;
}

// Session interface
export interface Session {
  id: string;
  eventEditionId: string;
  name: string;
  description?: string;

  // Date and time
  date: string; // ISO date string
  startTime: string; // Format: HH:mm
  endTime: string; // Format: HH:mm

  // Room assignment (optional - if not set, blocks all rooms)
  roomId?: string;
  roomName?: string;

  // Presentations in this session
  presentationIds: string[];
  maxPresentations?: number;

  // Metadata
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

// Session form data
export interface SessionFormData {
  name: string;
  description?: string;
  date: string;
  startTime: string;
  endTime: string;
  roomId?: string;
  maxPresentations?: number;
}

// Room interface
export interface Room {
  id: string;
  name: string;
  building?: string;
  capacity: number;
  hasProjector: boolean;
  hasComputer: boolean;
  notes?: string;
  isActive: boolean;
}

// Schedule view - combines sessions and presentations
export interface ScheduleItem {
  date: string;
  sessions: {
    session: Session;
    presentations: Array<{
      presentation: {
        id: string;
        title: string;
        studentName: string;
        scheduledTime: string;
        duration: number;
      };
    }>;
  }[];
}

// Conflict detection
export interface ScheduleConflict {
  type: 'room' | 'time' | 'session';
  message: string;
  sessionId?: string;
  roomId?: string;
  conflictingItems: string[];
}
