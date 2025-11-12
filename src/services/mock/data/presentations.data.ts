/**
 * Mock Presentation Data
 * Contains presentations and votes for testing
 */

import { Presentation, PresentationStatus, PresentationVote } from '../../../types';

// Helper to calculate scheduled times
// @ts-ignore
const getScheduledTime = (sessionDate: string, order: number): string => {
  const date = new Date(sessionDate);
  const baseHour = 9; // Start at 9:00 AM
  const minutesPerPresentation = 25; // 20 min presentation + 5 min questions
  const totalMinutes = order * minutesPerPresentation;

  date.setHours(baseHour + Math.floor(totalMinutes / 60));
  date.setMinutes(totalMinutes % 60);

  return date.toISOString();
};

// Calculate dates
const today = new Date();
const twoWeeksFromNow = new Date(today);
twoWeeksFromNow.setDate(today.getDate() + 14);

const day2 = new Date(twoWeeksFromNow);
day2.setDate(day2.getDate() + 1);

// Mock Presentations
export const mockPresentations: Presentation[] = [
  // Presentation 1 - Scheduled with votes (Session 1)
  {
    id: 'pres-001',
    eventEditionId: 'event-001',
    studentId: 'user-006',
    studentName: 'Pedro Oliveira',
    studentMatricula: '2021001',
    title: 'Aprendizado Profundo Aplicado à Detecção de Anomalias em Redes de Computadores',
    abstract:
      'Esta pesquisa investiga o uso de redes neurais profundas para identificação automatizada de comportamentos anômalos em tráfego de rede. Utilizando técnicas de aprendizado não supervisionado, o modelo proposto demonstra capacidade de detectar padrões de ataques conhecidos e desconhecidos com alta precisão. Os experimentos foram conduzidos em datasets públicos (KDD Cup 99, NSL-KDD) e em dados reais coletados em ambiente de produção, apresentando taxas de detecção superiores a 95% com baixa taxa de falsos positivos.',
    keywords: ['Deep Learning', 'Anomaly Detection', 'Network Security', 'Intrusion Detection'],
    advisorName: 'Prof. Dr. Roberto Silva',
    advisorEmail: 'roberto.silva@ufba.br',
    suggestedDate: twoWeeksFromNow.toISOString(),
    suggestedTime: '09:00',
    scheduledDate: twoWeeksFromNow.toISOString(),
    scheduledTime: '09:00',
    duration: 20,
    sessionId: 'session-001',
    roomId: 'room-003',
    pdfUrl: '/mock/pdfs/apresentacao-001.pdf',
    pdfFileName: 'deep_learning_anomaly_detection.pdf',
    pdfUploadedAt: '2024-10-10T14:30:00Z',
    status: PresentationStatus.SCHEDULED,
    submittedAt: '2024-10-08T10:00:00Z',
    createdAt: '2024-10-05T09:00:00Z',
    updatedAt: '2024-10-10T14:30:00Z',
    averageScore: 8.5,
    totalVotes: 4,
  },

  // Presentation 2 - Scheduled with votes (Session 1)
  {
    id: 'pres-002',
    eventEditionId: 'event-001',
    studentId: 'user-007',
    studentName: 'Julia Costa',
    studentMatricula: '2021002',
    title: 'Otimização de Consultas em Bancos de Dados Distribuídos usando Algoritmos Genéticos',
    abstract:
      'O trabalho propõe uma abordagem baseada em algoritmos genéticos para otimização de planos de consulta em sistemas de banco de dados distribuídos. A pesquisa foca na minimização do tempo de resposta considerando custos de comunicação entre nós, paralelização de operações e balanceamento de carga. Resultados experimentais em clusters com até 16 nós demonstram redução média de 40% no tempo de execução comparado a otimizadores tradicionais baseados em heurísticas.',
    keywords: ['Distributed Databases', 'Query Optimization', 'Genetic Algorithms', 'Performance'],
    advisorName: 'Profa. Dra. Ana Paula Costa',
    advisorEmail: 'ana.costa@ufba.br',
    suggestedDate: twoWeeksFromNow.toISOString(),
    suggestedTime: '09:30',
    scheduledDate: twoWeeksFromNow.toISOString(),
    scheduledTime: '09:25',
    duration: 20,
    sessionId: 'session-001',
    roomId: 'room-003',
    pdfUrl: '/mock/pdfs/apresentacao-002.pdf',
    pdfFileName: 'query_optimization_genetic.pdf',
    pdfUploadedAt: '2024-10-11T16:00:00Z',
    status: PresentationStatus.SCHEDULED,
    submittedAt: '2024-10-09T11:30:00Z',
    createdAt: '2024-10-06T10:00:00Z',
    updatedAt: '2024-10-11T16:00:00Z',
    averageScore: 9.0,
    totalVotes: 5,
  },

  // Presentation 3 - Scheduled with some votes (Session 1)
  {
    id: 'pres-003',
    eventEditionId: 'event-001',
    studentId: 'user-008',
    studentName: 'Lucas Ferreira',
    studentMatricula: '2021003',
    title: 'Blockchain para Rastreabilidade de Dados Médicos em Sistemas de Saúde',
    abstract:
      'Esta tese apresenta uma arquitetura baseada em blockchain permissionada para garantir rastreabilidade, integridade e privacidade de prontuários eletrônicos. O sistema proposto utiliza contratos inteligentes para controle de acesso granular e técnicas de criptografia homomórfica para análises preservando privacidade. A solução foi validada em ambiente simulado com 1000 pacientes e 50 profissionais de saúde, demonstrando viabilidade técnica e conformidade com LGPD.',
    keywords: ['Blockchain', 'Healthcare', 'Privacy', 'Smart Contracts', 'Electronic Health Records'],
    advisorName: 'Prof. Dr. Carlos Eduardo Mendes',
    advisorEmail: 'carlos.mendes@ufba.br',
    suggestedDate: twoWeeksFromNow.toISOString(),
    suggestedTime: '10:00',
    scheduledDate: twoWeeksFromNow.toISOString(),
    scheduledTime: '09:50',
    duration: 20,
    sessionId: 'session-001',
    roomId: 'room-003',
    pdfUrl: '/mock/pdfs/apresentacao-003.pdf',
    pdfFileName: 'blockchain_healthcare.pdf',
    pdfUploadedAt: '2024-10-12T09:15:00Z',
    status: PresentationStatus.SCHEDULED,
    submittedAt: '2024-10-10T08:45:00Z',
    createdAt: '2024-10-07T11:00:00Z',
    updatedAt: '2024-10-12T09:15:00Z',
    averageScore: 7.7,
    totalVotes: 3,
  },

  // Presentation 4 - Scheduled without votes yet (Session 2)
  {
    id: 'pres-004',
    eventEditionId: 'event-001',
    studentId: 'user-009',
    studentName: 'Fernanda Lima',
    studentMatricula: '2021004',
    title: 'Computação em Névoa para Internet das Coisas: Otimização de Offloading de Tarefas',
    abstract:
      'A pesquisa aborda o problema de decisão de offloading em ambientes de fog computing, considerando latência, consumo energético e disponibilidade de recursos. Propõe-se um algoritmo de aprendizado por reforço que aprende políticas de offloading adaptativas para diferentes cenários de IoT. Simulações com até 500 dispositivos IoT mostram redução de 35% na latência média e 28% no consumo energético comparado a estratégias estáticas.',
    keywords: ['Fog Computing', 'IoT', 'Task Offloading', 'Reinforcement Learning', 'Edge Computing'],
    advisorName: 'Prof. Dr. Fernando Almeida',
    advisorEmail: 'fernando.almeida@ufba.br',
    scheduledDate: twoWeeksFromNow.toISOString(),
    scheduledTime: '14:00',
    duration: 20,
    sessionId: 'session-002',
    roomId: 'room-001',
    pdfUrl: '/mock/pdfs/apresentacao-004.pdf',
    pdfFileName: 'fog_computing_iot.pdf',
    pdfUploadedAt: '2024-10-13T10:30:00Z',
    status: PresentationStatus.SCHEDULED,
    submittedAt: '2024-10-11T15:20:00Z',
    createdAt: '2024-10-08T12:00:00Z',
    updatedAt: '2024-10-13T10:30:00Z',
    totalVotes: 0,
  },

  // Presentation 5 - Scheduled without votes (Session 2)
  {
    id: 'pres-005',
    eventEditionId: 'event-001',
    studentId: 'user-010',
    studentName: 'Roberto Alves',
    studentMatricula: '2021005',
    title: 'Técnicas de Processamento de Linguagem Natural para Análise de Sentimentos em Redes Sociais',
    abstract:
      'Este trabalho investiga modelos de transformers (BERT, RoBERTa, GPT) aplicados à análise de sentimentos em textos curtos de redes sociais brasileiras. A pesquisa inclui fine-tuning de modelos pré-treinados com datasets rotulados em português, tratamento de ironia e sarcasmo, e análise de aspectos específicos. Os modelos propostos alcançam F1-score de 0.89 em datasets de benchmark, superando abordagens tradicionais baseadas em léxicos e n-gramas.',
    keywords: ['NLP', 'Sentiment Analysis', 'Transformers', 'BERT', 'Social Media'],
    advisorName: 'Profa. Dra. Mariana Santos',
    advisorEmail: 'mariana.santos@ufba.br',
    scheduledDate: twoWeeksFromNow.toISOString(),
    scheduledTime: '14:25',
    duration: 20,
    sessionId: 'session-002',
    roomId: 'room-001',
    pdfUrl: '/mock/pdfs/apresentacao-005.pdf',
    pdfFileName: 'nlp_sentiment_analysis.pdf',
    pdfUploadedAt: '2024-10-14T11:45:00Z',
    status: PresentationStatus.SCHEDULED,
    submittedAt: '2024-10-12T09:00:00Z',
    createdAt: '2024-10-09T13:00:00Z',
    updatedAt: '2024-10-14T11:45:00Z',
    totalVotes: 0,
  },

  // Presentation 6 - Scheduled for day 2 (Session 3 - no room)
  {
    id: 'pres-006',
    eventEditionId: 'event-001',
    studentId: 'user-011',
    studentName: 'Camila Rocha',
    studentMatricula: '2021006',
    title: 'Arquiteturas de Microsserviços: Padrões de Resiliência e Tolerância a Falhas',
    abstract:
      'A tese investiga padrões arquiteturais para construção de sistemas distribuídos resilientes baseados em microsserviços. Propõe um framework que implementa circuit breakers, bulkheads, retry policies e fallback mechanisms de forma declarativa. A validação inclui injeção de falhas (chaos engineering) em ambiente de produção simulado, demonstrando aumento de 99.5% para 99.95% na disponibilidade geral do sistema.',
    keywords: ['Microservices', 'Resilience', 'Fault Tolerance', 'Distributed Systems', 'Cloud Computing'],
    advisorName: 'Prof. Dr. Ricardo Pereira',
    advisorEmail: 'ricardo.pereira@ufba.br',
    scheduledDate: day2.toISOString(),
    scheduledTime: '09:00',
    duration: 20,
    sessionId: 'session-003',
    // Note: session-003 has no room assigned
    pdfUrl: '/mock/pdfs/apresentacao-006.pdf',
    pdfFileName: 'microservices_resilience.pdf',
    pdfUploadedAt: '2024-10-15T08:20:00Z',
    status: PresentationStatus.SCHEDULED,
    submittedAt: '2024-10-13T14:30:00Z',
    createdAt: '2024-10-10T14:00:00Z',
    updatedAt: '2024-10-15T08:20:00Z',
    totalVotes: 0,
  },

  // Presentation 7 - Scheduled for day 2 (Session 3 - no room)
  {
    id: 'pres-007',
    eventEditionId: 'event-001',
    studentId: 'user-012',
    studentName: 'Rafael Mendes',
    studentMatricula: '2021007',
    title: 'Realidade Virtual Imersiva para Treinamento Médico: Uma Abordagem Baseada em Gamificação',
    abstract:
      'Este trabalho desenvolve um ambiente de realidade virtual para treinamento de procedimentos cirúrgicos, incorporando elementos de gamificação para aumentar engajamento e retenção de conhecimento. O sistema utiliza haptic feedback, simulação física de tecidos e tracking de movimentos de alta precisão. Estudos com 40 residentes demonstram melhoria significativa (p<0.05) em tempo de execução e precisão após treinamento no ambiente virtual.',
    keywords: ['Virtual Reality', 'Medical Training', 'Gamification', 'Simulation', 'Haptic Feedback'],
    advisorName: 'Profa. Dra. Patricia Oliveira',
    advisorEmail: 'patricia.oliveira@ufba.br',
    scheduledDate: day2.toISOString(),
    scheduledTime: '09:25',
    duration: 20,
    sessionId: 'session-003',
    pdfUrl: '/mock/pdfs/apresentacao-007.pdf',
    pdfFileName: 'vr_medical_training.pdf',
    pdfUploadedAt: '2024-10-16T10:00:00Z',
    status: PresentationStatus.SCHEDULED,
    submittedAt: '2024-10-14T16:45:00Z',
    createdAt: '2024-10-11T15:00:00Z',
    updatedAt: '2024-10-16T10:00:00Z',
    totalVotes: 0,
  },

  // Presentation 8 - Scheduled for day 2 (Session 4)
  {
    id: 'pres-008',
    eventEditionId: 'event-001',
    studentId: 'user-015',
    studentName: 'Patricia Nunes',
    studentMatricula: '2021010',
    title: 'Criptografia Pós-Quântica: Implementação e Análise de Desempenho de Algoritmos de Lattice',
    abstract:
      'A pesquisa foca na implementação eficiente de esquemas criptográficos baseados em lattices resistentes a computadores quânticos. O trabalho inclui otimizações em nível de software e hardware (uso de instruções SIMD), análise de segurança formal e benchmarks de desempenho. Os resultados mostram que a implementação otimizada de CRYSTALS-Kyber apresenta overhead de apenas 15% comparado a RSA-2048 em operações de key exchange.',
    keywords: ['Post-Quantum Cryptography', 'Lattice-based Cryptography', 'Security', 'Performance Optimization'],
    advisorName: 'Prof. Dr. Alexandre Moreira',
    advisorEmail: 'alexandre.moreira@ufba.br',
    scheduledDate: day2.toISOString(),
    scheduledTime: '14:00',
    duration: 20,
    sessionId: 'session-004',
    roomId: 'room-002',
    pdfUrl: '/mock/pdfs/apresentacao-008.pdf',
    pdfFileName: 'post_quantum_crypto.pdf',
    pdfUploadedAt: '2024-10-17T13:30:00Z',
    status: PresentationStatus.SCHEDULED,
    submittedAt: '2024-10-15T10:15:00Z',
    createdAt: '2024-10-12T16:00:00Z',
    updatedAt: '2024-10-17T13:30:00Z',
    totalVotes: 0,
  },

  // Presentation 9 - Submitted but NOT scheduled yet
  {
    id: 'pres-009',
    eventEditionId: 'event-001',
    studentId: 'user-013',
    studentName: 'Beatriz Souza',
    studentMatricula: '2021008',
    title: 'Detecção Automática de Código Malicioso usando Análise Estática e Aprendizado de Máquina',
    abstract:
      'Esta pesquisa propõe um sistema híbrido de detecção de malware que combina análise estática de código (extração de features de bytecode e assembly) com técnicas de aprendizado de máquina. O modelo utiliza redes neurais convolucionais aplicadas a representações visuais de binários e random forests sobre features estruturais. Experimentos com datasets contendo 50.000 amostras alcançam precisão de 97.8% com taxa de falsos positivos inferior a 1%.',
    keywords: ['Malware Detection', 'Static Analysis', 'Machine Learning', 'Cybersecurity', 'CNN'],
    advisorName: 'Prof. Dr. Bruno Tavares',
    advisorEmail: 'bruno.tavares@ufba.br',
    suggestedDate: day2.toISOString(),
    suggestedTime: '14:30',
    duration: 20,
    pdfUrl: '/mock/pdfs/apresentacao-009.pdf',
    pdfFileName: 'malware_detection_ml.pdf',
    pdfUploadedAt: '2024-10-18T09:45:00Z',
    status: PresentationStatus.SUBMITTED,
    submittedAt: '2024-10-16T12:00:00Z',
    createdAt: '2024-10-13T17:00:00Z',
    updatedAt: '2024-10-18T09:45:00Z',
    totalVotes: 0,
  },

  // Presentation 10 - Submitted but NOT scheduled yet
  {
    id: 'pres-010',
    eventEditionId: 'event-001',
    studentId: 'user-014',
    studentName: 'Gabriel Martins',
    studentMatricula: '2021009',
    title: 'Computação Verde: Otimização de Consumo Energético em Datacenters usando Virtualização Dinâmica',
    abstract:
      'O trabalho aborda técnicas de consolidação dinâmica de máquinas virtuais para redução do consumo energético em datacenters. Propõe-se um sistema autônomo que monitora carga de trabalho, prevê demanda futura usando séries temporais (LSTM) e realoca VMs minimizando número de servidores ativos. Simulações baseadas em traces reais de Google e Azure demonstram redução de até 42% no consumo energético mantendo SLAs de desempenho.',
    keywords: ['Green Computing', 'Energy Efficiency', 'Virtualization', 'Datacenter', 'VM Consolidation'],
    advisorName: 'Profa. Dra. Laura Cardoso',
    advisorEmail: 'laura.cardoso@ufba.br',
    suggestedDate: day2.toISOString(),
    suggestedTime: '15:00',
    duration: 20,
    pdfUrl: '/mock/pdfs/apresentacao-010.pdf',
    pdfFileName: 'green_computing_datacenters.pdf',
    pdfUploadedAt: '2024-10-19T11:20:00Z',
    status: PresentationStatus.SUBMITTED,
    submittedAt: '2024-10-17T14:50:00Z',
    createdAt: '2024-10-14T18:00:00Z',
    updatedAt: '2024-10-19T11:20:00Z',
    totalVotes: 0,
  },
];

// Mock Votes
export const mockVotes: PresentationVote[] = [
  // Votes for Presentation 1 (pres-001) - 4 votes
  {
    id: 'vote-001',
    presentationId: 'pres-001',
    userId: 'user-003',
    userName: 'Maria Silva',
    userRole: 'PROFESSOR',
    score: 8,
    comment: 'Excelente trabalho! A abordagem usando deep learning é muito promissora. Sugiro explorar mais técnicas de explicabilidade para os modelos.',
    votedAt: '2024-10-20T10:30:00Z',
  },
  {
    id: 'vote-002',
    presentationId: 'pres-001',
    userId: 'user-004',
    userName: 'João Santos',
    userRole: 'PROFESSOR',
    score: 9,
    comment: 'Pesquisa muito relevante. Os resultados experimentais são convincentes e a metodologia está bem estruturada.',
    votedAt: '2024-10-20T11:15:00Z',
  },
  {
    id: 'vote-003',
    presentationId: 'pres-001',
    userId: 'user-016',
    userName: 'Marcos Ouvinte',
    userRole: 'LISTENER',
    score: 8,
    comment: 'Apresentação clara e objetiva. A aplicação prática é evidente.',
    votedAt: '2024-10-20T12:00:00Z',
  },
  {
    id: 'vote-004',
    presentationId: 'pres-001',
    userId: 'user-017',
    userName: 'Sandra Visitante',
    userRole: 'LISTENER',
    score: 9,
    comment: 'Trabalho impressionante! A taxa de detecção alcançada é excelente.',
    votedAt: '2024-10-20T13:30:00Z',
  },

  // Votes for Presentation 2 (pres-002) - 5 votes
  {
    id: 'vote-005',
    presentationId: 'pres-002',
    userId: 'user-003',
    userName: 'Maria Silva',
    userRole: 'PROFESSOR',
    score: 9,
    comment: 'Abordagem inovadora! A redução de 40% no tempo de execução é significativa. Seria interessante ver comparação com outras técnicas de otimização.',
    votedAt: '2024-10-21T09:00:00Z',
  },
  {
    id: 'vote-006',
    presentationId: 'pres-002',
    userId: 'user-004',
    userName: 'João Santos',
    userRole: 'PROFESSOR',
    score: 9,
    comment: 'Resultados muito bons. A escalabilidade do sistema é um ponto forte.',
    votedAt: '2024-10-21T09:45:00Z',
  },
  {
    id: 'vote-007',
    presentationId: 'pres-002',
    userId: 'user-002',
    userName: 'Carlos Coordenador',
    userRole: 'COORDINATOR',
    score: 10,
    comment: 'Trabalho excepcional! Um dos melhores que vi este ano. Parabéns!',
    votedAt: '2024-10-21T10:30:00Z',
  },
  {
    id: 'vote-008',
    presentationId: 'pres-002',
    userId: 'user-016',
    userName: 'Marcos Ouvinte',
    userRole: 'LISTENER',
    score: 8,
    comment: 'Muito interessante a aplicação de algoritmos genéticos nesse contexto.',
    votedAt: '2024-10-21T11:15:00Z',
  },
  {
    id: 'vote-009',
    presentationId: 'pres-002',
    userId: 'user-017',
    userName: 'Sandra Visitante',
    userRole: 'LISTENER',
    score: 9,
    comment: 'Apresentação excelente e bem estruturada.',
    votedAt: '2024-10-21T12:00:00Z',
  },

  // Votes for Presentation 3 (pres-003) - 3 votes
  {
    id: 'vote-010',
    presentationId: 'pres-003',
    userId: 'user-003',
    userName: 'Maria Silva',
    userRole: 'PROFESSOR',
    score: 8,
    comment: 'Tema muito relevante! A aplicação de blockchain na saúde tem grande potencial. A conformidade com LGPD é um diferencial importante.',
    votedAt: '2024-10-22T10:00:00Z',
  },
  {
    id: 'vote-011',
    presentationId: 'pres-003',
    userId: 'user-004',
    userName: 'João Santos',
    userRole: 'PROFESSOR',
    score: 7,
    comment: 'Bom trabalho. Sugiro aprofundar mais a análise de desempenho do sistema.',
    votedAt: '2024-10-22T11:30:00Z',
  },
  {
    id: 'vote-012',
    presentationId: 'pres-003',
    userId: 'user-016',
    userName: 'Marcos Ouvinte',
    userRole: 'LISTENER',
    score: 8,
    comment: 'Aplicação prática muito interessante. A privacidade dos dados é crucial.',
    votedAt: '2024-10-22T14:00:00Z',
  },
];

// Helper functions
export const getPresentationById = (id: string): Presentation | undefined => {
  return mockPresentations.find((pres) => pres.id === id);
};

export const getPresentationsByEventId = (eventId: string): Presentation[] => {
  return mockPresentations.filter((pres) => pres.eventEditionId === eventId);
};

export const getPresentationsByStudentId = (studentId: string): Presentation[] => {
  return mockPresentations.filter((pres) => pres.studentId === studentId);
};

export const getPresentationsBySessionId = (sessionId: string): Presentation[] => {
  return mockPresentations.filter((pres) => pres.sessionId === sessionId);
};

export const getVotesByPresentationId = (presentationId: string): PresentationVote[] => {
  return mockVotes.filter((vote) => vote.presentationId === presentationId);
};

export const getVotesByUserId = (userId: string): PresentationVote[] => {
  return mockVotes.filter((vote) => vote.userId === userId);
};

export const getUserVoteForPresentation = (
  userId: string,
  presentationId: string
): PresentationVote | undefined => {
  return mockVotes.find(
    (vote) => vote.userId === userId && vote.presentationId === presentationId
  );
};

// Calculate ranking
export const getPresentationRankings = (eventId: string) => {
  const presentations = getPresentationsByEventId(eventId);

  return presentations
    .map((pres) => {
      const votes = getVotesByPresentationId(pres.id);
      const totalVotes = votes.length;
      const averageScore =
        totalVotes > 0
          ? votes.reduce((sum, vote) => sum + vote.score, 0) / totalVotes
          : 0;

      return {
        presentation: pres,
        averageScore: Math.round(averageScore * 10) / 10,
        totalVotes,
      };
    })
    .filter((item) => item.totalVotes > 0) // Only presentations with votes
    .sort((a, b) => b.averageScore - a.averageScore) // Sort by score descending
    .map((item, index) => ({
      ...item,
      rank: index + 1,
    }));
};
