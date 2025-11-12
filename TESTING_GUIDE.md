# WEPGCOMP - Guia Rápido de Testes

## Visão Geral

Este guia fornece instruções para testar todas as funcionalidades do sistema WEPGCOMP usando **dados mockados completos**. Não é necessário ter o backend rodando.

## Índice

1. [Configuração Inicial](#configuração-inicial)
2. [Usuários de Teste](#usuários-de-teste)
3. [Cenários de Teste por Perfil](#cenários-de-teste-por-perfil)
4. [Casos de Teste Especiais](#casos-de-teste-especiais)
5. [Dados do Evento](#dados-do-evento)
6. [Troubleshooting](#troubleshooting)

---

## Configuração Inicial

### 1. Ativar Modo Mock

O modo mock já está ativado por padrão no arquivo `.env`:

```bash
VITE_USE_MOCK_DATA=true
```

### 2. Iniciar o Servidor de Desenvolvimento

```bash
npm install
npm run dev
```

### 3. Acessar a Aplicação

Abra o navegador em `http://localhost:5173`

### 4. Verificar Modo Mock

Ao abrir o console do navegador (F12), você verá:

```
🔧 Services Mode: 🎭 MOCK DATA
📝 Mock data is active. No backend required.
💡 To use real API, set VITE_USE_MOCK_DATA=false in .env
```

---

## Usuários de Teste

### Credenciais de Acesso

| Perfil | Email | Senha | Status | Descrição |
|--------|-------|-------|--------|-----------|
| **Super Admin** | admin@ufba.br | Admin@123 | Ativo | Primeiro professor, acesso total ao sistema |
| **Coordenador** | coordenador@ufba.br | Coord@123 | Ativo | Coordenador da edição ativa (V WEPGCOMP 2025) |
| **Professor 1** | professor1@ufba.br | Prof@123 | Ativo | Professor aprovado, pode avaliar apresentações |
| **Professor 2** | professor2@ufba.br | Prof@123 | Ativo | Professor aprovado, pode avaliar apresentações |
| **Professor Pendente** | pendente@ufba.br | Prof@123 | **Pendente Aprovação** | Aguardando aprovação (login bloqueado) |
| **Doutorando 1** | doutorando1@ufba.br | Dout@123 | Ativo | Matrícula: 2021001, tem apresentação agendada |
| **Doutorando 2** | doutorando2@ufba.br | Dout@123 | Ativo | Matrícula: 2021002, tem apresentação agendada |
| **Doutorando 8** | doutorando8@ufba.br | Dout@123 | Ativo | Matrícula: 2021008, SEM apresentação ainda |
| **Ouvinte 1** | ouvinte1@gmail.com | Ouvinte@123 | Ativo | Pode visualizar e votar em apresentações |
| **Ouvinte 2** | ouvinte2@hotmail.com | Ouvinte@123 | Ativo | Pode visualizar e votar em apresentações |

---

## Cenários de Teste por Perfil

### 1. Super Admin (admin@ufba.br)

**O que testar:**

#### Gestão de Usuários
- ✅ Visualizar lista completa de usuários
- ✅ Filtrar usuários por perfil (Professor, Doutorando, Ouvinte)
- ✅ Filtrar por status (Ativo, Pendente, Rejeitado)
- ✅ Aprovar professor pendente (pendente@ufba.br)
- ✅ Rejeitar solicitação de cadastro
- ✅ Conceder privilégio de Admin a professor
- ✅ Conceder privilégio de Super Admin
- ✅ Atribuir papel de Coordenador
- ✅ Remover coordenador

#### Gestão de Edições
- ✅ Visualizar edições ativas e anteriores
- ✅ Criar nova edição do evento
- ✅ Editar configurações da edição ativa
- ✅ Arquivar edição antiga

#### Gestão de Apresentações
- ✅ Visualizar todas as apresentações
- ✅ Agendar apresentações pendentes
- ✅ Alterar horário de apresentação
- ✅ Cancelar apresentação
- ✅ Ver detalhes e PDF das apresentações

#### Sessões e Salas
- ✅ Criar nova sessão
- ✅ Editar sessão existente
- ✅ Detectar conflito de horário (criar sessão no mesmo horário/sala)
- ✅ Criar sessão sem sala (bloqueia todas as salas)
- ✅ Adicionar/remover apresentações de sessões
- ✅ Gerenciar salas (CRUD)

#### Rankings e Certificados
- ✅ Visualizar ranking de apresentações
- ✅ Selecionar premiados (1º, 2º, 3º lugar)
- ✅ Selecionar melhor avaliador
- ✅ Gerar certificados em lote
- ✅ Download de certificados

---

### 2. Coordenador (coordenador@ufba.br)

**O que testar:**

- ✅ Aprovar professores pendentes
- ✅ Gerenciar apresentações da edição
- ✅ Criar e editar sessões
- ✅ Visualizar e gerenciar agenda
- ✅ Gerar certificados
- ✅ Visualizar rankings

**Diferença do Super Admin:**
- ❌ NÃO pode criar novos admins
- ❌ NÃO pode criar novas edições
- ✅ Pode gerenciar a edição ativa

---

### 3. Professor (professor1@ufba.br ou professor2@ufba.br)

**O que testar:**

#### Visualização
- ✅ Ver lista de apresentações
- ✅ Ver detalhes de cada apresentação
- ✅ Fazer download do PDF da apresentação
- ✅ Ver agenda de apresentações

#### Votação
- ✅ Votar em apresentação (nota 0-10 + comentário)
- ✅ Verificar que não pode votar duas vezes na mesma
- ✅ Editar voto já dado
- ✅ Ver próprios votos

---

### 4. Professor Pendente (pendente@ufba.br)

**O que testar:**

- ❌ Tentar fazer login → **DEVE SER BLOQUEADO**
- Mensagem esperada: "Usuário aguardando aprovação"

**Fluxo de aprovação:**
1. Login como admin (admin@ufba.br)
2. Ir em "Usuários" → "Aprovações Pendentes"
3. Aprovar o professor pendente
4. Fazer logout
5. Fazer login com pendente@ufba.br → **DEVE FUNCIONAR**

---

### 5. Doutorando com Apresentação (doutorando1@ufba.br)

**O que testar:**

#### Submissão
- ✅ Ver própria apresentação
- ✅ Editar título, resumo, palavras-chave
- ✅ Sugerir data/horário preferencial
- ✅ Upload de arquivo PDF (simular)
- ✅ Submeter apresentação

#### Visualização
- ✅ Ver status da apresentação (Rascunho, Submetida, Agendada)
- ✅ Ver horário agendado
- ✅ Ver sala e sessão atribuídas
- ✅ Ver notas recebidas (após votação)

---

### 6. Doutorando sem Apresentação (doutorando8@ufba.br)

**O que testar:**

- ✅ Criar nova apresentação do zero
- ✅ Preencher formulário completo
- ✅ Upload de PDF
- ✅ Submeter para aprovação

---

### 7. Ouvinte (ouvinte1@gmail.com ou ouvinte2@hotmail.com)

**O que testar:**

- ✅ Visualizar lista de apresentações
- ✅ Ver detalhes de apresentações
- ✅ Votar em apresentações (nota + comentário)
- ✅ Ver agenda do evento
- ✅ Download de PDF de apresentações

**Limitações:**
- ❌ NÃO pode criar apresentações
- ❌ NÃO pode gerenciar usuários, sessões ou certificados

---

## Casos de Teste Especiais

### 1. Login Bloqueado - Usuário Pendente

**Passos:**
1. Tentar login com `pendente@ufba.br` / `Prof@123`
2. **Resultado esperado:** Erro "Usuário aguardando aprovação"

---

### 2. Aprovação de Professor e Login Subsequente

**Passos:**
1. Login como admin (`admin@ufba.br`)
2. Ir em "Usuários" → "Aprovações Pendentes"
3. Clicar em "Aprovar" para Ana Pendente
4. Logout
5. Login com `pendente@ufba.br` / `Prof@123`
6. **Resultado esperado:** Login bem-sucedido

---

### 3. Votação Múltipla na Mesma Apresentação

**Passos:**
1. Login como `professor1@ufba.br`
2. Ir em "Apresentações" → Abrir "Aprendizado Profundo..." (Pedro Oliveira)
3. Dar nota 9 e comentário "Excelente trabalho"
4. Salvar
5. Logout e login como `professor2@ufba.br`
6. Votar na mesma apresentação com nota 8
7. Login como admin e ver ranking
8. **Resultado esperado:** Média correta (8.5)

---

### 4. Conflito de Horário ao Criar Sessão

**Passos:**
1. Login como admin ou coordenador
2. Ir em "Sessões" → "Nova Sessão"
3. Tentar criar sessão:
   - Data: [mesma data de uma sessão existente]
   - Horário: 09:00 - 12:00
   - Sala: Auditório do IC (mesma de sessão existente)
4. **Resultado esperado:** Erro "Conflito de horário/sala detectado"

---

### 5. Sessão sem Sala (Bloqueia Todas)

**Passos:**
1. Verificar que existe "Sessão 3 - Manhã" sem sala definida
2. Tentar criar nova sessão no mesmo horário
3. **Resultado esperado:** Qualquer sala estará bloqueada

---

### 6. Reordenação de Apresentações

**Passos:**
1. Login como admin/coordenador
2. Ir em "Sessões" → Abrir "Sessão 1 - Manhã"
3. Ver apresentações agendadas
4. Alterar ordem (arrastar e soltar ou editar horários)
5. Salvar
6. **Resultado esperado:** Nova ordem mantida

---

### 7. Cálculo Correto de Ranking

**Passos:**
1. Login como admin
2. Ir em "Rankings"
3. Verificar apresentações ordenadas por nota média
4. **Resultado esperado:**
   - 1º lugar: "Otimização de Consultas..." (Julia Costa) - Média 9.0
   - 2º lugar: "Aprendizado Profundo..." (Pedro Oliveira) - Média 8.5
   - 3º lugar: "Blockchain..." (Lucas Ferreira) - Média 7.7

---

### 8. Validação de Upload de PDF

**Passos:**
1. Login como doutorando
2. Tentar upload de arquivo muito grande (>10MB)
3. **Resultado esperado:** Erro "Arquivo muito grande"
4. Tentar upload de arquivo não-PDF (.docx, .jpg)
5. **Resultado esperado:** Erro "Apenas arquivos PDF são permitidos"

---

## Dados do Evento

### Edição Ativa: V WEPGCOMP - 2025

- **Status:** Inscrições abertas
- **Prazo de submissão:** [7 dias à frente da data atual]
- **Data do evento:** [14-21 dias à frente]
- **Local:** Instituto de Computação - UFBA
- **Máximo de apresentações:** 15
- **Tempo por apresentação:** 20 minutos
- **Coordenador:** Carlos Coordenador

### Apresentações Cadastradas

Total: **10 apresentações**

**Com horário definido:** 8
- Sessão 1 (Dia 1 - Manhã): 3 apresentações
- Sessão 2 (Dia 1 - Tarde): 2 apresentações
- Sessão 3 (Dia 2 - Manhã): 2 apresentações
- Sessão 4 (Dia 2 - Tarde): 1 apresentação

**Sem horário:** 2 (aguardando agendamento)

### Sessões

- **Sessão 1 - Manhã** (Dia 1, 09:00-12:00, Auditório do IC)
- **Sessão 2 - Tarde** (Dia 1, 14:00-17:00, Sala 201)
- **Sessão 3 - Manhã** (Dia 2, 09:00-12:00, **SEM SALA** - bloqueia todas)
- **Sessão 4 - Tarde** (Dia 2, 14:00-17:00, Sala 202)

### Salas Disponíveis

1. **Auditório do IC** - 100 pessoas, projetor, computador
2. **Sala 201** - 50 pessoas, projetor, computador
3. **Sala 202** - 40 pessoas, projetor, computador
4. **Sala 301** - Inativa (manutenção)

### Votos

- **Apresentação 1** (Pedro): 4 votos, média 8.5
- **Apresentação 2** (Julia): 5 votos, média 9.0
- **Apresentação 3** (Lucas): 3 votos, média 7.7
- **Demais:** sem votos ainda

---

## Troubleshooting

### Problema: "Não consigo fazer login"

**Solução:**
- Verifique se está usando o email e senha corretos (consulte tabela acima)
- Verifique se o usuário não está com status PENDING_APPROVAL
- Limpe o cache do navegador (Ctrl+Shift+Delete)

### Problema: "Console mostra erro de rede"

**Solução:**
- Verifique no console se está em modo mock: `🎭 MOCK DATA`
- Se não estiver, edite `.env` e defina `VITE_USE_MOCK_DATA=true`
- Reinicie o servidor (`npm run dev`)

### Problema: "Dados não persistem após refresh"

**Solução:**
Isso é esperado! Por padrão, os dados mockados são **em memória**.

Para ativar persistência:
1. Edite `.env`:
   ```
   VITE_MOCK_PERSISTENCE=true
   ```
2. Reinicie o servidor

**Nota:** Com persistência ativada, alterações ficam salvas no localStorage até você limpar o cache do navegador.

### Problema: "Quero resetar todos os dados"

**Solução:**

**Opção 1 - Sem persistência:**
- Simplesmente recarregue a página (F5)

**Opção 2 - Com persistência:**
1. Abra console do navegador (F12)
2. Digite:
   ```javascript
   localStorage.clear()
   location.reload()
   ```

---

## Próximos Passos

Após testar com dados mockados:

1. **Conectar ao backend real:**
   - Configure `.env` com `VITE_USE_MOCK_DATA=false`
   - Configure `VITE_API_URL` com a URL do backend
   - Reinicie o servidor

2. **Deploy:**
   - Execute `npm run build`
   - O sistema detectará automaticamente o modo (mock ou real) baseado nas variáveis de ambiente

---

## Suporte

Para dúvidas ou problemas:
- Consulte `README.md` para informações gerais
- Consulte `DEVELOPMENT_LOG.md` para detalhes técnicos
- Abra uma issue no repositório do projeto

---

**Data:** Novembro 2025
**Versão:** 1.0
**Status:** Completo e funcional
