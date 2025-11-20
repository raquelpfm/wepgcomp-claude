/**
 * Validadores
 */

import { PASSWORD_MIN_LENGTH } from './constants';

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateUFBAEmail = (email: string): boolean => {
  return email.toLowerCase().endsWith('@ufba.br');
};

export const validatePassword = (password: string): { valid: boolean; message?: string } => {
  if (password.length < PASSWORD_MIN_LENGTH) {
    return { valid: false, message: `Senha deve ter no mínimo ${PASSWORD_MIN_LENGTH} caracteres` };
  }

  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: 'Senha deve conter pelo menos uma letra maiúscula' };
  }

  if (!/[a-z]/.test(password)) {
    return { valid: false, message: 'Senha deve conter pelo menos uma letra minúscula' };
  }

  if (!/[0-9]/.test(password)) {
    return { valid: false, message: 'Senha deve conter pelo menos um número' };
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return { valid: false, message: 'Senha deve conter pelo menos um caractere especial' };
  }

  return { valid: true };
};

export const validateFileSize = (file: File, maxSizeMB: number): boolean => {
  return file.size <= maxSizeMB * 1024 * 1024;
};

export const validateFileType = (file: File, allowedTypes: string[]): boolean => {
  return allowedTypes.includes(file.type);
};
