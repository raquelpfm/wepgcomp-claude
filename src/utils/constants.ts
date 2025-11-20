/**
 * Constantes da aplicação
 */

export const APP_NAME = 'WEPGCOMP';
export const APP_DESCRIPTION = 'Sistema de Gerenciamento de Apresentações de Doutorado - PGCOMP/UFBA';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  CONFIRM_EMAIL: '/confirm-email',
  DASHBOARD: '/dashboard',
  MY_PRESENTATION: '/my-presentation',
  PRESENTATIONS: '/presentations',
  PRESENTATION_DETAIL: '/presentations/:id',
  ADMIN: '/admin',
  ADMIN_USERS: '/admin/users',
  ADMIN_APPROVALS: '/admin/approvals',
  ADMIN_PRESENTATIONS: '/admin/presentations',
  ADMIN_SESSIONS: '/admin/sessions',
  ADMIN_EVENT: '/admin/event',
  ADMIN_PERMISSIONS: '/admin/permissions',
  ADMIN_RANKING: '/admin/ranking',
  ADMIN_CERTIFICATES: '/admin/certificates',
} as const;

export const MAX_PDF_SIZE_MB = 10;
export const ALLOWED_PDF_TYPES = ['application/pdf'];

export const PASSWORD_MIN_LENGTH = 8;

export const PRESENTATION_DURATION_DEFAULT = 30; // minutos

export const DATE_FORMAT = 'dd/MM/yyyy';
export const DATE_TIME_FORMAT = 'dd/MM/yyyy HH:mm';
export const TIME_FORMAT = 'HH:mm';
