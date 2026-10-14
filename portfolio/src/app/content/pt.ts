import { SiteContent } from './types';

// Source of truth for facts: the CV (public/JAMESON_HENRIQUE_CV.pdf) and each project's README.
// Keep en.ts as a faithful translation of this file.
export const PT: SiteContent = {
  lang: 'pt',
  htmlLang: 'pt-BR',
  ogLocale: 'pt_BR',
  home: '/',
  otherHome: '/en',
  switchLabel: 'EN',
  switchAria: 'Read in English',
  meta: {
    title: 'Jameson Henrique | Automação (RPA) e Full Stack',
    description:
      'Jameson Henrique, desenvolvedor de automação (RPA) e full stack. Automações em produção com Make, APIs REST e webhooks; sistemas com Java, Spring Boot e Angular.'
  },
  skipLink: 'Pular para o conteúdo',
  nav: {
    aria: 'Seções',
    inicio: 'Início',
    sobre: 'Sobre',
    skills: 'Stack',
    projetos: 'Projetos',
    contato: 'Contato',
    rodape: 'Rodapé'
  },
  hero: {
    availability: 'Disponível para vagas de automação (RPA) e full stack',
    badge: 'automação (rpa) & full stack',
    lines: [
      [
        { text: 'Automações em produção com ' },
        { text: 'Make', hl: 'strong' },
        { text: ', ' },
        { text: 'APIs REST', hl: 'strong' },
        { text: ' e ' },
        { text: 'webhooks', hl: 'strong' },
        { text: '.' }
      ],
      [
        { text: 'Sistemas com ' },
        { text: 'Spring Boot', hl: 'strong' },
        { text: ' e ' },
        { text: 'Angular', hl: 'strong' },
        { text: '.' }
      ]
    ],
    projectsButton: 'VER PROJETOS',
    cvButton: 'BAIXAR CV'
  },
  about: {
    title: 'SOBRE MIM',
    photoAlt: 'Jameson Henrique',
    paragraphs: [
      [
        { text: 'Sou Jameson Henrique, desenvolvedor de automação e full stack. Aplico engenharia de software à ' },
        { text: 'automação e integração de sistemas', hl: 'strong' },
        { text: ', unindo uma base sólida em ' },
        { text: '(Spring Boot)', hl: 'strong' },
        { text: ' e ' },
        { text: '(Angular)', hl: 'strong' },
        { text: ' ao dia a dia de orquestrar processos críticos de negócio.' }
      ],
      [
        { text: 'Atuo no setor de LegalOps de um escritório de advocacia, mantendo em produção fluxos que conectam ' },
        { text: 'back-end e APIs REST', hl: 'tech' },
        { text: ' a ' },
        { text: 'webhooks e serviços de terceiros', hl: 'tech' },
        { text: ', do lead à assinatura de contrato e ao cadastro processual.' }
      ],
      [
        { text: 'Meu foco é ' },
        { text: 'automação que não quebra sozinha', hl: 'underline' },
        {
          text: ', visibilidade para quem opera e cuidado com o dado do cliente, com depuração de integração no nível do payload, do header e do contrato de dados.'
        }
      ]
    ],
    educationTitle: 'FORMAÇÃO',
    education: [
      {
        heading: 'Bacharelado em Tecnologia da Informação',
        sub: 'Universidade Federal do Rio Grande do Norte - 2026-2030 (Em andamento)',
        text: [
          {
            text: 'Formação superior voltada para o desenvolvimento de soluções tecnológicas, gestão de infraestrutura de TI e engenharia de software.'
          }
        ]
      },
      {
        heading: 'Certificações',
        list: [
          'Spring 6 & Spring Boot 3 for Beginners (Udemy)',
          'Angular e Spring Boot (loiane.training)',
          'Angular (loiane.training)'
        ]
      },
      {
        heading: 'Idiomas',
        text: [{ text: 'Português (nativo) · Inglês (intermediário, B1) · Espanhol (básico, A2)' }]
      }
    ],
    careerTitle: 'CARREIRA',
    career: [
      {
        heading: 'Estagiário em Desenvolvimento de Automação (RPA) — LegalOps',
        sub: 'Duarte e Almeida Advogados (08/2026 - Atual)',
        text: [
          {
            text: 'Mantenho e depuro os fluxos em produção que levam o cliente do primeiro contato ao contrato assinado e cadastrado no sistema jurídico, integrando por API REST e webhooks: '
          },
          { text: 'Make, n8n, ADVBOX, Coda, Octadesk, ZapSign, Google Workspace e Gemini', hl: 'plain' },
          { text: '.' }
        ]
      },
      {
        heading: 'Desenvolvedor Full Stack — Freelancer',
        sub: 'Painel de Máquinas (06/2025 - 07/2025)',
        text: [
          {
            text: 'Desenvolvi sozinho o sistema completo, em uso pelo cliente no chão de fábrica. Substituiu a conferência manual: a equipe vê em tempo real quais máquinas estão paradas, em operação, em manutenção ou sem operador. Feito com '
          },
          { text: 'Java, Spring Boot, Angular e MongoDB', hl: 'plain' },
          { text: '.' }
        ]
      }
    ]
  },
  skills: { title: 'STACK', systemsTitle: 'SISTEMAS QUE JÁ INTEGREI' },
  projects: {
    title: 'PROJETOS',
    decisionLabel: 'Decisão técnica:',
    demo: 'Ver demo',
    code: 'Ver código',
    details: 'Detalhes',
    more: 'VER MAIS PROJETOS',
    techsAria: 'Tecnologias',
    screenshotOf: 'Tela do',
    cards: [
      {
        title: 'OPORTUNIZAVAGA',
        name: 'Agente open-source de candidatura a vagas',
        description:
          'Busca, filtra e se candidata a vagas em portais brasileiros usando modelos de IA gratuitos e um navegador real, com custo zero de operação. Roda sem supervisão: reinicia sozinho, guarda o histórico fora da IA, troca entre seis provedores de IA quando um atinge o limite e nunca inventa dado do candidato.',
        techs: ['Python', 'Shell', 'Node.js', 'Chrome (CDP)', 'LLMs', 'GitHub Actions', 'Docker'],
        image: 'oportunizavaga_print.webp',
        page: '/projetos/oportunizavaga',
        decision:
          'Um supervisor idempotente roda a cada 5 minutos e religa o loop e o Chrome se caírem; o estado fica em JSON durável, fora da IA.',
        url: 'https://github.com/JamesonHenrique/OportunizaVaga',
        demo: 'https://oportunizavaga-demo.vercel.app'
      },
      {
        title: 'PAINEL DE MÁQUINAS',
        name: 'Monitoramento de equipamentos em tempo real',
        description:
          'Sistema completo (backend e frontend) em uso pelo cliente no chão de fábrica. Substituiu a conferência manual: a equipe vê em tempo real quais máquinas estão paradas, em operação, em manutenção ou sem operador.',
        techs: ['Java', 'Spring Boot', 'Angular', 'TypeScript', 'MongoDB', 'RxJS', 'Tailwind CSS'],
        image: 'painel-de-maquinas_print.webp',
        note: 'Projeto freelance: código do cliente, não público.'
      },
      {
        title: 'NEWGRAM',
        name: 'Rede social full stack',
        description:
          'Compartilhamento de fotos e stories com feed com descoberta, seguidores, favoritos e destaques. Autenticação JWT e upload de imagens no S3.',
        techs: [
          'Java',
          'Spring Boot',
          'Angular',
          'TypeScript',
          'PostgreSQL',
          'JWT',
          'AWS S3',
          'Docker',
          'Flyway',
          'Tailwind CSS'
        ],
        image: 'newgram_print.webp',
        page: '/projetos/newgram',
        decision:
          'Mídia no AWS S3 entregue por presigned URLs com expiração configurável; schema versionado com Flyway.',
        url: 'https://github.com/JamesonHenrique/Newgram',
        demo: 'https://newgram-nine.vercel.app/'
      },
      {
        title: 'ALGAMONEY',
        name: 'Gestão financeira pessoal',
        description: 'Controle de receitas e despesas com dashboard e relatórios.',
        techs: ['Java', 'Spring Boot', 'Angular', 'PostgreSQL', 'JWT', 'JasperReports', 'Chart.js'],
        image: 'algamoney_print.webp',
        url: 'https://github.com/JamesonHenrique/Algamoney'
      },
      {
        title: 'WAVECHAT',
        name: 'Chat em tempo real',
        description: 'Mensagens instantâneas via WebSocket, com autenticação pelo Keycloak.',
        techs: ['Java', 'Spring Boot', 'Angular', 'WebSocket', 'PostgreSQL', 'Keycloak', 'Docker'],
        image: 'wavechat_print.webp',
        url: 'https://github.com/JamesonHenrique/WaveChat'
      },
      {
        title: 'BOOKLORE',
        name: 'Biblioteca pessoal',
        description: 'Coleção de livros com autenticação por e-mail e sistema de empréstimos.',
        techs: ['Java', 'Spring Boot', 'Angular', 'PostgreSQL', 'JWT', 'Docker'],
        image: 'booklore_print.webp',
        url: 'https://github.com/JamesonHenrique/BookLore'
      }
    ]
  },
  contact: {
    title: 'VAMOS CONVERSAR',
    cardTitle: 'VAMOS CONVERSAR SOBRE O SEU PROCESSO',
    text: 'Aberto a vagas de automação (RPA) e desenvolvimento full stack, e a projetos freelance de integração e automação de processos.',
    email: 'EMAIL',
    phone: 'TELEFONE',
    location: 'LOCALIZAÇÃO',
    locationValue: 'Rio Grande do Norte, Brasil',
    social: 'CONECTE-SE COMIGO',
    form: {
      name: 'Seu Nome',
      namePlaceholder: 'Como posso te chamar?',
      email: 'Seu Email',
      emailPlaceholder: 'Seu melhor email',
      subject: 'Assunto',
      subjectPlaceholder: 'Sobre o que vamos conversar?',
      message: 'Sua Mensagem',
      messagePlaceholder: 'Conte-me sobre seu projeto...',
      send: 'ENVIAR MENSAGEM',
      sending: 'ENVIANDO...',
      sent: 'Mensagem enviada. Respondo pelo e-mail que você informou.',
      error: 'Não consegui enviar agora. Escreva direto para'
    }
  },
  footer: {
    quote: '"Não é a linguagem de programação que define o programador, mas sim sua lógica."',
    rights: 'Todos os direitos reservados.'
  },
  projectPage: { back: '← Voltar aos projetos', stack: 'Stack', code: 'Ver código no GitHub', demo: 'Abrir a demo' },
  pages: {
    oportunizavaga: {
      slug: 'oportunizavaga',
      title: 'OportunizaVaga',
      name: 'Agente open-source de candidatura a vagas',
      metaDescription:
        'OportunizaVaga: agente open-source que busca, filtra e se candidata a vagas em portais brasileiros com modelos de IA gratuitos e um navegador real. Projeto de Jameson Henrique.',
      image: 'oportunizavaga_print.webp',
      imageAlt: 'Monitor do OportunizaVaga na demo com dados fictícios: candidaturas enviadas e cadência por fonte',
      intro: [
        'Agente que busca, filtra e se candidata a vagas em portais brasileiros usando modelos de IA gratuitos e um navegador real, com custo zero de operação. É configurável para qualquer área e nível.',
        'Foi projetado para rodar sem supervisão: reinicia sozinho se cair, guarda o histórico fora da IA, troca automaticamente entre seis provedores de IA quando um atinge o limite de uso e nunca inventa dado do candidato.'
      ],
      sections: [
        {
          heading: 'Como funciona',
          items: [
            'Um cron a cada 5 minutos chama um supervisor idempotente, que sobe o loop e o Chrome (via CDP) se algum deles tiver caído.',
            'Cada rodada visita 1 site de um rodízio circular (Indeed, LinkedIn, Gupy, Programathor, GeekHunter…) e dorme 20 minutos entre rodadas, com backoff quando não há vaga nova.',
            'O estado fica em arquivos JSON por perfil, nunca na sessão do modelo de IA.',
            'Os dados do candidato vêm de um arquivo próprio; o que falta vira um bloqueio com o motivo exato, em vez de ser inventado.',
            'Um monitor opcional na Vercel mostra o funil e a operação, com telemetria agregada por padrão.'
          ]
        },
        {
          heading: 'Decisões técnicas',
          items: [
            'Supervisor idempotente em vez de processo único: qualquer falha é recuperada na próxima execução do cron.',
            'Cascata de modelos gratuitos (Zen, OpenRouter, NVIDIA, Groq, Cerebras, HF): ao bater no limite de uso de um, passa para o próximo e volta ao preferido automaticamente.',
            'Instância única garantida por lock de arquivo, para duas rodadas nunca disputarem o mesmo navegador.'
          ]
        },
        {
          heading: 'Qualidade',
          items: ['Testes automatizados, CI com varredura de segredos e versões para Linux e Windows.']
        }
      ],
      techs: ['Python', 'Shell', 'Node.js', 'Chrome (CDP)', 'LLMs', 'GitHub Actions', 'Docker'],
      url: 'https://github.com/JamesonHenrique/OportunizaVaga',
      demo: 'https://oportunizavaga-demo.vercel.app'
    },
    newgram: {
      slug: 'newgram',
      title: 'Newgram',
      name: 'Rede social full stack',
      metaDescription:
        'Newgram: rede social full stack com Spring Boot e Angular, autenticação JWT, upload de mídia no AWS S3 e feed com descoberta. Projeto de Jameson Henrique.',
      image: 'newgram_print.webp',
      imageAlt: 'Feed do Newgram com posts e sugestões de criadores',
      intro: [
        'Rede social inspirada no Instagram, construída como um projeto full stack completo: back-end em Spring Boot com arquitetura em camadas e front-end Angular que consome uma API gerada a partir do contrato OpenAPI.',
        'A ideia foi ir além do CRUD e modelar um domínio social real: posts, stories, destaques, seguidores, curtidas, comentários, hashtags, notificações e coleções de salvos.'
      ],
      sections: [
        {
          heading: 'Funcionalidades',
          items: [
            'Autenticação JWT com access token e refresh token, e filtros de segurança próprios.',
            'Feed com descoberta: quem você segue, populares, em alta, recomendados e por localização.',
            'Busca de posts por legenda e de usuários por nome, com paginação.',
            'Stories e destaques, seguidores, sugestões de quem seguir, comentários, curtidas e notificações.',
            'Documentação da API com Swagger (OpenAPI 3).'
          ]
        },
        {
          heading: 'Decisões técnicas',
          items: [
            'Mídia no AWS S3, entregue por presigned URLs com expiração configurável.',
            'Schema do PostgreSQL versionado com Flyway.',
            'Back-end em camadas, isolando regra de negócio de framework e infraestrutura.'
          ]
        }
      ],
      techs: [
        'Java',
        'Spring Boot',
        'Angular',
        'TypeScript',
        'PostgreSQL',
        'JWT',
        'AWS S3',
        'Docker',
        'Flyway',
        'Tailwind CSS'
      ],
      url: 'https://github.com/JamesonHenrique/Newgram',
      demo: 'https://newgram-nine.vercel.app/'
    }
  }
};
