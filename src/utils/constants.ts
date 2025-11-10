/**
 * Application Constants
 */

// Application info
export const APP_NAME = 'WEPGCOMP';
export const APP_FULL_NAME = 'Workshop de Apresentações de Doutorado - PGCOMP';
export const APP_VERSION = '1.0.0';

// UFBA information
export const PGCOMP_NAME = 'Programa de Pós-Graduação em Ciência da Computação';
export const UFBA_NAME = 'Universidade Federal da Bahia';
export const PGCOMP_EMAIL = 'pgcomp@ufba.br';

// Validation constants
export const MIN_PASSWORD_LENGTH = 8;
export const MAX_PDF_SIZE_MB = 10;
export const MAX_PDF_SIZE_BYTES = MAX_PDF_SIZE_MB * 1024 * 1024;

// Pagination defaults
export const DEFAULT_PAGE_SIZE = 20;
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

// Presentation duration options (in minutes)
export const PRESENTATION_DURATION_OPTIONS = [15, 20, 30, 45, 60];
export const DEFAULT_PRESENTATION_DURATION = 20;

// Score range
export const MIN_SCORE = 0;
export const MAX_SCORE = 10;

// Award ranks
export const AWARD_RANKS = {
  FIRST: 1,
  SECOND: 2,
  THIRD: 3,
};

// Number of evaluators to be awarded
export const MAX_EVALUATOR_AWARDS = 3;

// Time slots for sessions
export const TIME_SLOTS = [
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
];

// Local storage keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  USER_DATA: 'userData',
  ACTIVE_EVENT: 'activeEventId',
};

// API error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Erro de conexão. Verifique sua internet.',
  UNAUTHORIZED: 'Sessão expirada. Faça login novamente.',
  FORBIDDEN: 'Você não tem permissão para acessar este recurso.',
  NOT_FOUND: 'Recurso não encontrado.',
  SERVER_ERROR: 'Erro no servidor. Tente novamente mais tarde.',
  VALIDATION_ERROR: 'Dados inválidos. Verifique os campos.',
};

// Success messages
export const SUCCESS_MESSAGES = {
  LOGIN: 'Login realizado com sucesso!',
  LOGOUT: 'Logout realizado com sucesso!',
  REGISTER: 'Cadastro realizado! Verifique seu e-mail.',
  EMAIL_CONFIRMED: 'E-mail confirmado com sucesso!',
  PROFILE_UPDATED: 'Perfil atualizado com sucesso!',
  PRESENTATION_CREATED: 'Apresentação cadastrada com sucesso!',
  PRESENTATION_UPDATED: 'Apresentação atualizada com sucesso!',
  PDF_UPLOADED: 'PDF enviado com sucesso!',
  VOTE_SUBMITTED: 'Voto registrado com sucesso!',
  SESSION_CREATED: 'Sessão criada com sucesso!',
  SESSION_DELETED: 'Sessão excluída com sucesso!',
  USER_APPROVED: 'Usuário aprovado com sucesso!',
  USER_REJECTED: 'Usuário rejeitado!',
  ADMIN_GRANTED: 'Privilégios de administrador concedidos!',
  COORDINATOR_ASSIGNED: 'Coordenador atribuído com sucesso!',
  CERTIFICATES_GENERATED: 'Certificados gerados com sucesso!',
  CERTIFICATES_SENT: 'Certificados enviados por e-mail!',
  AWARDS_SELECTED: 'Premiações selecionadas com sucesso!',
  EVENT_CREATED: 'Edição do evento criada com sucesso!',
  EVENT_UPDATED: 'Edição do evento atualizada com sucesso!',
};

// Route paths
export const ROUTES = {
  HOME: '/',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  CONFIRM_EMAIL: '/auth/confirm-email',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',

  DASHBOARD: '/app/dashboard',
  PROFILE: '/app/profile',

  // Admin routes
  ADMIN_USERS: '/app/admin/users',
  ADMIN_APPROVALS: '/app/admin/approvals',
  ADMIN_PRESENTATIONS: '/app/admin/presentations',
  ADMIN_SESSIONS: '/app/admin/sessions',
  ADMIN_SCHEDULE: '/app/admin/schedule',
  ADMIN_RANKINGS: '/app/admin/rankings',
  ADMIN_CERTIFICATES: '/app/admin/certificates',
  ADMIN_EVENTS: '/app/admin/events',

  // Student routes
  STUDENT_PRESENTATION: '/app/student/my-presentation',
  STUDENT_UPLOAD: '/app/student/upload',

  // Professor/Listener routes
  PRESENTATIONS: '/app/presentations',
  PRESENTATION_DETAILS: '/app/presentations/:id',
  VOTE: '/app/presentations/:id/vote',
};

// Navigation menu items by role
export const NAVIGATION_ITEMS = {
  ADMIN: [
    { label: 'Dashboard', path: ROUTES.DASHBOARD, icon: 'LayoutDashboard' },
    { label: 'Usuários', path: ROUTES.ADMIN_USERS, icon: 'Users' },
    { label: 'Aprovações', path: ROUTES.ADMIN_APPROVALS, icon: 'UserCheck' },
    { label: 'Apresentações', path: ROUTES.ADMIN_PRESENTATIONS, icon: 'Presentation' },
    { label: 'Sessões', path: ROUTES.ADMIN_SESSIONS, icon: 'Calendar' },
    { label: 'Cronograma', path: ROUTES.ADMIN_SCHEDULE, icon: 'Clock' },
    { label: 'Premiações', path: ROUTES.ADMIN_RANKINGS, icon: 'Award' },
    { label: 'Certificados', path: ROUTES.ADMIN_CERTIFICATES, icon: 'FileText' },
    { label: 'Edições', path: ROUTES.ADMIN_EVENTS, icon: 'Settings' },
  ],
  DOCTORAL_STUDENT: [
    { label: 'Dashboard', path: ROUTES.DASHBOARD, icon: 'LayoutDashboard' },
    { label: 'Minha Apresentação', path: ROUTES.STUDENT_PRESENTATION, icon: 'Presentation' },
    { label: 'Apresentações', path: ROUTES.PRESENTATIONS, icon: 'List' },
  ],
  PROFESSOR: [
    { label: 'Dashboard', path: ROUTES.DASHBOARD, icon: 'LayoutDashboard' },
    { label: 'Apresentações', path: ROUTES.PRESENTATIONS, icon: 'List' },
  ],
  LISTENER: [
    { label: 'Dashboard', path: ROUTES.DASHBOARD, icon: 'LayoutDashboard' },
    { label: 'Apresentações', path: ROUTES.PRESENTATIONS, icon: 'List' },
  ],
};

// Status color mappings for UI
export const STATUS_COLORS = {
  // User status
  PENDING_EMAIL_CONFIRMATION: 'yellow',
  PENDING_APPROVAL: 'yellow',
  ACTIVE: 'green',
  INACTIVE: 'gray',
  REJECTED: 'red',

  // Presentation status
  DRAFT: 'gray',
  SUBMITTED: 'blue',
  SCHEDULED: 'green',
  COMPLETED: 'purple',
  CANCELLED: 'red',

  // Event status
  REGISTRATION_OPEN: 'green',
  REGISTRATION_CLOSED: 'yellow',
  IN_PROGRESS: 'blue',
  ARCHIVED: 'gray',
};
