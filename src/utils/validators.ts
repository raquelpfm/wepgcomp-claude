/**
 * Custom Validators
 * Validation functions for forms and data
 */

/**
 * FUNC02 - Validate UFBA email
 * Must end with @ufba.br or @aluno.ufba.br
 */
export const isUfbaEmail = (email: string): boolean => {
  const ufbaEmailRegex = /^[a-zA-Z0-9._%+-]+@(ufba\.br|aluno\.ufba\.br)$/;
  return ufbaEmailRegex.test(email);
};

/**
 * FUNC02 - Validate UFBA matricula
 * Should be numeric and have specific length (adjust as needed)
 */
export const isValidMatricula = (matricula: string): boolean => {
  // Assuming matricula should be numeric with 8-12 digits
  const matriculaRegex = /^\d{8,12}$/;
  return matriculaRegex.test(matricula);
};

/**
 * FUNC06 - Validate strong password
 * Must have:
 * - At least 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 * - At least one special character
 */
export const isStrongPassword = (password: string): boolean => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return (
    password.length >= minLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumber &&
    hasSpecialChar
  );
};

/**
 * Get password strength label
 */
export const getPasswordStrength = (password: string): 'weak' | 'medium' | 'strong' => {
  if (password.length < 6) return 'weak';
  if (isStrongPassword(password)) return 'strong';
  return 'medium';
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

/**
 * FUNC21 - Validate PDF file
 * Must be PDF format and under 10MB
 */
export const isValidPDF = (file: File): { valid: boolean; error?: string } => {
  const maxSizeInBytes = 10 * 1024 * 1024; // 10MB
  const allowedTypes = ['application/pdf'];

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'O arquivo deve estar em formato PDF' };
  }

  if (file.size > maxSizeInBytes) {
    return { valid: false, error: 'O arquivo deve ter no máximo 10MB' };
  }

  return { valid: true };
};

/**
 * FUNC39 - Validate submission deadline before event start
 */
export const isDeadlineBeforeEventStart = (deadline: string, eventStart: string): boolean => {
  const deadlineDate = new Date(deadline);
  const eventStartDate = new Date(eventStart);
  return deadlineDate < eventStartDate;
};

/**
 * Validate date range
 */
export const isValidDateRange = (startDate: string, endDate: string): boolean => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return start <= end;
};

/**
 * Validate time range
 */
export const isValidTimeRange = (startTime: string, endTime: string): boolean => {
  const [startHour, startMin] = startTime.split(':').map(Number);
  const [endHour, endMin] = endTime.split(':').map(Number);

  const startMinutes = startHour * 60 + startMin;
  const endMinutes = endHour * 60 + endMin;

  return startMinutes < endMinutes;
};

/**
 * Validate presentation score
 * Must be between 0 and 10
 */
export const isValidScore = (score: number): boolean => {
  return score >= 0 && score <= 10;
};

/**
 * Sanitize input to prevent XSS
 */
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};
