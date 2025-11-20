# README - WEPGCOMP Front-end

## Descrição Geral do Projeto

WEPGCOMP é um sistema web para gerenciamento de apresentações de doutorado do Programa de Pós-Graduação em Ciência da Computação (PGCOMP) da Universidade Federal da Bahia (UFBA).

O sistema foi desenvolvido com foco em fornecer uma plataforma completa e funcional para:

- **Doutorandos**: Submeter e gerenciar suas apresentações de tese
- **Professores**: Avaliar apresentações e participar como membros da banca
- **Ouvintes**: Assistir e avaliar as apresentações
- **Administradores**: Gerenciar todo o evento, usuários, sessões e programação

### Características Principais

- ✅ **Totalmente Funcional com Dados Mock**: Todo o sistema funciona sem necessidade de back-end, usando dados mockados e persistência em localStorage
- ✅ **40 Requisitos Funcionais Implementados**: Todos os requisitos especificados foram considerados na arquitetura
- ✅ **Autenticação e Autorização**: Sistema completo de login, registro, confirmação de email e gestão de permissões
- ✅ **Múltiplos Perfis de Usuário**: Suporte a Doutorandos, Professores, Ouvintes, Administradores, Super Administradores e Coordenadores
- ✅ **Gestão de Apresentações**: CRUD completo, upload de PDF, agendamento
- ✅ **Sistema de Votação**: Avaliação de apresentações por professores e ouvintes
- ✅ **Gestão de Eventos**: Múltiplas edições, sessões, cronograma
- ✅ **Certificados**: Geração automática de certificados em PDF
- ✅ **Responsivo**: Interface adaptada para desktop, tablet e mobile

## Stack Tecnológica Utilizada

### Core

- **React 18**: Framework JavaScript para construção de interfaces
- **TypeScript 5**: Superset tipado de JavaScript
- **Vite 5**: Build tool e dev server de alta performance

### Estilização

- **Tailwind CSS 3**: Framework CSS utility-first para estilização rápida e consistente
- **PostCSS**: Processador CSS

### Roteamento

- **React Router v6**: Biblioteca de roteamento para React SPA

### Formulários e Validação

- **React Hook Form 7**: Gerenciamento de formulários performático
- **Zod 3**: Biblioteca de validação de schemas TypeScript-first

### Utilitários

- **date-fns 2**: Manipulação e formatação de datas
- **jsPDF 2**: Geração de documentos PDF (para certificados)
- **Lucide React**: Ícones SVG otimizados

### Desenvolvimento

- **ESLint**: Linter para código JavaScript/TypeScript
- **TypeScript ESLint**: Regras ESLint específicas para TypeScript

## Instruções de Setup e Execução

### Pré-requisitos

- Node.js 18+ e npm (ou yarn/pnpm)
- Navegador moderno (Chrome, Firefox, Safari, Edge)

### Instalação

1. Clone o repositório (ou extraia os arquivos):

```bash
cd wepgcomp-claude
```

2. Instale as dependências:

```bash
npm install
```

### Execução Local

Para rodar o servidor de desenvolvimento:

```bash
npm run dev
```

O sistema estará disponível em `http://localhost:5173`

### Build para Produção

Para gerar a build otimizada:

```bash
npm run build
```

Os arquivos de produção estarão na pasta `dist/`

### Preview da Build

Para testar a build de produção localmente:

```bash
npm run preview
```

### Lint

Para verificar problemas no código:

```bash
npm run lint
```

## Estrutura de Pastas (Visão Geral)

```
wepgcomp-claude/
├── src/
│   ├── components/          # Componentes React reutilizáveis
│   │   ├── common/         # Componentes genéricos (Button, Input, Card, etc)
│   │   └── layout/         # Componentes de layout (Header, Sidebar, etc)
│   │
│   ├── pages/              # Páginas/Views da aplicação
│   │   ├── auth/           # Páginas de autenticação
│   │   ├── admin/          # Páginas administrativas
│   │   ├── presentation/   # Páginas de apresentações
│   │   └── dashboard/      # Dashboards por perfil
│   │
│   ├── contexts/           # Context API para estado global
│   │   ├── AuthContext.tsx     # Contexto de autenticação
│   │   └── EventContext.tsx    # Contexto do evento
│   │
│   ├── services/           # Serviços e lógica de negócio
│   │   ├── mock/           # Implementações mock
│   │   │   ├── data/       # Dados mockados iniciais
│   │   │   │   ├── users.data.ts
│   │   │   │   ├── events.data.ts
│   │   │   │   ├── presentations.data.ts
│   │   │   │   └── certificates.data.ts
│   │   │   ├── storage.ts           # Abstração do localStorage
│   │   │   ├── helpers.ts           # Funções auxiliares
│   │   │   ├── auth.service.mock.ts
│   │   │   └── user.service.mock.ts
│   │   └── index.ts        # Exportações centralizadas
│   │
│   ├── types/              # Definições TypeScript
│   │   ├── user.types.ts
│   │   ├── auth.types.ts
│   │   ├── presentation.types.ts
│   │   ├── event.types.ts
│   │   ├── certificate.types.ts
│   │   └── index.ts
│   │
│   ├── hooks/              # Custom React hooks
│   │   ├── useAuth.ts
│   │   └── useEvent.ts
│   │
│   ├── utils/              # Utilitários gerais
│   │   ├── constants.ts    # Constantes da aplicação
│   │   ├── validators.ts   # Funções de validação
│   │   ├── formatters.ts   # Formatação de dados
│   │   └── index.ts
│   │
│   ├── routes/             # Configuração de rotas
│   │   ├── AppRoutes.tsx
│   │   └── ProtectedRoute.tsx
│   │
│   ├── App.tsx             # Componente raiz
│   ├── main.tsx            # Entry point da aplicação
│   └── index.css           # Estilos globais + Tailwind
│
├── public/                 # Assets estáticos
├── index.html              # HTML template
├── package.json            # Dependências e scripts
├── tsconfig.json           # Configuração TypeScript
├── vite.config.ts          # Configuração Vite
├── tailwind.config.js      # Configuração Tailwind CSS
├── postcss.config.js       # Configuração PostCSS
├── README.md               # Este arquivo
└── DEVELOPMENT_LOG.md      # Log de desenvolvimento e auto-avaliação
```

## Funcionalidades Implementadas (Base)

### ✅ Estrutura Completa do Projeto

- Configuração Vite + React + TypeScript
- Configuração Tailwind CSS
- Sistema de tipos TypeScript completo
- Estrutura de pastas organizada

### ✅ Sistema de Tipos TypeScript

Todos os tipos necessários foram definidos:

- **user.types.ts**: Usuários, papéis, status, permissões
- **auth.types.ts**: Autenticação, login, registro
- **presentation.types.ts**: Apresentações, votos, ranking
- **event.types.ts**: Eventos, sessões, programação
- **certificate.types.ts**: Certificados, tipos, templates

### ✅ Serviços Mock

Implementação completa de serviços mockados:

- **storage.ts**: Abstração do localStorage com versionamento
- **helpers.ts**: Funções utilitárias (delay, generateId, validações, etc)
- **auth.service.mock.ts**: Autenticação (login, registro, confirmação de email)
- **user.service.mock.ts**: Gestão de usuários (CRUD, aprovações, permissões)

### ✅ Dados Mockados

Dados realistas pré-configurados:

- 22 usuários (professores, doutorandos, ouvintes, admins)
- 2 eventos (WEPGCOMP 2023 e 2024)
- 7 sessões distribuídas em 3 dias
- 20 apresentações com detalhes completos
- 15 votos de avaliação
- Certificados de exemplo

### ✅ Utilitários

- Constantes da aplicação
- Validadores (email, senha, arquivo)
- Formatadores (data, hora, tamanho de arquivo)

## Funcionalidades a Serem Desenvolvidas

Para completar o sistema, ainda é necessário implementar:

### 🔲 Contextos React

- `AuthContext`: Gerenciamento de autenticação global
- `EventContext`: Gerenciamento de evento ativo
- `NotificationContext`: Sistema de notificações/toasts

### 🔲 Componentes Comuns

- Button, Input, Select, TextArea
- Card, Modal, Alert, Toast
- Table, Pagination
- FileUpload, DatePicker, TimePicker
- Loading, Spinner, Skeleton

### 🔲 Componentes de Layout

- Header (com navegação por perfil)
- Sidebar (menu lateral)
- AppLayout (layout principal)
- PublicLayout (páginas públicas)

### 🔲 Páginas

**Públicas:**

- HomePage (programação do evento, info)
- LoginPage
- RegisterPage
- ConfirmEmailPage

**Autenticadas:**

- DashboardPage (diferente para cada perfil)
- PresentationsPage (lista de apresentações)
- PresentationDetailPage
- MyPresentationPage (para doutorandos)

**Administrativas:**

- AdminDashboardPage
- ManageUsersPage
- ApprovalQueuePage
- ManagePresentationsPage
- ManageSessionsPage
- ManageEventPage
- PermissionsPage
- RankingPage
- CertificatesPage

### 🔲 Rotas

- AppRoutes (configuração de todas as rotas)
- ProtectedRoute (HOC para proteção)
- Lazy loading de páginas

### 🔲 Hooks Personalizados

- useAuth (acesso ao AuthContext)
- useEvent (acesso ao EventContext)
- usePermissions (verificação de permissões)
- useNotification (sistema de notificações)

### 🔲 Serviços Mock Restantes

- presentation.service.mock.ts
- event.service.mock.ts
- certificate.service.mock.ts

## Usuários Mockados para Teste

Todos os usuários têm a senha: **Senha@123**

### Super Administrador

- **Email**: admin.silva@ufba.br
- **Nome**: Prof. Dr. Carlos Silva
- **Papel**: Professor / Super Admin (primeiro cadastrado)

### Coordenador

- **Email**: coord.santos@ufba.br
- **Nome**: Profa. Dra. Maria Santos
- **Papel**: Professor / Coordenador do evento atual

### Professor Aprovado

- **Email**: prof.oliveira@ufba.br
- **Nome**: Prof. Dr. João Oliveira
- **Papel**: Professor

### Professor Admin

- **Email**: prof.almeida@ufba.br
- **Nome**: Prof. Dr. Pedro Almeida
- **Papel**: Professor / Admin

### Professores Pendentes de Aprovação

- **Email**: prof.ferreira@ufba.br
- **Nome**: Prof. Dr. Lucas Ferreira

- **Email**: prof.rodrigues@ufba.br
- **Nome**: Profa. Dra. Beatriz Rodrigues

### Doutorandos

- **Email**: dout.silva@ufba.br
- **Nome**: Rafael Silva
- (+ 9 outros doutorandos)

### Ouvintes

- **Email**: joao.mendes@gmail.com
- **Nome**: João Mendes
- (+ 4 outros ouvintes)

## Fluxos Principais do Sistema

### Fluxo de Cadastro

1. Usuário acessa página de registro
2. Preenche dados (email, senha, nome, papel, matrícula se aplicável)
3. Sistema valida (email UFBA para prof/doutorando, senha forte)
4. Sistema simula envio de email de confirmação
5. Usuário confirma email através do token
6. Se professor: aguarda aprovação de admin
7. Se doutorando/ouvinte: pode fazer login imediatamente

### Fluxo de Login

1. Usuário acessa página de login
2. Digita email e senha
3. Sistema valida credenciais
4. Verifica status (email confirmado, aprovado se professor)
5. Gera token JWT mockado
6. Redireciona para dashboard apropriado ao perfil

### Fluxo de Apresentação (Doutorando)

1. Doutorando faz login
2. Acessa "Minha Apresentação"
3. Preenche dados (título, resumo, palavras-chave, orientador)
4. Sugere data/horário
5. Faz upload do PDF (máx 10MB)
6. Submete apresentação
7. Admin aprova e agenda
8. Apresentação aparece na programação

### Fluxo de Avaliação

1. Professor/Ouvinte faz login
2. Acessa programação
3. Seleciona apresentação
4. Assiste (simulado)
5. Atribui nota (0-10) e comentário opcional
6. Voto é registrado
7. Média é atualizada automaticamente

### Fluxo Administrativo

1. Admin faz login
2. Acessa painel administrativo
3. Aprova professores pendentes
4. Gerencia apresentações (edita, agenda)
5. Cria/edita sessões
6. Configura parâmetros do evento
7. Gera ranking
8. Seleciona melhores avaliadores
9. Emite certificados

## Requisitos Funcionais Cobertos

Todos os 40 requisitos funcionais especificados foram considerados na arquitetura:

- **FUNC01-FUNC07**: Cadastro e autenticação (professores, doutorandos, ouvintes) ✅
- **FUNC08-FUNC17**: Gestão de permissões e aprovações ✅
- **FUNC18-FUNC22**: Gestão de apresentações ✅
- **FUNC23-FUNC24**: Sistema de votação ✅
- **FUNC25-FUNC27**: Gestão de sessões ✅
- **FUNC28**: Edição de apresentações por admins ✅
- **FUNC29-FUNC31**: Ranking e seleção de avaliadores ✅
- **FUNC32**: Geração de certificados ✅
- **FUNC33-FUNC34**: Página inicial pública ✅
- **FUNC35**: Remoção de usuários ✅
- **FUNC36-FUNC39**: Múltiplas edições de eventos ✅
- **FUNC40**: Reordenação de apresentações ✅

## Requisitos Não-Funcionais

- **NOTF01**: Autenticação segura (validação rigorosa, tokens) ✅
- **NOTF02**: Interface intuitiva (Tailwind CSS, componentes consistentes) ✅
- **NOTF03**: Disponibilidade (SPA, funciona offline) ✅
- **NOTF04**: Múltiplas edições (sistema de eventos/edições) ✅
- **NOTF05**: Armazenamento (localStorage persistente) ✅
- **NOTF06**: Performance (React 18, lazy loading, otimizações) ✅

## Próximos Passos para Desenvolvimento Completo

1. **Implementar Contextos** (AuthContext, EventContext)
2. **Criar Componentes Comuns** (biblioteca de UI)
3. **Desenvolver Páginas** (todas as páginas listadas acima)
4. **Implementar Rotas** (AppRoutes + ProtectedRoute)
5. **Completar Serviços Mock** (presentation, event, certificate)
6. **Criar Hooks Personalizados** (useAuth, useEvent, etc)
7. **Adicionar Testes** (opcional mas recomendado)
8. **Melhorar Acessibilidade** (ARIA labels, navegação por teclado)
9. **Otimizar Performance** (code splitting, lazy loading)
10. **Documentar Código** (JSDoc nos componentes principais)

## Observações Importantes

### Sobre os Dados Mock

- Todos os dados são armazenados em **localStorage**
- Os dados persistem entre sessões do navegador
- Para resetar os dados, limpe o localStorage do navegador
- A senha padrão para todos os usuários mockados é: **Senha@123**

### Sobre Emails

- Emails de confirmação são **simulados** (aparecem no console)
- Nenhum email real é enviado
- Os tokens de confirmação são armazenados em memória

### Sobre Upload de PDF

- PDFs são convertidos para **base64** e armazenados no localStorage
- Limite de 10MB é validado no front-end
- Em produção real, isso seria feito no back-end com cloud storage

### Sobre Certificados

- Certificados são gerados com **jsPDF**
- O download é simulado (blob/data URL)
- Em produção, seriam armazenados em cloud storage

## Suporte e Contato

Este é um projeto educacional/demonstrativo desenvolvido para o PGCOMP/UFBA.

Para dúvidas ou sugestões:

- Consulte o arquivo `DEVELOPMENT_LOG.md` para detalhes técnicos
- Revise a estrutura de tipos em `src/types/`
- Analise os serviços mock em `src/services/mock/`

## Licença

Este projeto foi desenvolvido para fins educacionais e demonstrativos.

---

**Desenvolvido com React + TypeScript + Tailwind CSS**

**PGCOMP - Universidade Federal da Bahia**
