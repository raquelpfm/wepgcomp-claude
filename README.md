# README - WEPGCOMP Front-end

## Descrição Geral do Projeto

O **WEPGCOMP** (Workshop de Apresentações de Doutorado - PGCOMP) é um sistema web desenvolvido para gerenciar apresentações de doutorado do Programa de Pós-Graduação em Ciência da Computação (PGCOMP) da Universidade Federal da Bahia (UFBA).

Este sistema oferece uma plataforma completa para:
- **Doutorandos**: Cadastrar e gerenciar suas apresentações, fazer upload de material (PDF), sugerir datas e horários
- **Professores**: Avaliar apresentações, votar e participar do processo de premiação
- **Ouvintes**: Visualizar apresentações, votar e participar do evento
- **Administradores**: Gerenciar usuários, organizar cronograma, controlar sessões, gerar certificados e gerenciar múltiplas edições do evento

## Stack Tecnológica Utilizada

### Core
- **React 18** - Biblioteca para construção de interfaces
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Vite** - Build tool moderno e rápido

### Roteamento e Estado
- **React Router v6** - Navegação e roteamento SPA
- **Context API** - Gerenciamento de estado global (AuthContext e EventContext)

### Estilização
- **Tailwind CSS** - Framework CSS utility-first
- **Lucide React** - Biblioteca de ícones moderna

### Formulários e Validação
- **React Hook Form** - Gerenciamento de formulários performático
- **Zod** - Validação de schemas TypeScript-first
- **@hookform/resolvers** - Integração entre React Hook Form e Zod

### HTTP e APIs
- **Axios** - Cliente HTTP com interceptors para autenticação

### Utilitários
- **date-fns** - Manipulação e formatação de datas
- **clsx** - Utilitário para composição de classes CSS condicionais

## Instruções de Setup e Execução

### Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn instalado
- Git instalado (opcional)

### Instalação

1. Clone o repositório (ou extraia os arquivos):
```bash
git clone <repository-url>
cd wepgcomp-frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente (opcional):

Crie um arquivo `.env` na raiz do projeto:
```env
VITE_API_URL=http://localhost:4000/api
```

Se não configurar, o sistema usará o padrão `http://localhost:4000/api`.

### Execução em Modo de Desenvolvimento

```bash
npm run dev
```

O aplicativo estará disponível em `http://localhost:3000` (abre automaticamente no navegador).

### Build para Produção

```bash
npm run build
```

Os arquivos de produção serão gerados na pasta `dist/`.

### Preview do Build de Produção

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## Estrutura de Pastas (Visão Geral)

```
wepgcomp-frontend/
├── public/                 # Arquivos públicos estáticos
├── src/
│   ├── components/         # Componentes React reutilizáveis
│   │   ├── common/         # Componentes comuns (Button, Input, Modal, etc.)
│   │   └── layout/         # Componentes de layout (Header, Sidebar, AppLayout)
│   ├── pages/              # Páginas/Views da aplicação
│   │   ├── auth/           # Páginas de autenticação (Login, Register, ConfirmEmail)
│   │   ├── HomePage.tsx    # Página inicial pública
│   │   └── DashboardPage.tsx # Dashboard principal
│   ├── contexts/           # Contextos React (AuthContext, EventContext)
│   ├── services/           # Serviços de comunicação com API
│   │   ├── api.ts          # Configuração Axios
│   │   ├── auth.service.ts # Endpoints de autenticação
│   │   ├── user.service.ts # Endpoints de usuários
│   │   ├── presentation.service.ts # Endpoints de apresentações
│   │   ├── event.service.ts # Endpoints de eventos e sessões
│   │   └── certificate.service.ts # Endpoints de certificados
│   ├── types/              # TypeScript interfaces e types
│   │   ├── user.types.ts
│   │   ├── presentation.types.ts
│   │   ├── event.types.ts
│   │   ├── certificate.types.ts
│   │   ├── auth.types.ts
│   │   └── index.ts
│   ├── hooks/              # Custom React hooks
│   │   ├── useAuth.ts      # Hook para usar AuthContext
│   │   └── useEvent.ts     # Hook para usar EventContext
│   ├── utils/              # Funções utilitárias
│   │   ├── validators.ts   # Validações customizadas
│   │   ├── formatters.ts   # Formatação de dados
│   │   └── constants.ts    # Constantes da aplicação
│   ├── routes/             # Configuração de rotas
│   │   ├── AppRoutes.tsx   # Definição de rotas
│   │   └── ProtectedRoute.tsx # Guard de rotas protegidas
│   ├── App.tsx             # Componente raiz
│   ├── main.tsx            # Entry point
│   └── index.css           # Estilos globais com Tailwind
├── package.json            # Dependências e scripts
├── tsconfig.json           # Configuração TypeScript
├── vite.config.ts          # Configuração Vite
├── tailwind.config.js      # Configuração Tailwind CSS
├── postcss.config.js       # Configuração PostCSS
├── .gitignore              # Arquivos ignorados pelo Git
├── README.md               # Este arquivo
└── DEVELOPMENT_LOG.md      # Log de desenvolvimento e auto-avaliação
```

## Funcionalidades Principais

### Sistema de Autenticação
- Cadastro de professores (requer e-mail @ufba.br e aprovação)
- Cadastro de doutorandos (requer e-mail @ufba.br ou @aluno.ufba.br)
- Cadastro de ouvintes (qualquer e-mail válido)
- Login com e-mail e senha
- Confirmação de e-mail via token
- Recuperação de senha

### Gerenciamento de Usuários (Admin)
- Aprovação/rejeição de cadastros de professores
- Concessão de privilégios administrativos
- Atribuição de coordenador de edição
- Remoção de usuários

### Gerenciamento de Apresentações
- Cadastro de apresentação (doutorando)
- Upload de PDF (máx. 10MB)
- Edição de informações (admin e doutorando)
- Visualização pública de detalhes
- Sistema de votação (professores e ouvintes)

### Gerenciamento de Eventos
- Criação de múltiplas edições do evento
- Edição de parâmetros do evento
- Gerenciamento de sessões
- Organização de cronograma
- Validação de conflitos de horário/sala

### Sistema de Premiação e Certificados
- Ranking de apresentações por nota
- Seleção de melhores avaliadores
- Geração de certificados em PDF
- Envio de certificados por e-mail

### Interfaces Específicas por Perfil
- **Dashboard personalizado** para cada tipo de usuário
- **Navegação role-based** com menu adaptativo
- **Guards de rota** para controle de acesso
- **Página inicial pública** com informações do evento

## Observações Importantes

### Backend API
Este é um projeto **front-end apenas**. Ele assume a existência de uma API RESTful back-end que fornece os endpoints necessários. Todos os serviços em `src/services/` fazem chamadas HTTP que devem ser implementadas no back-end.

A URL base da API pode ser configurada via variável de ambiente `VITE_API_URL` (padrão: `http://localhost:4000/api`).

### Desenvolvimento
Este projeto foi desenvolvido com foco em:
- **Código limpo e modular**
- **Tipagem forte com TypeScript**
- **Componentização reutilizável**
- **Validações robustas client-side**
- **Design responsivo mobile-first**
- **Acessibilidade básica**

### Próximos Passos
Para um projeto de produção, considere:
- Implementar todas as páginas administrativas (atualmente são placeholders)
- Adicionar testes (Jest, React Testing Library)
- Implementar i18n (internacionalização)
- Adicionar mais validações e tratamento de erros
- Implementar PWA features
- Otimizar performance com lazy loading
- Adicionar analytics e monitoramento

## Contato e Suporte

Para dúvidas ou suporte relacionado ao sistema:
- **E-mail**: pgcomp@ufba.br
- **Instituição**: Programa de Pós-Graduação em Ciência da Computação - UFBA

---

**Desenvolvido para o PGCOMP - UFBA**

*Sistema de Gerenciamento de Apresentações de Doutorado*
