/**
 * Dashboard Page
 * Main dashboard for authenticated users (role-based content)
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth, useEvent } from '@/hooks';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/common';
import { UserRole } from '@/types';
import { formatUserRole, formatDate } from '@/utils/formatters';
import {
  Users,
  Presentation,
  Calendar,
  Award,
  BookOpen,
  List,
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { user, hasRole } = useAuth();
  const { activeEvent } = useEvent();

  if (!user) return null;

  const isAdmin = hasRole([UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.COORDINATOR]);
  const isStudent = hasRole(UserRole.DOCTORAL_STUDENT);
  const isProfessor = hasRole(UserRole.PROFESSOR);
  const isListener = hasRole(UserRole.LISTENER);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-secondary-900">
          Olá, {user.name.split(' ')[0]}! 👋
        </h1>
        <p className="text-secondary-600 mt-1">
          {formatUserRole(user.role)} • {activeEvent ? activeEvent.name : 'Nenhum evento ativo'}
        </p>
      </div>

      {/* Active Event Info */}
      {activeEvent && (
        <Card>
          <CardHeader>
            <CardTitle>Evento Ativo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <p className="text-sm text-secondary-600">Nome do Evento</p>
                <p className="font-semibold">{activeEvent.name}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-sm text-secondary-600">Prazo de Submissão</p>
                  <p className="font-medium">{formatDate(activeEvent.submissionDeadline)}</p>
                </div>
                <div>
                  <p className="text-sm text-secondary-600">Data do Evento</p>
                  <p className="font-medium">
                    {formatDate(activeEvent.eventStartDate)} - {formatDate(activeEvent.eventEndDate)}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions - Admin */}
      {isAdmin && (
        <div>
          <h2 className="text-xl font-semibold text-secondary-900 mb-4">Acesso Rápido</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/app/admin/users">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="text-primary-600" size={24} />
                  </div>
                  <h3 className="font-semibold text-secondary-900">Usuários</h3>
                  <p className="text-sm text-secondary-600 mt-1">Gerenciar usuários</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/app/admin/presentations">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Presentation className="text-green-600" size={24} />
                  </div>
                  <h3 className="font-semibold text-secondary-900">Apresentações</h3>
                  <p className="text-sm text-secondary-600 mt-1">Gerenciar apresentações</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/app/admin/sessions">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Calendar className="text-purple-600" size={24} />
                  </div>
                  <h3 className="font-semibold text-secondary-900">Sessões</h3>
                  <p className="text-sm text-secondary-600 mt-1">Gerenciar sessões</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/app/admin/rankings">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Award className="text-yellow-600" size={24} />
                  </div>
                  <h3 className="font-semibold text-secondary-900">Premiações</h3>
                  <p className="text-sm text-secondary-600 mt-1">Ver rankings</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      )}

      {/* Quick Actions - Student */}
      {isStudent && (
        <div>
          <h2 className="text-xl font-semibold text-secondary-900 mb-4">Acesso Rápido</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link to="/app/student/my-presentation">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <BookOpen className="text-primary-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary-900">Minha Apresentação</h3>
                      <p className="text-sm text-secondary-600">Cadastrar ou editar</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/app/presentations">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <List className="text-green-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary-900">Ver Apresentações</h3>
                      <p className="text-sm text-secondary-600">Explorar programação</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      )}

      {/* Quick Actions - Professor/Listener */}
      {(isProfessor || isListener) && !isAdmin && (
        <div>
          <h2 className="text-xl font-semibold text-secondary-900 mb-4">Acesso Rápido</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link to="/app/presentations">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <List className="text-primary-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary-900">Ver Apresentações</h3>
                      <p className="text-sm text-secondary-600">Explorar e avaliar</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Calendar className="text-green-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary-900">Programação</h3>
                      <p className="text-sm text-secondary-600">Ver cronograma</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
