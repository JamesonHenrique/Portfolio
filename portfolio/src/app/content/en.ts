import { SiteContent } from './types';

// Faithful translation of pt.ts. Do not add claims or numbers that are not in the CV.
export const EN: SiteContent = {
  lang: 'en',
  htmlLang: 'en',
  ogLocale: 'en_US',
  home: '/en',
  otherHome: '/',
  switchLabel: 'PT',
  switchAria: 'Ler em português',
  meta: {
    title: 'Jameson Henrique | Automation (RPA) & Full Stack Developer',
    description:
      'Jameson Henrique, automation (RPA) and full stack developer. Production automations with Make, REST APIs and webhooks; systems with Java, Spring Boot and Angular.'
  },
  skipLink: 'Skip to content',
  nav: {
    aria: 'Sections',
    inicio: 'Home',
    sobre: 'About',
    skills: 'Stack',
    projetos: 'Projects',
    contato: 'Contact',
    rodape: 'Footer'
  },
  hero: {
    availability: 'Open to automation (RPA) and full stack roles',
    badge: 'automation (rpa) & full stack',
    lines: [
      [
        { text: 'Production automations with ' },
        { text: 'Make', hl: 'strong' },
        { text: ', ' },
        { text: 'REST APIs', hl: 'strong' },
        { text: ' and ' },
        { text: 'webhooks', hl: 'strong' },
        { text: '.' }
      ],
      [
        { text: 'Systems built with ' },
        { text: 'Spring Boot', hl: 'strong' },
        { text: ' and ' },
        { text: 'Angular', hl: 'strong' },
        { text: '.' }
      ]
    ],
    projectsButton: 'SEE PROJECTS',
    cvButton: 'RESUME (PT)'
  },
  about: {
    title: 'ABOUT ME',
    photoAlt: 'Jameson Henrique',
    paragraphs: [
      [
        { text: "I'm Jameson Henrique, an automation and full stack developer. I apply software engineering to " },
        { text: 'process automation and systems integration', hl: 'strong' },
        { text: ', combining a solid foundation in ' },
        { text: '(Spring Boot)', hl: 'strong' },
        { text: ' and ' },
        { text: '(Angular)', hl: 'strong' },
        { text: ' with the daily work of orchestrating business-critical processes.' }
      ],
      [
        { text: 'I work in the LegalOps team of a law firm, keeping production workflows running that connect ' },
        { text: 'back-end and REST APIs', hl: 'tech' },
        { text: ' to ' },
        { text: 'webhooks and third-party services', hl: 'tech' },
        { text: ', from the first lead to the signed contract and the case registration.' }
      ],
      [
        { text: 'My focus is ' },
        { text: "automation that doesn't break on its own", hl: 'underline' },
        {
          text: ', visibility for the people who operate it and care with client data, debugging integrations down to the payload, the headers and the data contract.'
        }
      ]
    ],
    educationTitle: 'EDUCATION',
    education: [
      {
        heading: "Bachelor's in Information Technology",
        sub: 'Federal University of Rio Grande do Norte (UFRN) - 2026-2030 (in progress)',
        text: [
          {
            text: 'Degree focused on building technology solutions, IT infrastructure management and software engineering.'
          }
        ]
      },
      {
        heading: 'Certifications',
        list: [
          'Spring 6 & Spring Boot 3 for Beginners (Udemy)',
          'Angular e Spring Boot (loiane.training)',
          'Angular (loiane.training)'
        ]
      },
      {
        heading: 'Languages',
        text: [{ text: 'Portuguese (native) · English (intermediate, B1) · Spanish (basic, A2)' }]
      }
    ],
    careerTitle: 'EXPERIENCE',
    career: [
      {
        heading: 'Automation Development Intern (RPA) — LegalOps',
        sub: 'Duarte e Almeida Advogados (08/2026 - Present)',
        text: [
          {
            text: 'I maintain and debug the production workflows that take a client from first contact to a signed contract registered in the legal case system, integrating via REST APIs and webhooks: '
          },
          { text: 'Make, n8n, ADVBOX, Coda, Octadesk, ZapSign, Google Workspace and Gemini', hl: 'plain' },
          { text: '.' }
        ]
      },
      {
        heading: 'Full Stack Developer — Freelance',
        sub: 'Machine Dashboard (06/2025 - 07/2025)',
        text: [
          {
            text: 'I built the whole system on my own, and the client uses it on the factory floor. It replaced manual checks: the team sees in real time which machines are stopped, running, under maintenance or without an operator. Built with '
          },
          { text: 'Java, Spring Boot, Angular and MongoDB', hl: 'plain' },
          { text: '.' }
        ]
      }
    ]
  },
  skills: { title: 'STACK', systemsTitle: "SYSTEMS I'VE INTEGRATED" },
  projects: {
    title: 'PROJECTS',
    decisionLabel: 'Technical decision:',
    demo: 'Live demo',
    code: 'View code',
    details: 'Details',
    more: 'MORE PROJECTS',
    techsAria: 'Technologies',
    screenshotOf: 'Screenshot of',
    cards: [
      {
        title: 'OPORTUNIZAVAGA',
        name: 'Open-source job application agent',
        description:
          'Searches, filters and applies to jobs on Brazilian job boards using free AI models and a real browser, at zero running cost. Runs unattended: restarts itself, keeps history outside the AI, switches between six AI providers when one hits its limit, and never makes up candidate data.',
        techs: ['Python', 'Shell', 'Node.js', 'Chrome (CDP)', 'LLMs', 'GitHub Actions', 'Docker'],
        image: 'oportunizavaga_print.webp',
        page: '/en/projects/oportunizavaga',
        decision:
          'An idempotent supervisor runs every 5 minutes and restarts the loop and Chrome if they crash; state lives in durable JSON, outside the AI.',
        url: 'https://github.com/JamesonHenrique/OportunizaVaga',
        demo: 'https://oportunizavaga-demo.vercel.app'
      },
      {
        title: 'MACHINE DASHBOARD',
        name: 'Real-time equipment monitoring',
        description:
          'Complete system (backend and frontend) used by the client on the factory floor. It replaced manual checks: the team sees in real time which machines are stopped, running, under maintenance or without an operator.',
        techs: ['Java', 'Spring Boot', 'Angular', 'TypeScript', 'MongoDB', 'RxJS', 'Tailwind CSS'],
        image: 'painel-de-maquinas_print.webp',
        note: "Freelance project: the code belongs to the client and isn't public."
      },
      {
        title: 'NEWGRAM',
        name: 'Full stack social network',
        description:
          'Photo and story sharing with a discovery feed, followers, saved collections and highlights. JWT authentication and image upload to S3.',
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
        page: '/en/projects/newgram',
        decision:
          'Media on AWS S3 served through presigned URLs with configurable expiration; schema versioned with Flyway.',
        url: 'https://github.com/JamesonHenrique/Newgram',
        demo: 'https://newgram-nine.vercel.app/'
      },
      {
        title: 'ALGAMONEY',
        name: 'Personal finance management',
        description: 'Income and expense tracking with a dashboard and reports.',
        techs: ['Java', 'Spring Boot', 'Angular', 'PostgreSQL', 'JWT', 'JasperReports', 'Chart.js'],
        image: 'algamoney_print.webp',
        url: 'https://github.com/JamesonHenrique/Algamoney'
      },
      {
        title: 'WAVECHAT',
        name: 'Real-time chat',
        description: 'Instant messaging over WebSocket, with authentication through Keycloak.',
        techs: ['Java', 'Spring Boot', 'Angular', 'WebSocket', 'PostgreSQL', 'Keycloak', 'Docker'],
        image: 'wavechat_print.webp',
        url: 'https://github.com/JamesonHenrique/WaveChat'
      },
      {
        title: 'BOOKLORE',
        name: 'Personal library',
        description: 'Book collection with e-mail authentication and a lending system.',
        techs: ['Java', 'Spring Boot', 'Angular', 'PostgreSQL', 'JWT', 'Docker'],
        image: 'booklore_print.webp',
        url: 'https://github.com/JamesonHenrique/BookLore'
      }
    ]
  },
  contact: {
    title: "LET'S TALK",
    cardTitle: "LET'S TALK ABOUT YOUR PROCESS",
    text: 'Open to automation (RPA) and full stack development roles, and to freelance projects in integration and process automation.',
    email: 'EMAIL',
    phone: 'PHONE',
    location: 'LOCATION',
    locationValue: 'Rio Grande do Norte, Brazil',
    social: 'CONNECT WITH ME',
    form: {
      name: 'Your Name',
      namePlaceholder: 'What should I call you?',
      email: 'Your Email',
      emailPlaceholder: 'Your best email',
      subject: 'Subject',
      subjectPlaceholder: 'What would you like to talk about?',
      message: 'Your Message',
      messagePlaceholder: 'Tell me about your project...',
      send: 'SEND MESSAGE',
      sending: 'SENDING...',
      sent: "Message sent. I'll reply to the email you provided.",
      error: "Couldn't send it right now. Write directly to"
    }
  },
  footer: {
    quote: '"It is not the programming language that defines the programmer, but their logic."',
    rights: 'All rights reserved.'
  },
  projectPage: { back: '← Back to projects', stack: 'Stack', code: 'View code on GitHub', demo: 'Open the live demo' },
  pages: {
    oportunizavaga: {
      slug: 'oportunizavaga',
      title: 'OportunizaVaga',
      name: 'Open-source job application agent',
      metaDescription:
        'OportunizaVaga: open-source agent that searches, filters and applies to jobs on Brazilian job boards with free AI models and a real browser. A project by Jameson Henrique.',
      image: 'oportunizavaga_print.webp',
      imageAlt: 'OportunizaVaga monitor in the demo with fictitious data: applications sent and cadence by source',
      intro: [
        'An agent that searches, filters and applies to jobs on Brazilian job boards using free AI models and a real browser, at zero running cost. It can be configured for any field and seniority level.',
        'It was designed to run unattended: it restarts itself if it crashes, keeps history outside the AI, automatically switches between six AI providers when one hits its usage limit, and never makes up candidate data.'
      ],
      sections: [
        {
          heading: 'How it works',
          items: [
            'A cron job every 5 minutes calls an idempotent supervisor, which starts the loop and Chrome (via CDP) if either of them is down.',
            'Each round visits 1 site from a circular rotation (Indeed, LinkedIn, Gupy, Programathor, GeekHunter…) and sleeps 20 minutes between rounds, backing off when there are no new jobs.',
            "State is kept in JSON files per profile, never in the AI model's session.",
            'Candidate data comes from a dedicated file; anything missing becomes a block with the exact reason instead of being made up.',
            'An optional monitor on Vercel shows the funnel and operations, with aggregated telemetry by default.'
          ]
        },
        {
          heading: 'Technical decisions',
          items: [
            'An idempotent supervisor instead of a single long-running process: any failure is recovered on the next cron run.',
            'A cascade of free models (Zen, OpenRouter, NVIDIA, Groq, Cerebras, HF): when one hits its usage limit it moves to the next, and returns to the preferred one automatically.',
            'A single instance enforced by a file lock, so two rounds never fight over the same browser.'
          ]
        },
        {
          heading: 'Quality',
          items: ['Automated tests, CI with secret scanning, and versions for Linux and Windows.']
        }
      ],
      techs: ['Python', 'Shell', 'Node.js', 'Chrome (CDP)', 'LLMs', 'GitHub Actions', 'Docker'],
      url: 'https://github.com/JamesonHenrique/OportunizaVaga',
      demo: 'https://oportunizavaga-demo.vercel.app'
    },
    newgram: {
      slug: 'newgram',
      title: 'Newgram',
      name: 'Full stack social network',
      metaDescription:
        'Newgram: full stack social network with Spring Boot and Angular, JWT authentication, media upload to AWS S3 and a discovery feed. A project by Jameson Henrique.',
      image: 'newgram_print.webp',
      imageAlt: 'Newgram feed with posts and creator suggestions',
      intro: [
        'An Instagram-inspired social network built as a complete full stack project: a layered Spring Boot back end and an Angular front end that consumes an API generated from the OpenAPI contract.',
        'The goal was to go beyond CRUD and model a real social domain: posts, stories, highlights, followers, likes, comments, hashtags, notifications and saved collections.'
      ],
      sections: [
        {
          heading: 'Features',
          items: [
            'JWT authentication with access and refresh tokens, and custom security filters.',
            'Discovery feed: people you follow, popular, trending, recommended and by location.',
            'Search posts by caption and users by name, with pagination.',
            'Stories and highlights, followers, who-to-follow suggestions, comments, likes and notifications.',
            'API documentation with Swagger (OpenAPI 3).'
          ]
        },
        {
          heading: 'Technical decisions',
          items: [
            'Media on AWS S3, served through presigned URLs with configurable expiration.',
            'PostgreSQL schema versioned with Flyway.',
            'Layered back end that isolates business rules from framework and infrastructure.'
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
