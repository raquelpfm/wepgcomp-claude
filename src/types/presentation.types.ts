/**
 * Presentation Types and Interfaces
 * Defines all presentation-related types for the WEPGCOMP system
 */

// Presentation status
export enum PresentationStatus {
  DRAFT = 'DRAFT', // Student is still editing
  SUBMITTED = 'SUBMITTED', // Submitted but not scheduled
  SCHEDULED = 'SCHEDULED', // Has date, time, and session assigned
  COMPLETED = 'COMPLETED', // Event has occurred
  CANCELLED = 'CANCELLED',
}

// Base presentation interface
export interface Presentation {
  id: string;
  eventEditionId: string;
  studentId: string;
  studentName: string;
  studentMatricula: string;

  // Presentation details
  title: string;
  abstract: string;
  keywords: string[];
  advisorName: string;
  advisorEmail: string;

  // Scheduling
  suggestedDate?: string; // ISO date string
  suggestedTime?: string; // Format: HH:mm
  scheduledDate?: string; // ISO date string
  scheduledTime?: string; // Format: HH:mm
  duration: number; // In minutes
  sessionId?: string;
  roomId?: string;

  // Files
  pdfUrl?: string;
  pdfFileName?: string;
  pdfUploadedAt?: string;

  // Status and metadata
  status: PresentationStatus;
  submittedAt?: string;
  createdAt: string;
  updatedAt: string;

  // Voting/evaluation
  averageScore?: number;
  totalVotes?: number;
}

// Form data for creating/editing presentation
export interface PresentationFormData {
  title: string;
  abstract: string;
  keywords: string[];
  advisorName: string;
  advisorEmail: string;
  suggestedDate?: string;
  suggestedTime?: string;
  duration: number;
}

// Presentation with student details
export interface PresentationWithDetails extends Presentation {
  student: {
    id: string;
    name: string;
    email: string;
    matricula: string;
  };
  session?: {
    id: string;
    name: string;
    startTime: string;
    endTime: string;
  };
  room?: {
    id: string;
    name: string;
    capacity: number;
  };
}

// Presentation vote/evaluation
export interface PresentationVote {
  id: string;
  presentationId: string;
  userId: string;
  userName: string;
  userRole: string;
  score: number; // 0-10
  comment?: string;
  votedAt: string;
}

// Presentation ranking for awards
export interface PresentationRanking {
  presentation: Presentation;
  averageScore: number;
  totalVotes: number;
  rank: number;
}
