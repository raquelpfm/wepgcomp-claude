/**
 * Formatters
 * Functions for formatting data for display
 */

import { format, parseISO, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

/**
 * Format date to Brazilian format (dd/MM/yyyy)
 */
export const formatDate = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    return format(date, 'dd/MM/yyyy', { locale: ptBR });
  } catch (error) {
    return dateString;
  }
};

/**
 * Format date and time to Brazilian format (dd/MM/yyyy HH:mm)
 */
export const formatDateTime = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    return format(date, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
  } catch (error) {
    return dateString;
  }
};

/**
 * Format time (HH:mm)
 */
export const formatTime = (timeString: string): string => {
  return timeString; // Already in HH:mm format
};

/**
 * Format relative time (e.g., "há 2 horas")
 */
export const formatRelativeTime = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    return formatDistanceToNow(date, { locale: ptBR, addSuffix: true });
  } catch (error) {
    return dateString;
  }
};

/**
 * Format score (0-10) with 1 decimal place
 */
export const formatScore = (score: number): string => {
  return score.toFixed(1);
};

/**
 * Format file size (bytes to human-readable)
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

/**
 * Format user role to Portuguese
 */
export const formatUserRole = (role: string): string => {
  const roleMap: Record<string, string> = {
    SUPER_ADMIN: 'Super Administrador',
    ADMIN: 'Administrador',
    COORDINATOR: 'Coordenador',
    PROFESSOR: 'Professor',
    DOCTORAL_STUDENT: 'Doutorando',
    LISTENER: 'Ouvinte',
  };

  return roleMap[role] || role;
};

/**
 * Format user status to Portuguese
 */
export const formatUserStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    PENDING_EMAIL_CONFIRMATION: 'Aguardando Confirmação de E-mail',
    PENDING_APPROVAL: 'Aguardando Aprovação',
    ACTIVE: 'Ativo',
    INACTIVE: 'Inativo',
    REJECTED: 'Rejeitado',
  };

  return statusMap[status] || status;
};

/**
 * Format presentation status to Portuguese
 */
export const formatPresentationStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    DRAFT: 'Rascunho',
    SUBMITTED: 'Submetido',
    SCHEDULED: 'Agendado',
    COMPLETED: 'Concluído',
    CANCELLED: 'Cancelado',
  };

  return statusMap[status] || status;
};

/**
 * Format event edition status to Portuguese
 */
export const formatEventStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    DRAFT: 'Rascunho',
    REGISTRATION_OPEN: 'Inscrições Abertas',
    REGISTRATION_CLOSED: 'Inscrições Encerradas',
    IN_PROGRESS: 'Em Andamento',
    COMPLETED: 'Concluído',
    ARCHIVED: 'Arquivado',
  };

  return statusMap[status] || status;
};

/**
 * Format certificate type to Portuguese
 */
export const formatCertificateType = (type: string): string => {
  const typeMap: Record<string, string> = {
    PARTICIPANT: 'Participante',
    PRESENTER: 'Apresentador',
    EVALUATOR: 'Avaliador',
    AWARD_PRESENTER: 'Apresentador Premiado',
    AWARD_EVALUATOR: 'Avaliador Premiado',
    ORGANIZER: 'Organizador',
  };

  return typeMap[type] || type;
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Format duration in minutes to human-readable (e.g., "1h 30min")
 */
export const formatDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} min`;
  }

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (mins === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${mins}min`;
};

/**
 * Get initials from name (for avatar)
 */
export const getInitials = (name: string): string => {
  const parts = name.trim().split(' ');
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

/**
 * Format ordinal number (1st, 2nd, 3rd)
 */
export const formatOrdinal = (n: number): string => {
  return `${n}º`;
};
