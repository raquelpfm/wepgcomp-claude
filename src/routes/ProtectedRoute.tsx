/**
 * Protected Route Component
 * Guards routes based on authentication and role
 */

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks';
import { UserRole } from '@/types';
import { Loading } from '@/components/common';
import { AppLayout } from '@/components/layout';

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
  requireAuth?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles,
  requireAuth = true,
}) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  // Show loading while checking authentication
  if (isLoading) {
    return <Loading fullScreen text="Carregando..." />;
  }

  // Redirect to login if authentication is required but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  // Check if user has required role
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // User is authenticated but doesn't have permission
    return (
      <AppLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-secondary-900 mb-2">
            Acesso Negado
          </h2>
          <p className="text-secondary-600">
            Você não tem permissão para acessar esta página.
          </p>
        </div>
      </AppLayout>
    );
  }

  // Render children with layout for authenticated routes
  return requireAuth ? (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ) : (
    <Outlet />
  );
};
