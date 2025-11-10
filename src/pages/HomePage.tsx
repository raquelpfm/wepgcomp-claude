/**
 * Home Page
 * Public home page with event information and schedule
 * FUNC33, FUNC34
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardHeader, CardTitle, CardContent } from '@/components/common';
import { APP_NAME, APP_FULL_NAME, PGCOMP_NAME, UFBA_NAME, PGCOMP_EMAIL } from '@/utils/constants';
import {
  Calendar,
  MapPin,
  Mail,
  Users,
  Award,
  Clock,
  ArrowRight,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100">
      {/* Hero Section */}
      <header className="bg-primary-600 text-white py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">{APP_NAME}</h1>
            <p className="text-xl mb-8">{APP_FULL_NAME}</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/auth/register">
                <Button size="lg" variant="secondary">
                  Inscrever-se
                </Button>
              </Link>
              <Link to="/auth/login">
                <Button size="lg" variant="ghost" className="text-white border-white hover:bg-primary-700">
                  Fazer Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        {/* About Section */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Sobre o Evento</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-secondary-700 leading-relaxed">
                O {APP_NAME} é um evento anual organizado pelo {PGCOMP_NAME} da {UFBA_NAME}.
                O evento reúne doutorandos para apresentarem seus trabalhos de pesquisa,
                promovendo a troca de conhecimento e experiências entre alunos, professores e a comunidade acadêmica.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Info Grid */}
        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Date and Time */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Calendar className="text-primary-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-secondary-900 mb-1">Data e Horário</h3>
                  <p className="text-sm text-secondary-600">
                    Consulte a programação completa após fazer login
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-green-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-secondary-900 mb-1">Local</h3>
                  <p className="text-sm text-secondary-600">
                    Instituto de Matemática e Estatística - UFBA<br />
                    Campus Ondina, Salvador - BA
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="text-purple-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-secondary-900 mb-1">Contato</h3>
                  <p className="text-sm text-secondary-600">
                    E-mail: {PGCOMP_EMAIL}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Features */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-secondary-900 mb-6 text-center">
            Funcionalidades do Sistema
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="text-primary-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary-900 mb-2">Para Doutorandos</h3>
                    <ul className="text-sm text-secondary-600 space-y-1">
                      <li>• Cadastro de apresentação</li>
                      <li>• Upload de material (PDF)</li>
                      <li>• Sugestão de data e horário</li>
                      <li>• Visualização de notas</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Award className="text-green-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary-900 mb-2">Para Avaliadores</h3>
                    <ul className="text-sm text-secondary-600 space-y-1">
                      <li>• Visualização de apresentações</li>
                      <li>• Sistema de votação</li>
                      <li>• Acesso ao material</li>
                      <li>• Certificado de participação</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="text-purple-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary-900 mb-2">Para Administradores</h3>
                    <ul className="text-sm text-secondary-600 space-y-1">
                      <li>• Gerenciamento de usuários</li>
                      <li>• Organização do cronograma</li>
                      <li>• Controle de sessões</li>
                      <li>• Geração de certificados</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Calendar className="text-yellow-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary-900 mb-2">Funcionalidades Gerais</h3>
                    <ul className="text-sm text-secondary-600 space-y-1">
                      <li>• Programação completa do evento</li>
                      <li>• Sistema de premiação</li>
                      <li>• Suporte a múltiplas edições</li>
                      <li>• Interface intuitiva</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section>
          <Card className="bg-primary-600 text-white border-none">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Pronto para Participar?</h2>
              <p className="text-xl mb-6 opacity-90">
                Cadastre-se agora e faça parte do {APP_NAME}
              </p>
              <Link to="/auth/register">
                <Button size="lg" variant="secondary">
                  Criar Conta
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-secondary-900 text-secondary-300 py-8 mt-12">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <p className="mb-2">&copy; 2024 {PGCOMP_NAME} - {UFBA_NAME}</p>
          <p className="text-sm">Sistema desenvolvido para gerenciamento de apresentações de doutorado</p>
        </div>
      </footer>
    </div>
  );
};
