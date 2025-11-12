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

3. Configure as variáveis de ambiente:

O projeto já vem com arquivo `.env` pré-configurado para **modo de demonstração com dados mockados**:

```env
# API Configuration
VITE_API_URL=http://localhost:4000/api

# Mock Mode - ENABLED for testing without backend
VITE_USE_MOCK_DATA=true

# Mock Data Persistence
VITE_MOCK_PERSISTENCE=false

# Mock Network Delay (milliseconds)
VITE_MOCK_DELAY=300
```

**Para usar dados mockados (padrão - não requer backend):**
```env
VITE_USE_MOCK_DATA=true
```

**Para conectar a API real:**
```env
VITE_USE_MOCK_DATA=false
VITE_API_URL=http://localhost:4000/api
```

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

---

## Demonstração com Dados Mockados

O sistema possui uma **camada completa de dados mockados** que permite testar todas as funcionalidades sem necessidade de backend rodando.

### Quick Start - Demonstração

1. **Instale e inicie:**
```bash
npm install
npm run dev
```

2. **Acesse:** `http://localhost:5173`

3. **Faça login com um dos perfis de teste:**

| Perfil | Email | Senha |
|--------|-------|-------|
| Super Admin | admin@ufba.br | Admin@123 |
| Coordenador | coordenador@ufba.br | Coord@123 |
| Professor | professor1@ufba.br | Prof@123 |
| Doutorando | doutorando1@ufba.br | Dout@123 |
| Ouvinte | ouvinte1@gmail.com | Ouvinte@123 |

### Dados Disponíveis para Teste

- **18 usuários** de teste com diferentes perfis e status
- **V WEPGCOMP 2025** (edição ativa) + 1 edição anterior completa
- **10 apresentações** cadastradas (8 agendadas, 2 pendentes)
- **4 sessões** distribuídas em 2 dias
- **3 salas** disponíveis
- **12 votos** já registrados em algumas apresentações
- **Rankings** calculados automaticamente
- **Certificados** da edição anterior

### Cenários de Teste Implementados

✅ Login bloqueado para usuário pendente de aprovação
✅ Aprovação de professor e login subsequente
✅ Votação múltipla na mesma apresentação
✅ Conflito de horário ao criar sessão
✅ Sessão sem sala (bloqueia todas)
✅ Reordenação de apresentações
✅ Cálculo correto de ranking
✅ Validação de upload de PDF

### Documentação de Testes

Para instruções detalhadas de como testar cada funcionalidade, consulte:

📖 **[TESTING_GUIDE.md](./TESTING_GUIDE.md)** - Guia completo com todos os cenários de teste

### Alternando entre Mock e API Real

**Modo Mock (padrão):**
```env
VITE_USE_MOCK_DATA=true
```
- ✅ Não requer backend
- ✅ Dados completos para demonstração
- ✅ Simula latência de rede realista
- ✅ Logs informativos no console

**Modo API Real:**
```env
VITE_USE_MOCK_DATA=false
VITE_API_URL=http://localhost:4000/api
```
- Conecta ao backend real
- Requer API rodando em `localhost:4000`

---

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
│   │   ├── certificate.service.ts # Endpoints de certificados
│   │   ├── index.ts        # Exportação centralizada (auto-switch mock/real)
│   │   └── mock/           # 🎭 Serviços e dados mockados para demonstração
│   │       ├── data/       # Dados mockados (usuários, eventos, apresentações, etc.)
│   │       ├── *.service.mock.ts # Serviços mockados
│   │       ├── storage.ts  # Gerenciador de storage in-memory
│   │       ├── helpers.ts  # Funções auxiliares para mocks
│   │       └── index.ts    # Exportação dos mocks
│   ├── config/             # Configurações da aplicação
│   │   └── services.config.ts # Toggle automático mock/real baseado em .env
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
├── .env                    # Variáveis de ambiente (modo mock ativado)
├── .env.example            # Exemplo de configuração de ambiente
├── .gitignore              # Arquivos ignorados pelo Git
├── README.md               # Este arquivo
├── TESTING_GUIDE.md        # 📖 Guia completo de testes com dados mockados
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

### Backend API e Dados Mockados

Este é um projeto **front-end** que pode operar em **dois modos**:

#### Modo Mock (Padrão - Demonstração)
- ✅ **Não requer backend** rodando
- ✅ Dados completos para demonstração e testes
- ✅ Simulação realista de API com latência configurável
- ✅ Ideal para desenvolvimento front-end e apresentações
- 📝 Configurado via `VITE_USE_MOCK_DATA=true`

#### Modo API Real (Produção)
- 🌐 Conecta a uma API RESTful back-end
- 🔌 Requer backend rodando (padrão: `http://localhost:4000/api`)
- 📝 Configurado via `VITE_USE_MOCK_DATA=false`
- 🔧 URL da API configurável via `VITE_API_URL`

**A transição entre modos é transparente** - os componentes não precisam saber qual modo está ativo.

### Desenvolvimento
Este projeto foi desenvolvido com foco em:
- **Código limpo e modular**
- **Tipagem forte com TypeScript**
- **Componentização reutilizável**
- **Validações robustas client-side**
- **Design responsivo mobile-first**
- **Acessibilidade básica**

### Arquivos de Documentação

- **README.md** - Visão geral, setup e execução (este arquivo)
- **[TESTING_GUIDE.md](./TESTING_GUIDE.md)** - Guia completo de testes com dados mockados
- **DEVELOPMENT_LOG.md** - Log de desenvolvimento e auto-avaliação técnica

### Próximos Passos
Para um projeto de produção, considere:
- ✅ **Dados mockados completos** (já implementado)
- Implementar todas as páginas administrativas (atualmente são placeholders)
- Adicionar testes automatizados (Jest, React Testing Library)
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
