/**
 * Funções auxiliares para serviços mock
 */

/**
 * Simula latência de rede
 */
export const delay = (ms: number = 300): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Gera um ID único (UUID v4 simplificado)
 */
export const generateId = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

/**
 * Gera um token JWT mockado
 */
export const generateToken = (userId: string): string => {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({
    userId,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 24 horas
  }));
  const signature = btoa(`mock_signature_${userId}_${Date.now()}`);

  return `${header}.${payload}.${signature}`;
};

/**
 * Verifica se um token é válido (mock)
 */
export const verifyToken = (token: string): { valid: boolean; userId?: string } => {
  try {
    const [, payloadBase64] = token.split('.');
    const payload = JSON.parse(atob(payloadBase64));

    // Verifica expiração
    if (payload.exp * 1000 < Date.now()) {
      return { valid: false };
    }

    return {
      valid: true,
      userId: payload.userId,
    };
  } catch {
    return { valid: false };
  }
};

/**
 * Valida email UFBA
 */
export const isUFBAEmail = (email: string): boolean => {
  return email.toLowerCase().endsWith('@ufba.br');
};

/**
 * Valida formato de email
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valida senha forte
 * Mínimo 8 caracteres, pelo menos uma maiúscula, uma minúscula, um número e um caractere especial
 */
export const isStrongPassword = (password: string): boolean => {
  if (password.length < 8) return false;

  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
};

/**
 * Simula envio de email
 */
export const sendMockEmail = (to: string, subject: string, body: string): void => {
  console.log('=== MOCK EMAIL SENT ===');
  console.log(`To: ${to}`);
  console.log(`Subject: ${subject}`);
  console.log(`Body: ${body}`);
  console.log('=====================');

  // Em um sistema real, aqui seria feita a chamada para API de envio de email
};

/**
 * Gera um código de verificação
 */
export const generateVerificationCode = (): string => {
  return Math.random().toString(36).substring(2, 15) +
         Math.random().toString(36).substring(2, 15);
};

/**
 * Hash de senha (mock - NÃO usar em produção real)
 */
export const hashPassword = (password: string): string => {
  // Em produção real, usar bcrypt ou similar
  return btoa(password + '_hashed_salt_12345');
};

/**
 * Verifica senha (mock)
 */
export const verifyPassword = (password: string, hash: string): boolean => {
  return hashPassword(password) === hash;
};

/**
 * Formata data para formato brasileiro
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR');
};

/**
 * Formata data e hora para formato brasileiro
 */
export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString('pt-BR');
};

/**
 * Calcula diferença de dias entre duas datas
 */
export const daysBetween = (date1: string, date2: string): number => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

/**
 * Verifica se uma data está no futuro
 */
export const isFutureDate = (dateString: string): boolean => {
  return new Date(dateString) > new Date();
};

/**
 * Verifica se uma data está no passado
 */
export const isPastDate = (dateString: string): boolean => {
  return new Date(dateString) < new Date();
};

/**
 * Converte File para base64
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

/**
 * Valida tamanho de arquivo
 */
export const validateFileSize = (file: File, maxSizeMB: number): boolean => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
};

/**
 * Valida tipo de arquivo
 */
export const validateFileType = (file: File, allowedTypes: string[]): boolean => {
  return allowedTypes.includes(file.type);
};

/**
 * Gera código de verificação de certificado
 */
export const generateCertificateCode = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';

  for (let i = 0; i < 12; i++) {
    if (i > 0 && i % 4 === 0) code += '-';
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return code;
};

/**
 * Ordena array por campo
 */
export const sortBy = <T>(array: T[], field: keyof T, order: 'asc' | 'desc' = 'asc'): T[] => {
  return [...array].sort((a, b) => {
    const aVal = a[field];
    const bVal = b[field];

    if (aVal === bVal) return 0;

    const comparison = aVal > bVal ? 1 : -1;
    return order === 'asc' ? comparison : -comparison;
  });
};
