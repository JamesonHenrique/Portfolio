import { SiteContent } from './types';

// Source of truth: tools/cv-portfolio.md, OportunizaVaga/README.md, Newgram/README.md.
// Keep en.ts strictly aligned in facts and structure.
export const PT: SiteContent = {
  lang: 'pt',
  htmlLang: 'pt-BR',
  ogLocale: 'pt_BR',
  home: '/',
  otherHome: '/en',
  switchLabel: 'EN',
  switchAria: 'Read in English',
  meta: {
    title: 'Jameson Henrique | Desenvolvedor Full Stack na Wolfacilitates',
    description:
      'Desenvolvedor Full Stack e Responsável por Tecnologia na Wolfacilitates C&M. Estudante de BTI no IMD/UFRN, com base em Java, Spring Boot, Angular, TypeScript e automações.'
  },
  skipLink: 'Pular para o conteúdo',
  nav: {
    aria: 'Navegação principal',
    menuOpen: 'Abrir menu',
    menuClose: 'Fechar menu',
    inicio: 'Início',
    projetos: 'Trabalhos',
    sobre: 'Sobre',
    skills: 'Capacidades',
    contato: 'Contato',
    inspectLabel: 'Inspecionar ↗',
    inspectClose: 'Fechar modo ×',
    inspectAria: 'Ativar modo de inspeção técnica da interface',
    inspectStatus: 'MODO INSPEÇÃO / ATIVO · CLIQUE NOVAMENTE OU PRESSIONE ESC PARA DESATIVAR'
  },
  hero: {
    context: 'Wolfacilitates C&M · Natal, RN',
    eyebrowLocation: 'Natal · Brasil',
    name: 'Jameson Henrique',
    headline: 'Além do clique tem código.',
    titleLine1: 'Além',
    titleLine2: 'do clique',
    titleLine3: 'tem código.',
    subhead: 'Eu desenho interfaces e construo o que as faz funcionar — APIs, automações e produtos digitais.',
    subheadPre: 'Eu desenho interfaces e construo ',
    subheadEm: 'o que as faz funcionar',
    subheadPost: ' — APIs, automações e produtos digitais.',
    projectsButton: 'Ver trabalhos selecionados',
    cvButton: 'Currículo PDF',
    sign: 'PORTFÓLIO / 2026\nARQUIVO DE SISTEMAS',
    deckCaption: 'Portfólio em três provas',
    deckBadge: 'Troque o trabalho',
    prevProject: 'Projeto anterior',
    nextProject: 'Próximo projeto',
    openCase: 'Abrir estudo de caso',
    panelLabel: 'Sistemas em destaque',
    panelHint: 'Selecione um projeto para inspecionar arquitetura e decisão técnica',
    panelCta: 'Ler estudo de caso',
    panelDecisionLabel: 'Decisão-chave'
  },
  ribbon: ['APLICAÇÕES REAIS', 'INTERFACES', 'SISTEMAS', 'AUTOMAÇÃO'],
  intro: {
    label: '01 / Como eu trabalho',
    headlinePre: 'Não basta ',
    headlineEm: 'parecer',
    headlinePost: ' pronto. Tem que resolver alguma coisa.',
    noteLabel: 'DO PROBLEMA À OPERAÇÃO',
    noteText:
      'Gosto da parte em que a ideia encontra o uso real: fluxos, integrações, erros, pessoas. É ali que o software precisa fazer sentido.'
  },
  projects: {
    index: '02',
    kicker: 'Seleção de trabalhos',
    sectionLabel: '02 / Seleção de trabalhos',
    title: 'Em produção.',
    headingTop: 'Em',
    headingEm: 'produção.',
    lead: 'Três projetos. Três problemas diferentes. Mais para explorar dentro de cada caso — menos texto aqui.',
    decisionLabel: 'Decisão técnica',
    readCase: 'Ler estudo de caso',
    proofPrefix: 'JH / PROOF',
    viewCode: 'Ver no GitHub',
    privateLabel: 'Projeto de cliente · Ver escopo',
    demo: 'Ver demo',
    code: 'GitHub',
    techsAria: 'Tecnologias utilizadas',
    archiveTitle: 'Outros repositórios',
    archiveLead: 'Projetos de estudo e experimentação full stack disponíveis no GitHub.',
    archiveMore: 'Ver todos os repositórios no GitHub',
    flagships: [
      {
        index: '01',
        slug: 'oportunizavaga',
        title: 'OportunizaVaga',
        titlePre: 'Oportuniza',
        titleEm: 'Vaga.',
        subtitle: 'Agente open-source de busca e candidatura com estado durável',
        category: 'AUTOMAÇÃO · 2026',
        period: '2026',
        description:
          'Ferramenta open-source que busca, filtra e organiza candidaturas em portais brasileiros usando modelos de IA e navegador real via Chrome DevTools Protocol, com painel opcional sem banco de dados.',
        shortSummary: 'Automatizar sem perder o controle: busca de vagas, filtros e monitoramento de execução.',
        decision:
          'Supervisor idempotente via cron a cada 5 minutos com trava exclusiva de arquivo e estado durável em JSON fora da sessão do modelo.',
        focusLine: 'FOCO DO PROJETO / ESTADO DURÁVEL · RETENTATIVAS · MONITORAMENTO',
        frameTag: 'NÃO É MOCKUP',
        chapterTone: 'gold',
        inspectNotes: [
          { id: '01', text: '[ 01 ] UI de monitoramento zero-DB' },
          { id: '02', text: '[ 02 ] estado JSON + flock fora da LLM' }
        ],
        techs: ['Python', 'Shell', 'Node.js', 'Chrome (CDP)', 'LLMs', 'GitHub Actions'],
        image: 'oportunizavaga_print.webp',
        imageWidth: 960,
        imageHeight: 600,
        imageAlt:
          'Monitor do OportunizaVaga em demonstração com dados fictícios mostrando envios e cadência por portal',
        page: '/projetos/oportunizavaga',
        url: 'https://github.com/JamesonHenrique/OportunizaVaga',
        demo: 'https://oportunizavaga-demo.vercel.app'
      },
      {
        index: '02',
        slug: 'painel-de-maquinas',
        title: 'Painel de Máquinas',
        titlePre: 'Painel de',
        titleEm: 'Máquinas.',
        subtitle: 'Monitoramento de equipamentos no chão de fábrica em tempo real',
        category: 'INDÚSTRIA · 2025',
        period: 'jun–jul/2025',
        description:
          'Aplicação web completa (backend e frontend) entregue para operação diária em chão de fábrica, substituindo a conferência manual pela leitura imediata do estado de cada equipamento.',
        shortSummary: 'Uma visão direta do que acontece com os equipamentos, sem depender da conferência manual.',
        decision:
          'Modelagem direta por estado operacional (em operação, parada, manutenção e sem operador) com atualização contínua para leitura rápida à distância.',
        focusLine: 'FREELANCE / DETALHES PÚBLICOS LIMITADOS · CÓDIGO PRIVADO',
        frameTag: 'EXEMPLO DE TELA',
        chapterTone: 'green',
        inspectNotes: [
          { id: '01', text: '[ 01 ] 4 estados operacionais' },
          { id: '02', text: '[ 02 ] leitura contínua à distância' }
        ],
        techs: ['Java', 'Spring Boot', 'Angular', 'TypeScript', 'MongoDB', 'RxJS'],
        image: 'painel-de-maquinas_print.webp',
        imageWidth: 1200,
        imageHeight: 579,
        imageAlt: 'Painel web de monitoramento mostrando contadores e cartões de estado operacional de máquinas',
        page: '/projetos/painel-de-maquinas',
        privateNote: 'Código proprietário do cliente; estudo de caso baseado apenas em informações autorizadas.'
      },
      {
        index: '03',
        slug: 'newgram',
        title: 'Newgram',
        titlePre: 'Newgram.',
        titleEm: '',
        subtitle: 'Rede social full stack orientada a contrato OpenAPI',
        category: 'FULL STACK · 2025—26',
        period: '2025–2026',
        description:
          'Rede social completa com feed de descoberta, stories, destaques, coleções de salvos, notificações e grafo de seguidores — conectando API Spring Boot em camadas a cliente Angular gerado via OpenAPI.',
        shortSummary: 'Uma rede social construída de ponta a ponta — interface, API, autenticação e dados.',
        decision:
          'Autenticação JWT com rotação de refresh token, mídia no AWS S3 via presigned URLs com expiração configurável e schema PostgreSQL versionado com Flyway.',
        focusLine: 'FOCO DO PROJETO / JAVA · ANGULAR · POSTGRESQL · S3',
        frameTag: 'PROJETO PESSOAL',
        chapterTone: 'blue',
        inspectNotes: [
          { id: '01', text: '[ 01 ] cliente Angular via OpenAPI' },
          { id: '02', text: '[ 02 ] JWT + AWS S3 presigned URLs' }
        ],
        techs: ['Java 21', 'Spring Boot', 'Angular 19', 'PostgreSQL', 'AWS S3', 'Flyway'],
        image: 'newgram_print.webp',
        imageWidth: 1200,
        imageHeight: 546,
        imageAlt: 'Interface do feed do Newgram exibindo publicações, interações e sugestões de perfis',
        page: '/projetos/newgram',
        url: 'https://github.com/JamesonHenrique/Newgram',
        demo: 'https://newgram-nine.vercel.app/'
      }
    ],
    archive: [
      {
        title: 'Algamoney',
        description: 'Gestão financeira pessoal com controle de lançamentos, dashboard analítico e relatórios.',
        techs: ['Java', 'Spring Boot', 'Angular', 'PostgreSQL', 'JWT', 'JasperReports'],
        url: 'https://github.com/JamesonHenrique/Algamoney'
      },
      {
        title: 'WaveChat',
        description: 'Aplicação de mensagens instantâneas sobre WebSocket com gestão de identidade via Keycloak.',
        techs: ['Java', 'Spring Boot', 'Angular', 'WebSocket', 'Keycloak', 'Docker'],
        url: 'https://github.com/JamesonHenrique/WaveChat'
      },
      {
        title: 'BookLore',
        description: 'Catálogo pessoal de leitura com autenticação por e-mail e controle de empréstimos.',
        techs: ['Java', 'Spring Boot', 'Angular', 'PostgreSQL', 'JWT', 'Docker'],
        url: 'https://github.com/JamesonHenrique/BookLore'
      }
    ]
  },
  about: {
    index: '03',
    kicker: 'Quem faz',
    sectionLabel: '03 / Quem faz',
    title: 'Eu faço software. Sem mistério.',
    headingPre: 'Eu faço',
    headingEm: 'software.',
    headingPost: 'Sem mistério.',
    lead: 'Formação acadêmica em Tecnologia da Informação combinada com entregas reais em desenvolvimento web, CRM e automação operacional.',
    photoAlt: 'Retrato de Jameson Henrique',
    photoCaption: 'JAMESON, 2026.',
    shortBio:
      'Sou Jameson Henrique, desenvolvedor full stack e estudante de TI no IMD/UFRN. Trabalho com aplicações web, integrações e automações.',
    intro:
      'Sou desenvolvedor de software e estudante do Bacharelado em Tecnologia da Informação no IMD/UFRN. Meu trabalho gira em torno de transformar problemas operacionais concretos em sistemas legíveis, seguros e fáceis de manter.',
    detail:
      'Atuo principalmente com Java, Spring Boot, Angular e TypeScript no desenvolvimento full stack, somados à experiência prática com integrações via APIs REST, webhooks e automação de fluxos com Make, n8n e IA aplicada.',
    locationLabel: 'Base',
    location: 'Natal, RN · Brasil',
    educationLabel: 'Formação',
    education: 'Bacharelado em Tecnologia da Informação',
    educationDetail: 'Instituto Metrópole Digital (IMD/UFRN) · 2026.1 – cursando',
    languagesLabel: 'Idiomas',
    languages: 'Português (nativo) · Inglês (intermediário) · Espanhol (básico)',
    experienceHeading: 'Experiência profissional',
    currentBadge: 'Atual',
    cvLink: 'Baixar currículo em PDF',
    experience: [
      {
        period: 'nov/2026 – atual',
        role: 'Desenvolvedor Full Stack e Responsável por Tecnologia',
        organization: 'Wolfacilitates C&M',
        context: 'Remoto',
        summary:
          'Planejamento e desenvolvimento de aplicações web, landing pages e sistemas internos, além da estruturação de arquitetura, integrações e operação digital da empresa.',
        highlights: [
          'Estruturação de um CRM próprio e definição de arquitetura e tecnologias.',
          'Planejamento de APIs, integrações entre sistemas e avaliação de infraestrutura e custos.',
          'Definição de testes, segurança, versionamento, implantação e monitoramento.'
        ],
        stack: ['TypeScript', 'Angular', 'Java', 'Spring Boot', 'APIs REST', 'Docker'],
        current: true
      },
      {
        period: 'ago/2026 – out/2026',
        role: 'Estagiário em Desenvolvimento de Automações e Integrações',
        organization: 'Duarte e Almeida Advogados',
        context: 'LegalOps · Departamento de Tecnologia',
        summary:
          'Manutenção de integrações críticas em produção entre atendimento, CRM, assinatura eletrônica e sistema jurídico via APIs REST e webhooks.',
        highlights: [
          'Conversão e validação de 30 automações do Make para n8n Cloud.',
          'Construção de auditoria diária de tarefas jurídicas com regras refinadas junto à direção e Controladoria.',
          'Investigação de falhas em atendimento com IA, contratos de dados e fluxos de assinatura e pós-venda.'
        ],
        stack: ['Make', 'n8n', 'APIs REST', 'Webhooks', 'JSON', 'Google Workspace', 'IA aplicada']
      },
      {
        period: 'jun/2025 – jul/2025',
        role: 'Desenvolvedor Full Stack (Freelancer)',
        organization: 'Painel de Máquinas',
        context: 'Projeto sob demanda · Chão de fábrica',
        summary:
          'Desenvolvimento ponta a ponta (backend e frontend) de painel web para acompanhamento operacional de equipamentos industriais.',
        highlights: [
          'Visualização em tempo real organizada por estado operacional das máquinas.',
          'Sistema colocado em uso direto pelo cliente, eliminando a conferência manual.'
        ],
        stack: ['Java', 'Spring Boot', 'Angular', 'TypeScript', 'MongoDB']
      }
    ]
  },
  skills: {
    index: '03',
    kicker: 'Capacidades técnicas',
    title: 'Stack aplicada em contexto',
    lead: 'Tecnologias organizadas pelo papel que cumprem em arquitetura, entrega e manutenção — alinhadas à experiência documentada no currículo.',
    groups: [
      {
        index: '01',
        title: 'Backend, APIs e dados',
        context:
          'Serviços em camadas, contratos OpenAPI, autenticação JWT/OAuth2 com rotação de tokens e bancos relacionais e NoSQL com migrações versionadas.',
        items: [
          'Java',
          'Spring Boot',
          'Spring Security',
          'Spring Data JPA',
          'APIs REST',
          'JWT',
          'OAuth2',
          'OpenAPI / Swagger',
          'PostgreSQL',
          'MySQL',
          'MongoDB',
          'Flyway',
          'SQL'
        ]
      },
      {
        index: '02',
        title: 'Frontend e interfaces',
        context:
          'Aplicações web tipadas com foco em clareza operacional, acessibilidade, consumo de clientes gerados por contrato e renderização otimizada.',
        items: ['Angular', 'TypeScript', 'JavaScript', 'RxJS', 'Tailwind CSS', 'HTML semântico', 'SSR / Prerender']
      },
      {
        index: '03',
        title: 'Automação, integrações e IA aplicada',
        context:
          'Orquestração entre atendimento, CRM, assinatura eletrônica e sistemas internos com tratamento de erro, paginação, idempotência e proteção de credenciais.',
        items: [
          'Make',
          'n8n',
          'Python',
          'Webhooks',
          'JSON',
          'Gemini API',
          'Google Workspace',
          'Tratamento de erro',
          'Paginação',
          'Segurança de credenciais'
        ]
      },
      {
        index: '04',
        title: 'Testes, entrega e infraestrutura',
        context:
          'Testes unitários e automatizados, pipelines de CI com verificação de segredos, empacotamento em containers e entrega segura de mídia em nuvem.',
        items: ['JUnit', 'Mockito', 'Docker', 'Git', 'GitHub Actions (CI)', 'AWS S3', 'Linux']
      }
    ]
  },
  contact: {
    index: '04',
    kicker: 'Próxima conversa',
    sectionLabel: '04 / Próxima conversa',
    title: 'Tem algo pra resolver?',
    headingPre: 'Tem algo',
    headingEm: 'pra resolver?',
    lead: 'Aberto a conversas técnicas sobre engenharia de software, arquitetura web, integrações e tecnologia.',
    channelsHeading: 'Canais diretos',
    text: 'Atualmente na Wolfacilitates C&M. Se quiser discutir um projeto, trocar ideias sobre arquitetura ou falar sobre tecnologia, escreva por aqui ou direto pelo e-mail.',
    email: 'E-mail',
    copyEmail: 'Copiar e-mail',
    copiedEmail: 'Copiado',
    phone: 'Telefone',
    location: 'Localização',
    locationValue: 'Natal, RN · Brasil',
    social: 'Perfis',
    backToTop: 'VOLTAR AO INÍCIO ↑',
    form: {
      name: 'Seu nome',
      namePlaceholder: 'Como prefere ser chamado',
      email: 'Seu e-mail',
      emailPlaceholder: 'nome@empresa.com',
      subject: 'Assunto',
      subjectPlaceholder: 'Sobre o que vamos conversar',
      message: 'Mensagem',
      messagePlaceholder: 'Contexto, objetivo ou dúvida técnica...',
      send: 'Enviar mensagem',
      sending: 'Enviando...',
      sent: 'Mensagem enviada. Retorno pelo e-mail informado.',
      error: 'Não foi possível enviar agora. Escreva diretamente para'
    }
  },
  footer: {
    role: 'Desenvolvedor Full Stack · Natal, RN',
    rights: 'Todos os direitos reservados.',
    cv: 'Currículo (PDF)'
  },
  projectPage: {
    back: 'Voltar para projetos',
    caseLabel: 'Estudo de caso',
    problemHeading: 'Problema e contexto',
    stack: 'Stack utilizada',
    code: 'Ver código no GitHub',
    demo: 'Abrir demo ao vivo',
    nextCase: 'Próximo estudo de caso'
  },
  pages: {
    oportunizavaga: {
      index: '01',
      slug: 'oportunizavaga',
      title: 'OportunizaVaga',
      name: 'Agente open-source de busca e candidatura com estado durável e monitor zero-DB',
      category: 'Open-source · Automação & IA',
      period: '2026',
      metaDescription:
        'Estudo de caso do OportunizaVaga: automação open-source de busca e candidaturas com supervisor idempotente, estado durável fora da IA, Chrome CDP e monitor zero-DB.',
      specs: [
        { label: 'Papel', value: 'Autor e mantenedor' },
        { label: 'Licença', value: 'Open-source (MIT)' },
        { label: 'Plataformas', value: 'Linux · Windows (PS1 / WSL2)' },
        { label: 'Status', value: 'Publicado com demo ativa' }
      ],
      image: 'oportunizavaga_print.webp',
      imageWidth: 960,
      imageHeight: 600,
      imageAlt: 'Monitor do OportunizaVaga em demo com dados fictícios: candidaturas enviadas e cadência por portal',
      imageCaption:
        'Monitor opcional na Vercel exibindo dados fictícios de demonstração, cadência diária e distribuição por fonte.',
      intro: [
        'Buscar e filtrar vagas compatíveis em múltiplos portais brasileiros exige disciplina repetitiva: verificar critérios de perfil, evitar candidaturas duplicadas, adaptar currículo ao anúncio e acompanhar retornos sem perder o histórico.',
        'O OportunizaVaga estrutura esse fluxo como um sistema determinístico assistido por IA rodando localmente a custo zero. A documentação destaca explicitamente que automações podem violar termos de uso de portais de vagas, exigindo conferência prévia das regras de cada site e desencorajando candidaturas em massa.'
      ],
      architectureHeading: 'Arquitetura do sistema',
      architectureSummary:
        'Separação estrita entre orquestração (cron + supervisor), execução em navegador real (Chrome CDP), persistência de estado em JSON fora da sessão do modelo e telemetria agregada no monitor.',
      architectureAria:
        'Diagrama de arquitetura do OportunizaVaga: Cron a cada 5 minutos aciona o Guardião idempotente com trava exclusiva, que coordena o Loop e cascata de modelos LLM, interage com o Chrome via CDP, grava estado durável em JSON fora da IA e envia snapshot agregado ao Monitor na Vercel.',
      decisionsHeading: 'Decisões técnicas e trade-offs',
      decisions: [
        {
          title: 'Estado durável fora da sessão do modelo',
          rationale:
            'Cada rodada inicia uma sessão limpa de LLM. Todo histórico (aplicadas, bloqueios, descartes e rodízio) vive em JSON gravado atomicamente com trava exclusiva (jsonlock.py), evitando contaminação de contexto.'
        },
        {
          title: 'Supervisor idempotente em vez de daemon frágil',
          rationale:
            'Um cron a cada 5 minutos verifica se o loop e o Chrome (CDP :9222) estão ativos e sobe o que tiver caído. Trava de instância única impede disputa pelo mesmo navegador.'
        },
        {
          title: 'Nunca inventar dados do candidato',
          rationale:
            'Todo campo preenchido vem de arquivos locais configurados pelo usuário. Qualquer dado ausente interrompe a candidatura com registro explícito do motivo em bloqueios.'
        },
        {
          title: 'Monitor sem banco e telemetria agregada',
          rationale:
            'O painel opcional na Vercel mantém apenas o último snapshot em memória (custo zero), publicando contadores agregados por padrão e mascarando dados sensíveis nos logs.'
        }
      ],
      sections: [
        {
          heading: 'Fluxo operacional',
          items: [
            'Visita um portal por rodada em rodízio configurável, respeitando intervalos e backoff automático quando não há vagas novas.',
            'Cascata de provedores de IA com pontuação de saúde: ao atingir rate limit, alterna para o próximo provedor e retorna ao preferido quando disponível.',
            'Geração de currículo em PDF de 1 página por vaga a partir de um currículo-base local, acompanhada de checagem de aderência ATS (meta >= 75%).',
            'Rotina semanal somente leitura para acompanhamento de status e relatório de funil (vistas → aplicadas → respondidas → entrevistas).'
          ]
        },
        {
          heading: 'Qualidade e segurança',
          items: [
            'Testes automatizados em CI no GitHub Actions e script pré-commit de varredura de segredos e dados pessoais.',
            'Paridade entre scripts Linux (Bash) e Windows (PowerShell nativo / WSL2), além de modo dry-run para simular uma rodada sem enviar candidaturas.'
          ]
        }
      ],
      techs: [
        'Python',
        'Shell',
        'PowerShell',
        'Node.js',
        'Next.js',
        'Chrome (CDP)',
        'LLMs',
        'GitHub Actions',
        'Docker'
      ],
      url: 'https://github.com/JamesonHenrique/OportunizaVaga',
      demo: 'https://oportunizavaga-demo.vercel.app',
      nextSlug: 'painel-de-maquinas'
    },
    'painel-de-maquinas': {
      index: '02',
      slug: 'painel-de-maquinas',
      title: 'Painel de Máquinas',
      name: 'Monitoramento web de equipamentos em tempo real no chão de fábrica',
      category: 'Freelance · Produção industrial',
      period: 'jun–jul/2025',
      metaDescription:
        'Estudo de caso autorizado do Painel de Máquinas: sistema full stack em Java, Spring Boot, Angular e MongoDB para acompanhamento operacional de equipamentos no chão de fábrica.',
      specs: [
        { label: 'Papel', value: 'Full Stack (ponta a ponta)' },
        { label: 'Formato', value: 'Projeto freelance' },
        { label: 'Ambiente', value: 'Uso real em chão de fábrica' },
        { label: 'Código', value: 'Proprietário do cliente' }
      ],
      image: 'painel-de-maquinas_print.webp',
      imageWidth: 1200,
      imageHeight: 579,
      imageAlt: 'Painel web exibindo indicadores consolidados e cartões de status individual das máquinas',
      imageCaption:
        'Captura sanitizada do painel operacional mostrando totais por estado e grade individual de equipamentos.',
      intro: [
        'Antes do sistema, acompanhar quais equipamentos estavam operando, parados ou aguardando intervenção exigia conferência manual recorrente no chão de fábrica — um processo lento e propenso a atraso na resposta operacional.',
        'O projeto foi desenvolvido de ponta a ponta como solução web dedicada, consolidando em uma única tela a visão geral da planta e o status individual de cada máquina para uso contínuo pela equipe do cliente.'
      ],
      architectureHeading: 'Arquitetura do sistema',
      architectureSummary:
        'Backend REST em Java e Spring Boot integrado ao MongoDB para persistência de estados dos equipamentos, consumido por uma interface Angular reativa construída com RxJS e Tailwind CSS.',
      architectureAria:
        'Diagrama de arquitetura do Painel de Máquinas: eventos de estado dos equipamentos alimentam a API Spring Boot em Java conectada ao MongoDB, que serve dados continuamente ao frontend Angular com RxJS para exibição em tempo real no chão de fábrica.',
      decisionsHeading: 'Decisões técnicas e trade-offs',
      decisions: [
        {
          title: 'Hierarquia visual orientada a quatro estados claros',
          rationale:
            'Os equipamentos são agrupados em quatro condições objetivas (em operação, parada, em manutenção e sem operador), com totalizadores no topo para leitura imediata à distância.'
        },
        {
          title: 'Modelo documental flexível no MongoDB',
          rationale:
            'Representar o estado atual e os metadados de cada máquina em documentos simplificou leituras agregadas e atualizações frequentes sem rigidez excessiva de joins.'
        },
        {
          title: 'Interface Angular reativa e direta',
          rationale:
            'Uso de RxJS para manter o painel sincronizado com a API Spring Boot sem recarregamento manual de página, priorizando estabilidade e baixa fricção para operadores.'
        }
      ],
      sections: [
        {
          heading: 'Entregas principais',
          items: [
            'Desenvolvimento completo da API backend em Java com Spring Boot e persistência em MongoDB.',
            'Construção do frontend web em Angular, TypeScript, RxJS e Tailwind CSS com indicadores consolidados e cartões individuais por equipamento.',
            'Implantação e organização da visualização utilizada diretamente pelo cliente na rotina do chão de fábrica.'
          ]
        }
      ],
      techs: ['Java', 'Spring Boot', 'Angular', 'TypeScript', 'MongoDB', 'RxJS', 'Tailwind CSS'],
      privateNotice:
        'Projeto entregue sob contrato freelance: o código-fonte, os dados de produção e a identidade do cliente são confidenciais. Este estudo descreve apenas escopo e decisões técnicas autorizadas.',
      nextSlug: 'newgram'
    },
    newgram: {
      index: '03',
      slug: 'newgram',
      title: 'Newgram',
      name: 'Rede social full stack com arquitetura em camadas, contrato OpenAPI e AWS S3',
      category: 'Full Stack · Java & Angular',
      period: '2025–2026',
      metaDescription:
        'Estudo de caso do Newgram: rede social full stack com Java 21, Spring Boot 3.5, Angular 19, cliente OpenAPI tipado, rotação de refresh token JWT, PostgreSQL com Flyway e AWS S3.',
      specs: [
        { label: 'Papel', value: 'Autor (Backend + Frontend)' },
        { label: 'Backend', value: 'Java 21 · Spring Boot 3.5' },
        { label: 'Frontend', value: 'Angular 19 · OpenAPI client' },
        { label: 'Status', value: 'Open-source com demo ativa' }
      ],
      image: 'newgram_print.webp',
      imageWidth: 1200,
      imageHeight: 546,
      imageAlt: 'Feed principal do Newgram com publicações, ações de interação e painel de criadores sugeridos',
      imageCaption:
        'Feed do Newgram com consumo tipado da API REST, mídia entregue via presigned URLs e sugestões de perfis.',
      intro: [
        'O objetivo do Newgram foi ir além de um CRUD tradicional e modelar um domínio social completo com restrições reais de segurança, armazenamento de mídia e evolução de schema.',
        'A aplicação conecta um backend Spring Boot em camadas a um frontend Angular cujo cliente HTTP é gerado automaticamente a partir da especificação OpenAPI 3, eliminando divergências manuais de contrato.'
      ],
      architectureHeading: 'Arquitetura do sistema',
      architectureSummary:
        'Backend estruturado em quatro camadas (presentation, application, core.domain e infrastructure), isolando regras de negócio da borda HTTP, segurança JWT, banco PostgreSQL e storage S3.',
      architectureAria:
        'Diagrama de arquitetura do Newgram: frontend Angular 19 com cliente gerado via OpenAPI comunica-se via REST e JWT com o backend Spring Boot em camadas, que persiste dados no PostgreSQL versionado por Flyway e entrega mídias via presigned URLs do AWS S3.',
      decisionsHeading: 'Decisões técnicas e trade-offs',
      decisions: [
        {
          title: 'JWT com rotação de refresh token',
          rationale:
            'Access tokens curtos (15 min) combinados a refresh tokens de 7 dias com rotação e rejeição de reuso, acompanhados de testes dedicados para o fluxo de renovação.'
        },
        {
          title: 'Entrega de mídia via presigned URLs no AWS S3',
          rationale:
            'Evita expor objetos diretamente como públicos ou sobrecarregar a API como proxy de binários, com expiração configurável (60 min) e suporte a storage S3-compatível como MinIO em ambiente local.'
        },
        {
          title: 'Cliente frontend gerado do contrato OpenAPI',
          rationale:
            'O uso do ng-openapi-gen a partir do springdoc-openapi garante tipagem ponta a ponta entre DTOs Java e componentes Angular.'
        },
        {
          title: 'Evolução controlada de schema e container enxuto',
          rationale:
            'Migrations versionadas com Flyway no PostgreSQL, ajuste de pool Hikari e batch inserts JPA, empacotados em build Docker multi-stage (Maven → Temurin JRE Alpine).'
        }
      ],
      sections: [
        {
          heading: 'Domínio modelado',
          items: [
            'Feed com múltiplas estratégias de descoberta: perfis seguidos, populares, tendências, recomendados e por localização.',
            'Publicações com mídia, curtidas, comentários, hashtags, arquivamento e organização em coleções de salvos.',
            'Stories com expiração e destaques no perfil, grafo de seguidores com sugestões em comum e notificações de interação.',
            'Busca paginada de publicações por legenda e de usuários por nome ou username, além de documentação interativa no Swagger UI.'
          ]
        }
      ],
      techs: [
        'Java 21',
        'Spring Boot 3.5',
        'Spring Security',
        'Angular 19',
        'TypeScript',
        'RxJS',
        'PostgreSQL',
        'Flyway',
        'JWT',
        'AWS S3',
        'OpenAPI',
        'Docker'
      ],
      url: 'https://github.com/JamesonHenrique/Newgram',
      demo: 'https://newgram-nine.vercel.app/',
      nextSlug: 'oportunizavaga'
    }
  }
};
