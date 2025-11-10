/**
 * Confirm Email Page
 * Email confirmation with token from URL
 * FUNC03, FUNC07
 */

import React, { useEffect, useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { authService } from '@/services';
import { Loading, Alert, Button } from '@/components/common';
import { APP_NAME } from '@/utils/constants';
import { CheckCircle, XCircle } from 'lucide-react';

export const ConfirmEmailPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const confirmEmail = async () => {
      const token = searchParams.get('token');

      if (!token) {
        setError('Token de confirmação não encontrado.');
        setIsLoading(false);
        return;
      }

      try {
        const response = await authService.confirmEmail({ token });

        if (response.success) {
          setIsSuccess(true);

          // Redirect to login after 3 seconds
          setTimeout(() => {
            navigate('/auth/login');
          }, 3000);
        } else {
          setError(response.message || 'Erro ao confirmar e-mail.');
        }
      } catch (err: any) {
        setError(err.response?.data?.message || 'Erro ao confirmar e-mail. O token pode estar expirado.');
      } finally {
        setIsLoading(false);
      }
    };

    confirmEmail();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary-600 mb-2">{APP_NAME}</h1>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          {isLoading && (
            <div className="text-center">
              <Loading text="Confirmando seu e-mail..." />
            </div>
          )}

          {!isLoading && isSuccess && (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-green-600" size={32} />
              </div>
              <h2 className="text-2xl font-semibold text-secondary-900 mb-2">
                E-mail Confirmado!
              </h2>
              <p className="text-secondary-600 mb-6">
                Seu e-mail foi confirmado com sucesso. Você será redirecionado para a página de login em instantes.
              </p>
              <Button onClick={() => navigate('/auth/login')} fullWidth>
                Ir para Login
              </Button>
            </div>
          )}

          {!isLoading && error && (
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <XCircle className="text-red-600" size={32} />
              </div>
              <h2 className="text-2xl font-semibold text-secondary-900 mb-2">
                Erro na Confirmação
              </h2>
              <Alert type="error" className="mb-6">
                {error}
              </Alert>
              <Link to="/auth/login">
                <Button variant="ghost" fullWidth>
                  Voltar para Login
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
