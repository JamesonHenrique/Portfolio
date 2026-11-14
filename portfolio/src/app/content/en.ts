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
    title: 'Jameson Henrique | Full Stack Developer at Wolfacilitates',
    description:
      'Full Stack Developer and Technology Lead at Wolfacilitates C&M. IT student at UFRN with a background in Java, Spring Boot, Angular and TypeScript.'
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
    availability: 'Full Stack Developer at Wolfacilitates C&M',
    badge: 'full stack · TypeScript · Java · Angular',
    lines: [
      [{ text: 'API development with ' }, { text: 'Java and Spring Boot', hl: 'strong' }, { text: '.' }],
      [
        { text: 'Interfaces with ' },
        { text: 'Angular and TypeScript', hl: 'strong' },
        { text: '; previous experience with automation and integrations.' }
      ]
    ],
    projectsButton: 'SEE PROJECTS',
    cvButton: 'RESUME (PT)'
  },
  about: {
    title: 'ABOUT ME',
    photoAlt: 'Photo of Jameson Henrique',
    intro:
      "I'm a software developer and Information Technology student at IMD/UFRN. I enjoy turning real needs into useful, easy-to-use digital solutions.",
    detail:
      'I focus on development with Java, Spring Boot, Angular and TypeScript, and also have experience with automation and systems integration.',
    educationLabel: 'EDUCATION',
    education: "Bachelor's in Information Technology · UFRN",
    workLabel: 'CURRENT ROLE',
    work: 'Full Stack Developer and Technology Lead · Wolfacilitates C&M · since Oct 2026',
    workDetail: 'Planning web applications, internal systems, CRM and integrations.',
    experienceLabel: 'EXPERIENCE',
    pastRoles: [
      {
        role: 'Automation and integrations · Duarte e Almeida · Aug–Oct 2026',
        detail: 'Production integrations and 30 workflows converted and validated.'
      },
      {
        role: 'Freelance Full Stack · Machine Dashboard · Jun–Jul 2025',
        detail: 'Machine monitoring system used by the client.'
      }
    ],
    cvLink: 'Download résumé'
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
          'An open-source project that searches, filters and automates job applications on Brazilian job boards using AI and a real browser. It keeps state outside the model and uses configurable filters; its documentation recommends checking each portal’s terms and discourages mass applications.',
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
    text: 'Currently at Wolfacilitates C&M. Let’s talk about software development, integrations and technology.',
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
        'OportunizaVaga: open-source job search and application automation with AI and a real browser, configurable filters and responsible-use documentation. A project by Jameson Henrique.',
      image: 'oportunizavaga_print.webp',
      imageAlt: 'OportunizaVaga monitor in the demo with fictitious data: applications sent and cadence by source',
      intro: [
        'An open-source project that searches, filters and automates job applications on Brazilian job boards using AI and a real browser. Scope and filters come from local configuration; the model does not make up candidate data.',
        'The README warns that automation may violate job-board terms and recommends checking each portal’s rules before enabling it. The project documents usage limits and discourages mass applications.'
      ],
      sections: [
        {
          heading: 'How it works',
          items: [
            'A cron job every 5 minutes calls an idempotent supervisor, which starts the loop and Chrome (via CDP) if either of them is down.',
            'Each round visits one configured site and waits between rounds, backing off when there are no new jobs; check a portal’s terms before enabling automation there.',
            "State is kept in JSON files per profile, never in the AI model's session.",
            'Candidate data comes from a dedicated file; anything missing becomes a block with the exact reason instead of being made up.',
            'An optional monitor on Vercel shows the funnel and operations, with aggregated telemetry by default.'
          ]
        },
        {
          heading: 'Technical decisions',
          items: [
            'An idempotent supervisor instead of a single long-running process: any failure is recovered on the next cron run.',
            'A configurable provider cascade: when one reaches its usage limit, it tries the next and returns to the preferred provider automatically.',
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
