/**
 * Sidebar Component
 * Navigation sidebar with role-based menu items
 */

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Presentation,
  Calendar,
  Clock,
  Award,
  FileText,
  Settings,
  List,
  Home,
} from 'lucide-react';
import clsx from 'clsx';
import { useAuth } from '@/hooks';
import { UserRole } from '@/types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user, hasRole } = useAuth();
  const location = useLocation();

  if (!user) return null;

  // Navigation items based on user role
  const getNavigationItems = () => {
    const isAdmin = hasRole([UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.COORDINATOR]);
    const isStudent = hasRole(UserRole.DOCTORAL_STUDENT);
    const isProfessor = hasRole(UserRole.PROFESSOR);
    const isListener = hasRole(UserRole.LISTENER);

    const items = [
      {
        label: 'Dashboard',
        path: '/app/dashboard',
        icon: LayoutDashboard,
        roles: [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.COORDINATOR, UserRole.PROFESSOR, UserRole.DOCTORAL_STUDENT, UserRole.LISTENER],
      },
    ];

    if (isAdmin) {
      items.push(
        { label: 'Usuários', path: '/app/admin/users', icon: Users, roles: [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.COORDINATOR] },
        { label: 'Aprovações', path: '/app/admin/approvals', icon: UserCheck, roles: [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.COORDINATOR] },
        { label: 'Apresentações', path: '/app/admin/presentations', icon: Presentation, roles: [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.COORDINATOR] },
        { label: 'Sessões', path: '/app/admin/sessions', icon: Calendar, roles: [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.COORDINATOR] },
        { label: 'Cronograma', path: '/app/admin/schedule', icon: Clock, roles: [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.COORDINATOR] },
        { label: 'Premiações', path: '/app/admin/rankings', icon: Award, roles: [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.COORDINATOR] },
        { label: 'Certificados', path: '/app/admin/certificates', icon: FileText, roles: [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.COORDINATOR] },
        { label: 'Edições', path: '/app/admin/events', icon: Settings, roles: [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.COORDINATOR] }
      );
    }

    if (isStudent) {
      items.push(
        { label: 'Minha Apresentação', path: '/app/student/my-presentation', icon: Presentation, roles: [UserRole.DOCTORAL_STUDENT] }
      );
    }

    if (isProfessor || isListener || isStudent) {
      items.push(
        { label: 'Apresentações', path: '/app/presentations', icon: List, roles: [UserRole.PROFESSOR, UserRole.LISTENER, UserRole.DOCTORAL_STUDENT] }
      );
    }

    items.push(
      { label: 'Página Inicial', path: '/', icon: Home, roles: [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.COORDINATOR, UserRole.PROFESSOR, UserRole.DOCTORAL_STUDENT, UserRole.LISTENER] }
    );

    return items.filter(item => item.roles.includes(user.role));
  };

  const navigationItems = getNavigationItems();

  const isActivePath = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          'fixed top-[57px] left-0 bottom-0 w-64 bg-white border-r border-secondary-200 transition-transform duration-300 z-40',
          'lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <nav className="p-4 space-y-1 overflow-y-auto h-full">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = isActivePath(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => onClose()}
                className={clsx(
                  'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
                  isActive
                    ? 'bg-primary-50 text-primary-700 font-medium'
                    : 'text-secondary-600 hover:bg-secondary-100 hover:text-secondary-900'
                )}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};
