
**(1) Contexto:**
Você está recebendo o código-fonte do front-end do sistema WEPGCOMP desenvolvido anteriormente. Sua tarefa é **adicionar dados mockados completos** para permitir teste e demonstração de todas as funcionalidades sem dependência de back-end.
**Objetivo:** Criar uma camada de mock data completa que simule respostas de API RESTful, permitindo navegação e interação com todas as features através de diferentes perfis de usuário.

**(2) Perfis de Usuário Mockados**
Crie pelo menos estes usuários de teste:

| Perfil | Email | Senha | Descrição |
|--------|-------|-------|-----------|
| Super Admin | admin@ufba.br | Admin@123 | Primeiro professor, acesso total |
| Coordenador | coordenador@ufba.br | Coord@123 | Coordenador da edição ativa |
| Professor 1 | professor1@ufba.br | Prof@123 | Aprovado, pode avaliar |
| Professor 2 | professor2@ufba.br | Prof@123 | Aprovado, pode avaliar |
| Professor Pendente | pendente@ufba.br | Prof@123 | Aguardando aprovação (bloqueado) |
| Doutorando 1 | doutorando1@ufba.br | Dout@123 | Matrícula: 2021001, com apresentação |
| Doutorando 2 | doutorando2@ufba.br | Dout@123 | Matrícula: 2021002, com apresentação |
| Ouvinte 1 | ouvinte1@gmail.com | Ouvinte@123 | Pode votar |
| Ouvinte 2 | ouvinte2@hotmail.com | Ouvinte@123 | Pode votar |

**(3) Dados do Evento**

**Edição Ativa:**
- Nome: "V WEPGCOMP - 2025"
- Data início/fim: [próximas 2-3 semanas]
- Prazo submissão: [1 semana à frente]
- Tempo por apresentação: 20 min
- Max apresentações: 15
- Local: "Auditório do IC - UFBA"

**Edição Anterior:**
- Nome: "IV WEPGCOMP - 2024"
- Status: Encerrado
- Com resultados finalizados

**(4) Apresentações (mínimo 8-10)**
Crie apresentações variadas incluindo:
- Apresentações completas com votos (notas 6-10)
- Apresentações sem horário definido
- Apresentações sem votos ainda
- Apresentações futuras agendadas
- Títulos realistas sobre temas de doutorado em computação
- Abstracts técnicos plausíveis
- PDFs mockados
- Distribuídas em diferentes sessões/salas

**(5) Sessões e Salas**
- 3-4 sessões em diferentes dias/horários
- Sessões com sala específica (ex: "Sala 201", "Sala 202")
- Pelo menos 1 sessão sem sala (bloqueia todas)
- 3 salas diferentes mockadas

**(6) Documentação**
Atualize README.md e DEVELOPMENT_LOG.md

**(7) Casos de Teste Especiais**
Garanta que seja possível testar:
- Login bloqueado para usuário pendente
- Aprovação de professor e login subsequente
- Votação por múltiplos usuários na mesma apresentação
- Conflito de horário ao criar sessão
- Reordenação de apresentações
- Cálculo correto de ranking
- Validação de upload (tamanho, formato)

**(8) Entrega**
Forneça:
1. **Código dos mocks** (dados + serviços)
2. **Código atualizado** (modificações necessárias nos componentes)
3. **README.md atualizado** (com seção de demonstração)
4. **DEVELOPMENT_LOG.md atualizado** (seção 4 completa)
5. **Guia rápido** de como iniciar e testar cada perfil

**Pode começar a implementação dos dados mockados.**