/**
 * Tipos relacionados a eventos e sessões
 */

export interface Event {
  id: string;
  name: string; // Ex: "WEPGCOMP 2024"
  edition: string; // Ex: "2024"
  description: string;

  // Datas importantes
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  submissionDeadline: string; // Data limite para submissão de apresentações

  // Configurações
  presentationDuration: number; // Duração padrão em minutos
  maxPresentationsPerDay: number;
  availableRooms: string[]; // Ex: ["Sala 1", "Sala 2", "Auditório"]

  // Local
  venue: string;
  address: string;

  // Informações adicionais
  logoUrl?: string;
  bannerUrl?: string;
  contactEmail: string;
  website?: string;

  // Coordenação
  coordinatorId?: string; // ID do professor coordenador
  coordinatorName?: string;

  // Status
  isActive: boolean; // Evento ativo no momento
  createdAt: string;
  updatedAt: string;
}

export interface CreateEventDTO {
  name: string;
  edition: string;
  description: string;
  startDate: string;
  endDate: string;
  submissionDeadline: string;
  presentationDuration: number;
  maxPresentationsPerDay: number;
  availableRooms: string[];
  venue: string;
  address: string;
  contactEmail: string;
  website?: string;
  coordinatorId?: string;
}

export interface UpdateEventDTO {
  name?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  submissionDeadline?: string;
  presentationDuration?: number;
  maxPresentationsPerDay?: number;
  availableRooms?: string[];
  venue?: string;
  address?: string;
  contactEmail?: string;
  website?: string;
  coordinatorId?: string;
}

// Sessões
export interface Session {
  id: string;
  eventId: string;
  name: string; // Ex: "Sessão Manhã - Dia 1"
  date: string; // ISO date string
  startTime: string; // HH:mm formato
  endTime: string; // HH:mm formato
  room?: string; // Se null, bloqueia todas as salas
  maxPresentations: number;
  presentationIds: string[]; // IDs das apresentações nesta sessão
  createdAt: string;
  updatedAt: string;
}

export interface CreateSessionDTO {
  eventId: string;
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  room?: string;
  maxPresentations: number;
}

export interface UpdateSessionDTO {
  name?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  room?: string;
  maxPresentations?: number;
}

// Programação completa
export interface Schedule {
  event: Event;
  sessions: Session[];
  presentations: Array<{
    presentation: any; // Presentation type
    session?: Session;
  }>;
}

// Validação de conflitos
export interface ConflictValidation {
  hasConflict: boolean;
  conflicts: Array<{
    type: 'room' | 'time' | 'capacity';
    message: string;
    sessionId?: string;
  }>;
}

// Home Page Info
export interface HomePageInfo {
  event: Event;
  stats: {
    totalPresentations: number;
    totalParticipants: number;
    daysUntilEvent: number;
  };
  schedule: {
    date: string;
    sessions: Array<{
      session: Session;
      presentations: any[]; // Presentation[]
    }>;
  }[];
  contact: {
    email: string;
    phone?: string;
    address: string;
  };
  sponsors?: Array<{
    name: string;
    logoUrl: string;
    website?: string;
  }>;
}
