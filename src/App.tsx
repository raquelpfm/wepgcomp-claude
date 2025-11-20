/**
 * Componente principal da aplicação
 */

import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary-700 mb-2">WEPGCOMP</h1>
            <p className="text-gray-600">
              Sistema de Gerenciamento de Apresentações de Doutorado - PGCOMP/UFBA
            </p>
          </header>

          <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Projeto em Desenvolvimento</h2>
            <p className="text-gray-700 mb-4">
              Este é o front-end do sistema WEPGCOMP, desenvolvido com React + TypeScript + Tailwind CSS.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
              <h3 className="font-semibold text-blue-900 mb-2">Estrutura Implementada:</h3>
              <ul className="list-disc list-inside text-blue-800 space-y-1 text-sm">
                <li>Sistema completo de tipos TypeScript</li>
                <li>Serviços mock com persistência em localStorage</li>
                <li>Dados mockados (usuários, eventos, apresentações)</li>
                <li>Autenticação e gerenciamento de usuários</li>
                <li>Configuração Vite + React + Tailwind CSS</li>
              </ul>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
              <h3 className="font-semibold text-green-900 mb-2">Para Desenvolver:</h3>
              <ul className="list-disc list-inside text-green-800 space-y-1 text-sm">
                <li>Contextos React (AuthContext, EventContext)</li>
                <li>Componentes UI (Button, Input, Card, Modal)</li>
                <li>Páginas (Login, Register, Dashboard, Admin)</li>
                <li>Rotas e proteção de rotas</li>
                <li>Implementação completa de todas as funcionalidades</li>
              </ul>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded">
              <h3 className="font-semibold text-gray-900 mb-2">Como Executar:</h3>
              <pre className="bg-gray-800 text-green-400 p-3 rounded text-sm overflow-x-auto">
                npm install
                {'\n'}npm run dev
              </pre>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Consulte o <strong>README.md</strong> para documentação completa
              </p>
              <p className="text-sm text-gray-500">
                Consulte o <strong>DEVELOPMENT_LOG.md</strong> para detalhes técnicos
              </p>
            </div>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
