/**
 * Certificate and Award Types
 * Defines certificate and award-related types
 */

// Certificate type
export enum CertificateType {
  PARTICIPANT = 'PARTICIPANT', // General participation
  PRESENTER = 'PRESENTER', // For doctoral students who presented
  EVALUATOR = 'EVALUATOR', // For professors/listeners who voted
  AWARD_PRESENTER = 'AWARD_PRESENTER', // For awarded presenters
  AWARD_EVALUATOR = 'AWARD_EVALUATOR', // For awarded evaluators
  ORGANIZER = 'ORGANIZER', // For admins/coordinators
}

// Certificate interface
export interface Certificate {
  id: string;
  eventEditionId: string;
  userId: string;
  userName: string;
  userEmail: string;
  type: CertificateType;

  // Certificate details
  issuedAt: string;
  pdfUrl?: string;
  certificateNumber: string;

  // Award-specific fields
  awardTitle?: string; // e.g., "Best Presentation", "Best Evaluator"
  presentationTitle?: string; // For presenters

  // Status
  isSent: boolean;
  sentAt?: string;
}

// Award interface
export interface Award {
  id: string;
  eventEditionId: string;
  type: 'presentation' | 'evaluator';
  rank: number; // 1st, 2nd, 3rd place

  // Award recipient
  recipientId: string;
  recipientName: string;

  // For presentation awards
  presentationId?: string;
  presentationTitle?: string;
  score?: number;

  // For evaluator awards
  totalVotes?: number;

  // Metadata
  awardedAt: string;
  awardedBy: string; // User ID of admin who awarded
}

// Certificate generation request
export interface CertificateGenerationRequest {
  eventEditionId: string;
  userIds: string[]; // Generate for specific users
  type: CertificateType;
  sendEmail: boolean; // Whether to send via email
}

// Award selection
export interface AwardSelection {
  eventEditionId: string;
  type: 'presentation' | 'evaluator';
  selections: {
    userId: string;
    presentationId?: string; // For presentation awards
    rank: number;
  }[];
}
