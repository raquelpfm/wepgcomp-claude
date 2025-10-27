**(1) Definição do Papel e Contexto:**
Você atuará como um Engenheiro de Software Front-end Sênior, responsável pelo desenvolvimento completo da interface do usuário (UI) para o sistema WEPGCOMP.
* **Projeto:** WEPGCOMP - Sistema web para gerenciamento de apresentações de doutorado do PGCOMP.
* **Público:** Alunos Doutorandos, Professores, Ouvintes, Administradores (Super Admins, Coordenadores).
* **Objetivo Principal:** Criar um front-end funcional, intuitivo, robusto, documentar o projeto (README.md) e registrar seu processo de desenvolvimento e auto-avaliação (DEVELOPMENT_LOG.md).

**(2) Instrução para Raciocínio Estruturado e Registro Inicial (CoT / Planejamento):**
Antes de gerar qualquer código, crie um arquivo separado chamado `DEVELOPMENT_LOG.md`. Inicie este arquivo com uma seção `## 1. Plano de Ação e Raciocínio Inicial`. Nesta seção, descreva seu plano de ação detalhado. Inclua:
* A stack tecnológica principal que você escolheu (Framework, Linguagem, Estilização) e uma breve justificativa inicial.
* A estrutura geral de pastas que você planeja usar.
* Sua estratégia para garantir a cobertura de todos os requisitos funcionais e a consideração dos não-funcionais relevantes.
* Como você organizará os componentes da UI para atender aos diferentes perfis de usuário.
*Pense passo a passo para garantir uma abordagem completa e registre esse pensamento neste arquivo.*

**(3) Tarefa Central e Requisitos Completos:**
Sua tarefa principal é gerar o código-fonte completo e funcional para o **front-end** do WEPGCOMP, baseado **estritamente e completamente** nos seguintes requisitos, e registrar as etapas subsequentes e auto-avaliações no `DEVELOPMENT_LOG.md`, além de criar um `README.md` padrão.

* **Requisitos Funcionais (FUNC):**
    * FUNC01 O sistema deve permitir que professores e doutorandos do PGCOMP se cadastrem usando e-mail UFBA, matrícula e senha forte para acessar o sistema de forma segura.
    * FUNC02 O sistema deve validar o e-mail e matrícula UFBA para garantir autenticidade.
    * FUNC03 O sistema deve enviar um e-mail de confirmação com um link válido para completar o cadastro.
    * FUNC04 O sistema deve liberar o login do professor apenas após aprovação dos administradores.
    * FUNC05 O sistema deve permitir que ouvintes se cadastrem utilizando um e-mail válido.
    * FUNC06 O sistema deve exigir uma senha forte para criação da conta.
    * FUNC07 O sistema deve enviar um e-mail de confirmação com um link válido para completar o cadastro.
    * FUNC08 O sistema deve permitir que administradores concedam privilégios de administrador a qualquer usuário escolhido para organização do evento.
    * FUNC09 O sistema deve atribuir automaticamente o primeiro professor cadastrado como Super Administrador.
    * FUNC10 O sistema deve permitir que apenas Super Administradores adicionem novos Super Administradores.
    * FUNC11 O sistema deve permitir que Super Administradores concedam privilégios administrativos a professores de forma duradoura.
    * FUNC12 O sistema deve tornar automaticamente um coordenador de edição de evento um Super Administrador.
    * FUNC13 O sistema deve permitir que um Super Administrador atribua o cargo de Coordenador a um professor.
    * FUNC14 O sistema deve garantir que apenas um coordenador exista por edição do evento.
    * FUNC15 O sistema deve garantir que o coordenador também seja administrador até o fim do evento.
    * FUNC16 O sistema deve permitir que administradores avaliem pedidos de cadastro de professores e os aprovem ou rejeitem.
    * FUNC17 O sistema deve bloquear o login de um professor até que sua solicitação seja aprovada.
    * FUNC18 O sistema deve permitir que doutorandos apresentadores cadastrem suas apresentações e sugiram data e horário disponíveis.
    * FUNC19 O sistema deve armazenar as informações do doutorando e associá-las ao evento.
    * FUNC20 O sistema deve permitir que administradores alterem data, horário e demais informações das apresentações.
    * FUNC21 O sistema deve permitir que doutorandos façam upload do conteúdo da apresentação em formato PDF, limitado a 10MB.
    * FUNC22 O sistema deve disponibilizar o conteúdo na página da apresentação.
    * FUNC23 O sistema deve permitir que professores avaliadores e ouvintes votem nas apresentações.
    * FUNC24 O sistema deve registrar as notas associadas ao doutorando da apresentação.
    * FUNC25 O sistema deve permitir que administradores criem e excluam sessões do evento.
    * FUNC26 O sistema deve bloquear todas as salas no período de uma sessão sem sala específica.
    * FUNC27 O sistema deve validar a sessão antes de incluí-la no cronograma.
    * FUNC28 O sistema deve permitir que administradores alterem as informações de apresentações para organização do evento.
    * FUNC29 O sistema deve calcular a nota de cada apresentação considerando as avaliações e a quantidade de avaliações.
    * FUNC30 O sistema deve permitir que administradores listem os doutorandos com base nas notas das apresentações.
    * FUNC31 O sistema deve permitir que administradores selecionem subjetivamente 3 avaliadores para premiá-los.
    * FUNC32 O sistema deve enviar certificados de participação em PDF para professores e doutorandos que participaram do evento.
    * FUNC33 O sistema deve dispor de uma página inicial contendo os painel principal, programação do evento, orientações, contato, local do evento e realização e apoio.
    * FUNC34 O sistema deve permitir que usuários visualizem na página inicial os detalhes de uma apresentação para decidirem se devem assisti-la.
    * FUNC35 O sistema deve permitir que administradores removam usuários com cadastros incorretos para impedir inconsistências no sistema.
    * FUNC36 O sistema deve permitir que administradores criem novas edições do evento utilizando os mesmos cadastro de usuários de edições anteriores.
    * FUNC37 O sistema deve permitir que administradores editem parâmetros da edição ativa do evento para adaptar as mudanças de última hora.
    * FUNC38 O sistema deve avisar ao administrador que as apresentações ficarão sem horário atribuído em caso de alteração de tempo alocado ou quantidade de apresentações.
    * FUNC39 O sistema deve impedir que a data de limite da submissão seja posterior ao início do evento em caso de edição dos parâmetros da edição ativa.
    * FUNC40 O sistema deve permitir que administradores reordenem as apresentações em caso de falta de algum doutorando para evitar atrasos no evento.
* **Requisitos Não-Funcionais (NOTF):**
    * NOTF01 O sistema deve possuir autenticação segura para garantir a integridade dos cadastros.
    * NOTF02 O sistema deve fornecer uma interface intuitiva para facilitar o uso por diferentes perfis de usuários.
    * NOTF03 O sistema deve estar disponível durante todo o período do evento.
    * NOTF04 O sistema deve suportar a hospedagem de múltiplas edições do evento.
    * NOTF05 O sistema deve garantir o armazenamento de dados para reaproveitá-los em edições futuras.
    * NOTF06 O sistema deve suportar os acessos simultâneos durante o período do evento.

**(4) Diretrizes Técnicas e de Qualidade:**
* **Stack Tecnológica:** Use um framework front-end moderno (React, Vue, Angular, Svelte), TypeScript (preferencial) ou JavaScript, e uma abordagem de estilização moderna. Se escolher algo diferente, justifique detalhadamente no `DEVELOPMENT_LOG.md`.
* **Qualidade do Código:** Gere código limpo, legível, modular (componentizado), seguindo os padrões e melhores práticas da comunidade para a stack escolhida. Minimize duplicação e complexidade desnecessária. Inclua comentários claros no código para explicar lógica complexa ou decisões não óbvias (foco no *porquê*).
* **Back-end:** Assuma uma API RESTful hipotética para interações com o servidor. O design do front-end deve refletir chamadas a essa API para operações CRUD e outras lógicas de negócio. Não implemente o back-end.

**(5) Especificação Detalhada das Saídas Esperadas (Código + README + DEVELOPMENT_LOG):**
Sua saída final deve consistir em três partes principais:

**Parte 1: Código-Fonte do Front-end**
* Forneça o código completo, organizado em uma estrutura de pastas lógica (componentes, páginas/views, serviços/utils, assets, etc.).
* Inclua comentários relevantes diretamente no código.

**Parte 2: Arquivo `README.md`**
* Este arquivo deve focar na descrição e uso do projeto. Crie-o com as seguintes seções:
    * `## README - WEPGCOMP Front-end`
    * `### Descrição Geral do Projeto`
    * `### Stack Tecnológica Utilizada` (Apenas a listagem final)
    * `### Instruções de Setup e Execução` (Instalação, execução local)
    * `### Estrutura de Pastas (Visão Geral)`

**Parte 3: Arquivo `DEVELOPMENT_LOG.md`**
* Este arquivo deve documentar seu processo e auto-avaliação. Crie-o com as seguintes seções:
    * `## DEVELOPMENT LOG - WEPGCOMP Front-end`
    * `### 1. Plano de Ação e Raciocínio Inicial` (Conforme gerado na Seção 2 deste prompt)
    * `### 2. Justificativa Detalhada da Escolha da Stack Tecnológica` (Explicação completa relacionando com requisitos)
    * `### 3. Métricas de Auto-Avaliação`
        * `#### 3.1 Tempo Estimado de Desenvolvimento` (Indique o tempo total em horas ou minutos)
        * `#### 3.2 Cobertura de Requisitos Funcionais (Auto-Avaliação)` (Liste **cada** FUNC ID de FUNC01 a FUNC40 e seu status: `Totalmente Implementado`, `Parcialmente Implementado [Justificativa breve]`, ou `Não Implementado`)
        * `#### 3.3 Aderência aos Requisitos Não-Funcionais (Auto-Avaliação)` (Para cada NOTF de NOTF01 a NOTF06, forneça 1-2 frases descrevendo como o front-end contribui para atendê-lo)

**(6) Geração do Código e Documentos:**
Após detalhar o plano no `DEVELOPMENT_LOG.md` (seção 1), gere o código-fonte completo (Parte 1), o `README.md` (Parte 2), e complete as seções restantes do `DEVELOPMENT_LOG.md` (Parte 3).

**(7) Instruções Finais:**
* Sua resposta final deve ser o **código-fonte completo**, o **arquivo README.md completo** e o **arquivo DEVELOPMENT_LOG.md completo**, conforme especificado.
* Se um requisito não puder ser totalmente implementado apenas no front-end (ex: envio real de email), implemente a interface correspondente, adicione um comentário no código indicando a dependência do back-end, e registre isso como `Parcialmente Implementado` com justificativa no `DEVELOPMENT_LOG.md`.

**Pode começar.**
