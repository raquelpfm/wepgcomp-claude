/**
 * Tipos relacionados a apresentações
 */

export enum PresentationStatus {
  DRAFT = 'DRAFT', // Rascunho
  SUBMITTED = 'SUBMITTED', // Submetida
  APPROVED = 'APPROVED', // Aprovada
  SCHEDULED = 'SCHEDULED', // Agendada
  COMPLETED = 'COMPLETED', // Concluída
  CANCELLED = 'CANCELLED', // Cancelada
}

export interface Presentation {
  id: string;
  eventId: string; // ID do evento/edição
  studentId: string; // ID do doutorando
  studentName: string; // Nome do doutorando (desnormalizado para performance)

  // Informações da apresentação
  title: string;
  abstract: string;
  keywords: string[];
  advisorName: string;
  advisorEmail: string;

  // Agendamento
  suggestedDate?: string; // ISO date string - sugestão do doutorando
  suggestedTime?: string; // HH:mm formato
  scheduledDate?: string; // ISO date string - data confirmada
  scheduledTime?: string; // HH:mm formato
  scheduledEndTime?: string; // HH:mm formato
  sessionId?: string; // ID da sessão
  room?: string;

  // Material
  pdfUrl?: string; // URL ou base64 do PDF
  pdfFileName?: string;
  pdfFileSize?: number; // Em bytes

  // Status e datas
  status: PresentationStatus;
  createdAt: string;
  updatedAt: string;
  submittedAt?: string;
  approvedAt?: string;

  // Metadados
  order?: number; // Ordem dentro da sessão
  duration: number; // Duração em minutos (padrão: 30)
}

export interface CreatePresentationDTO {
  title: string;
  abstract: string;
  keywords: string[];
  advisorName: string;
  advisorEmail: string;
  suggestedDate?: string;
  suggestedTime?: string;
}

export interface UpdatePresentationDTO {
  title?: string;
  abstract?: string;
  keywords?: string[];
  advisorName?: string;
  advisorEmail?: string;
  suggestedDate?: string;
  suggestedTime?: string;
  scheduledDate?: string;
  scheduledTime?: string;
  scheduledEndTime?: string;
  sessionId?: string;
  room?: string;
  status?: PresentationStatus;
  order?: number;
  duration?: number;
}

export interface UploadPdfDTO {
  presentationId: string;
  file: File;
}

// Votação/Avaliação
export interface PresentationVote {
  id: string;
  presentationId: string;
  userId: string;
  userName: string; // Desnormalizado
  userRole: string; // Papel do avaliador
  score: number; // Nota de 0-10
  comment?: string;
  createdAt: string;
}

export interface CreateVoteDTO {
  presentationId: string;
  score: number;
  comment?: string;
}

export interface PresentationWithVotes extends Presentation {
  votes: PresentationVote[];
  averageScore: number;
  voteCount: number;
  userVote?: PresentationVote; // Voto do usuário atual, se houver
}

// Ranking
export interface PresentationRanking {
  presentation: Presentation;
  student: {
    id: string;
    name: string;
    email: string;
  };
  averageScore: number;
  voteCount: number;
  rank: number;
}

// Seleção de melhores avaliadores
export interface TopEvaluator {
  userId: string;
  userName: string;
  evaluationCount: number;
  selected: boolean; // Se foi selecionado para prêmio
}
