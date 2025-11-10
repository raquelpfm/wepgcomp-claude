/**
 * Application Routes
 * Defines all routes and route protection
 */

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { UserRole } from '@/types';

// Public pages
import { HomePage } from '@/pages/HomePage';
import { LoginPage } from '@/pages/auth/LoginPage';
import { RegisterPage } from '@/pages/auth/RegisterPage';
import { ConfirmEmailPage } from '@/pages/auth/ConfirmEmailPage';

// Authenticated pages
import { DashboardPage } from '@/pages/DashboardPage';

// Note: For a complete implementation, you would create all the pages below
// For now, we'll create placeholder components for demonstration

// Placeholder component for unimplemented pages
const PlaceholderPage: React.FC<{ title: string }> = ({ title }) => (
  <div className="text-center py-12">
    <h1 className="text-3xl font-bold text-secondary-900 mb-4">{title}</h1>
    <p className="text-secondary-600">Esta página está em desenvolvimento.</p>
  </div>
);

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
      <Route path="/auth/confirm-email" element={<ConfirmEmailPage />} />

      {/* Protected Routes - All Authenticated Users */}
      <Route element={<ProtectedRoute requireAuth />}>
        <Route path="/app/dashboard" element={<DashboardPage />} />
        <Route path="/app/profile" element={<PlaceholderPage title="Meu Perfil" />} />
        <Route path="/app/settings" element={<PlaceholderPage title="Configurações" />} />
        <Route path="/app/presentations" element={<PlaceholderPage title="Apresentações" />} />
        <Route path="/app/presentations/:id" element={<PlaceholderPage title="Detalhes da Apresentação" />} />
      </Route>

      {/* Admin Routes */}
      <Route
        element={
          <ProtectedRoute
            requireAuth
            allowedRoles={[UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.COORDINATOR]}
          />
        }
      >
        <Route path="/app/admin/users" element={<PlaceholderPage title="Gerenciar Usuários" />} />
        <Route path="/app/admin/approvals" element={<PlaceholderPage title="Aprovações Pendentes" />} />
        <Route path="/app/admin/presentations" element={<PlaceholderPage title="Gerenciar Apresentações" />} />
        <Route path="/app/admin/sessions" element={<PlaceholderPage title="Gerenciar Sessões" />} />
        <Route path="/app/admin/schedule" element={<PlaceholderPage title="Cronograma" />} />
        <Route path="/app/admin/rankings" element={<PlaceholderPage title="Rankings e Premiações" />} />
        <Route path="/app/admin/certificates" element={<PlaceholderPage title="Certificados" />} />
        <Route path="/app/admin/events" element={<PlaceholderPage title="Gerenciar Edições" />} />
      </Route>

      {/* Student Routes */}
      <Route
        element={<ProtectedRoute requireAuth allowedRoles={[UserRole.DOCTORAL_STUDENT]} />}
      >
        <Route path="/app/student/my-presentation" element={<PlaceholderPage title="Minha Apresentação" />} />
      </Route>

      {/* Fallback - 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
