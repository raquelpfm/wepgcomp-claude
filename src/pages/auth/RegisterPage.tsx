/**
 * Register Page
 * User registration with role selection
 * FUNC01, FUNC02, FUNC03, FUNC05, FUNC06, FUNC07
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Input, Alert, Card } from '@/components/common';
import { authService } from '@/services';
import { APP_NAME } from '@/utils/constants';
import { isUfbaEmail, isValidMatricula, isStrongPassword } from '@/utils/validators';
import { UserPlus, GraduationCap, Users as UsersIcon, BookOpen } from 'lucide-react';

type UserType = 'professor' | 'student' | 'listener';

// Professor schema - FUNC01, FUNC02, FUNC06
const professorSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('E-mail inválido').refine(isUfbaEmail, 'E-mail deve ser do domínio @ufba.br'),
  matricula: z.string().refine(isValidMatricula, 'Matrícula inválida'),
  password: z.string().refine(isStrongPassword, 'Senha deve ter pelo menos 8 caracteres, incluindo maiúsculas, minúsculas, números e caracteres especiais'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword'],
});

// Student schema - FUNC01, FUNC02, FUNC06
const studentSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('E-mail inválido').refine(isUfbaEmail, 'E-mail deve ser do domínio @ufba.br ou @aluno.ufba.br'),
  matricula: z.string().refine(isValidMatricula, 'Matrícula inválida'),
  password: z.string().refine(isStrongPassword, 'Senha deve ter pelo menos 8 caracteres, incluindo maiúsculas, minúsculas, números e caracteres especiais'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword'],
});

// Listener schema - FUNC05, FUNC06
const listenerSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('E-mail inválido'),
  password: z.string().refine(isStrongPassword, 'Senha deve ter pelo menos 8 caracteres, incluindo maiúsculas, minúsculas, números e caracteres especiais'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword'],
});

type RegisterFormData = z.infer<typeof professorSchema | typeof studentSchema | typeof listenerSchema>;

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<UserType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getSchema = () => {
    if (userType === 'professor') return professorSchema;
    if (userType === 'student') return studentSchema;
    return listenerSchema;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(getSchema()),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      let response;

      if (userType === 'professor') {
        response = await authService.registerProfessor(data as any);
      } else if (userType === 'student') {
        response = await authService.registerStudent(data as any);
      } else {
        response = await authService.registerListener(data as any);
      }

      if (response.success) {
        // FUNC03, FUNC07 - Show success message about email confirmation
        setSuccess('Cadastro realizado com sucesso! Verifique seu e-mail para confirmar sua conta.');
        reset();

        // Redirect after 3 seconds
        setTimeout(() => {
          navigate('/auth/login');
        }, 3000);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao realizar cadastro. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  // User type selection view
  if (!userType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100 flex items-center justify-center px-4">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary-600 mb-2">{APP_NAME}</h1>
            <p className="text-lg text-secondary-600">Escolha o tipo de cadastro</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card
              className="cursor-pointer hover:shadow-xl transition-all"
              onClick={() => setUserType('professor')}
            >
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="text-primary-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">Professor</h3>
                <p className="text-sm text-secondary-600">
                  Para professores do PGCOMP que desejam avaliar apresentações
                </p>
                <p className="text-xs text-secondary-500 mt-3">
                  * Requer e-mail @ufba.br e aprovação
                </p>
              </div>
            </Card>

            <Card
              className="cursor-pointer hover:shadow-xl transition-all"
              onClick={() => setUserType('student')}
            >
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="text-green-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">Doutorando</h3>
                <p className="text-sm text-secondary-600">
                  Para doutorandos que irão apresentar seus trabalhos
                </p>
                <p className="text-xs text-secondary-500 mt-3">
                  * Requer e-mail @ufba.br ou @aluno.ufba.br
                </p>
              </div>
            </Card>

            <Card
              className="cursor-pointer hover:shadow-xl transition-all"
              onClick={() => setUserType('listener')}
            >
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UsersIcon className="text-purple-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">Ouvinte</h3>
                <p className="text-sm text-secondary-600">
                  Para participantes externos que desejam assistir e avaliar
                </p>
                <p className="text-xs text-secondary-500 mt-3">
                  * Qualquer e-mail válido
                </p>
              </div>
            </Card>
          </div>

          <div className="text-center mt-6">
            <Link to="/auth/login" className="text-sm text-secondary-600 hover:text-secondary-900">
              Já tem uma conta? Faça login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Registration form view
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-primary-600 mb-2">{APP_NAME}</h1>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center gap-2 mb-6">
            <UserPlus className="text-primary-600" size={24} />
            <div>
              <h2 className="text-2xl font-semibold text-secondary-900">
                Cadastro de {userType === 'professor' ? 'Professor' : userType === 'student' ? 'Doutorando' : 'Ouvinte'}
              </h2>
            </div>
          </div>

          <button
            onClick={() => setUserType(null)}
            className="text-sm text-primary-600 hover:text-primary-700 mb-4"
          >
            ← Alterar tipo de cadastro
          </button>

          {error && (
            <Alert type="error" className="mb-4">
              {error}
            </Alert>
          )}

          {success && (
            <Alert type="success" className="mb-4">
              {success}
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Nome Completo"
              placeholder="Seu nome completo"
              error={errors.name?.message}
              required
              {...register('name')}
            />

            <Input
              label="E-mail"
              type="email"
              placeholder={userType === 'listener' ? 'seu-email@exemplo.com' : 'seu-email@ufba.br'}
              helperText={userType !== 'listener' ? 'Deve ser um e-mail UFBA' : ''}
              error={errors.email?.message}
              required
              {...register('email')}
            />

            {(userType === 'professor' || userType === 'student') && (
              <Input
                label="Matrícula UFBA"
                placeholder="Ex: 202012345"
                error={(errors as any).matricula?.message}
                required
                {...register('matricula')}
              />
            )}

            <Input
              label="Senha"
              type="password"
              placeholder="••••••••"
              helperText="Mínimo 8 caracteres, incluindo maiúsculas, minúsculas, números e caracteres especiais"
              error={errors.password?.message}
              required
              {...register('password')}
            />

            <Input
              label="Confirmar Senha"
              type="password"
              placeholder="••••••••"
              error={errors.confirmPassword?.message}
              required
              {...register('confirmPassword')}
            />

            {userType === 'professor' && (
              <Alert type="info" className="text-sm">
                Seu cadastro precisará ser aprovado por um administrador antes que você possa acessar o sistema.
              </Alert>
            )}

            <Button
              type="submit"
              fullWidth
              isLoading={isLoading}
              disabled={isLoading}
            >
              Cadastrar
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <Link to="/auth/login" className="text-primary-600 hover:text-primary-700">
              Já tem uma conta? Faça login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
