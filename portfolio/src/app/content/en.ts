import { SiteContent } from './types';

// Faithful translation of pt.ts. Source of truth: tools/cv-portfolio.md and project READMEs.
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
      'Full Stack Developer and Technology Lead at Wolfacilitates C&M. Pursuing a bachelor’s degree in Information Technology at IMD/UFRN, with a background in Java, Spring Boot, Angular, TypeScript and systems automation.'
  },
  skipLink: 'Skip to content',
  nav: {
    aria: 'Primary navigation',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    inicio: 'Home',
    projetos: 'Work',
    sobre: 'About',
    experiencia: 'Experience',
    skills: 'Capabilities',
    contato: 'Contact'
  },
  hero: {
    headline: 'Beyond the click lives code.',
    titleLine1: 'Beyond',
    titleLine2: 'the click',
    titleLine3: 'lives code.',
    subhead: 'I design interfaces and build what makes them run — APIs, automations and digital products.',
    subheadPre: 'I design interfaces and build ',
    subheadEm: 'what makes them run',
    subheadPost: ' — APIs, automations and digital products.',
    projectsButton: 'View selected work',
    cvButton: 'Resume (PDF · PT)',
    deckCaption: 'Portfolio in three proofs',
    deckBadge: 'Switch work',
    prevProject: 'Previous project',
    nextProject: 'Next project',
    openCase: 'Open case study',
    panelLabel: 'Selected systems',
    panelHint: 'Choose a project to open its case study',
    panelCta: 'Read case study',
    panelDecisionLabel: 'Key decision'
  },
  ribbon: ['REAL APPLICATIONS', 'INTERFACES', 'SYSTEMS', 'AUTOMATION'],
  intro: {
    label: '01 / How I work',
    headlinePre: 'Looking ',
    headlineEm: 'finished',
    headlinePost: ' is not enough. It has to solve something.',
    noteLabel: 'FROM PROBLEM TO OPERATION',
    noteText:
      'I care about the part where an idea meets real usage: flows, integrations, failures, people. That is where software has to make sense.'
  },
  projects: {
    index: '02',
    kicker: 'Selected work',
    sectionLabel: '02 / Selected work',
    title: 'In production.',
    headingTop: 'In',
    headingEm: 'production.',
    lead: 'Three projects. Three different problems. Deeper context inside each case — less noise here.',
    decisionLabel: 'Technical decision',
    readCase: 'Read case study',
    proofPrefix: 'JH / PROOF',
    viewCode: 'View on GitHub',
    privateLabel: 'Client work · View scope',
    demo: 'Live demo',
    code: 'GitHub',
    techsAria: 'Technologies used',
    archiveTitle: 'More repositories',
    archiveLead: 'Additional full stack study and exploration projects published on GitHub.',
    archiveMore: 'Browse all repositories on GitHub',
    flagships: [
      {
        index: '01',
        slug: 'oportunizavaga',
        title: 'OportunizaVaga',
        titlePre: 'Oportuniza',
        titleEm: 'Vaga.',
        subtitle: 'Open-source job search and application agent with durable state',
        category: 'AUTOMATION · 2026',
        period: '2026',
        description:
          'Open-source tool that searches, filters and organizes applications on Brazilian job boards using AI models and a real browser via Chrome DevTools Protocol, paired with a zero-DB status monitor.',
        shortSummary: 'Automating without losing control: job discovery, filtering and execution monitoring.',
        decision:
          'Idempotent 5-minute cron supervisor with exclusive file locking and durable JSON state kept strictly outside the model session.',
        focusLine: 'PROJECT FOCUS / DURABLE STATE · RETRIES · MONITORING',
        frameTag: 'NOT A MOCKUP',
        chapterTone: 'gold',
        techs: ['Python', 'Shell', 'Node.js', 'Chrome (CDP)', 'LLMs', 'GitHub Actions'],
        image: 'oportunizavaga_print.webp',
        imageWidth: 960,
        imageHeight: 600,
        imageAlt:
          'OportunizaVaga monitor demo with fictitious data showing sent applications and daily cadence by source',
        page: '/en/projects/oportunizavaga',
        url: 'https://github.com/JamesonHenrique/OportunizaVaga',
        demo: 'https://oportunizavaga-demo.vercel.app'
      },
      {
        index: '02',
        slug: 'painel-de-maquinas',
        title: 'Machine Dashboard',
        titlePre: 'Machine',
        titleEm: 'Dashboard.',
        subtitle: 'Real-time factory-floor equipment monitoring',
        category: 'INDUSTRY · 2025',
        period: 'Jun–Jul 2025',
        description:
          'End-to-end web application (backend and frontend) delivered for daily factory-floor operations, replacing manual rounds with immediate visibility into each machine’s operational state.',
        shortSummary: 'Direct visibility into equipment status without relying on manual floor checks.',
        decision:
          'Direct four-state operational modeling (running, stopped, maintenance, no operator) with continuous updates designed for quick floor-level scanning.',
        focusLine: 'FREELANCE / LIMITED PUBLIC DETAILS · PRIVATE CODE',
        frameTag: 'SCREEN SAMPLE',
        chapterTone: 'green',
        techs: ['Java', 'Spring Boot', 'Angular', 'TypeScript', 'MongoDB', 'RxJS'],
        image: 'painel-de-maquinas_print.webp',
        imageWidth: 1200,
        imageHeight: 579,
        imageAlt: 'Web monitoring dashboard showing summary counts and individual machine status cards',
        page: '/en/projects/painel-de-maquinas',
        privateNote: 'Proprietary client code; case study covers authorized scope and architecture only.'
      },
      {
        index: '03',
        slug: 'newgram',
        title: 'Newgram',
        titlePre: 'Newgram.',
        titleEm: '',
        subtitle: 'Contract-driven full stack social network',
        category: 'FULL STACK · 2025—26',
        period: '2025–2026',
        description:
          'Full social platform with discovery feeds, stories, highlights, saved collections, notifications and follower graphs — pairing a layered Spring Boot API with an OpenAPI-generated Angular client.',
        shortSummary: 'A social network built end-to-end — interface, API, auth and storage.',
        decision:
          'JWT authentication with rotating refresh tokens, AWS S3 media served through expiring presigned URLs, and Flyway-versioned PostgreSQL migrations.',
        focusLine: 'PROJECT FOCUS / JAVA · ANGULAR · POSTGRESQL · S3',
        frameTag: 'PERSONAL PROJECT',
        chapterTone: 'blue',
        techs: ['Java 21', 'Spring Boot', 'Angular 19', 'PostgreSQL', 'AWS S3', 'Flyway'],
        image: 'newgram_print.webp',
        imageWidth: 1200,
        imageHeight: 546,
        imageAlt: 'Newgram feed interface displaying posts, interactions and suggested creators',
        page: '/en/projects/newgram',
        url: 'https://github.com/JamesonHenrique/Newgram',
        demo: 'https://newgram-nine.vercel.app/'
      }
    ],
    archive: [
      {
        title: 'Algamoney',
        description: 'Personal finance management with income/expense tracking, analytics dashboard and reports.',
        techs: ['Java', 'Spring Boot', 'Angular', 'PostgreSQL', 'JWT', 'JasperReports'],
        url: 'https://github.com/JamesonHenrique/Algamoney'
      },
      {
        title: 'WaveChat',
        description: 'Real-time instant messaging over WebSocket with identity management through Keycloak.',
        techs: ['Java', 'Spring Boot', 'Angular', 'WebSocket', 'Keycloak', 'Docker'],
        url: 'https://github.com/JamesonHenrique/WaveChat'
      },
      {
        title: 'BookLore',
        description: 'Personal book collection with e-mail authentication and lending workflow.',
        techs: ['Java', 'Spring Boot', 'Angular', 'PostgreSQL', 'JWT', 'Docker'],
        url: 'https://github.com/JamesonHenrique/BookLore'
      }
    ]
  },
  about: {
    index: '03',
    kicker: 'Who builds it',
    sectionLabel: '03 / Who builds it',
    title: 'I build software. No mystery.',
    headingPre: 'I build',
    headingEm: 'software.',
    headingPost: 'No mystery.',
    lead: 'Undergraduate training in Information Technology paired with hands-on delivery across web engineering, CRM foundations and operational automation.',
    photoAlt: 'Portrait of Jameson Henrique',
    photoCaption: 'JAMESON, 2026.',
    shortBio:
      'I am Jameson Henrique, a full stack developer. I’m pursuing a bachelor’s degree in Information Technology at IMD/UFRN and work on web applications, integrations and automation systems.',
    intro:
      'I am a software developer pursuing a bachelor’s degree in Information Technology at IMD/UFRN. My focus is turning concrete operational needs into readable, secure and maintainable software.',
    detail:
      'My core stack centers on Java, Spring Boot, Angular and TypeScript for full stack delivery, complemented by production experience building REST API integrations, webhooks and automated workflows with Make, n8n and applied AI.',
    locationLabel: 'Base',
    location: 'Natal, RN · Brazil',
    educationLabel: 'Education',
    education: "Bachelor's in Information Technology",
    educationDetail: 'Instituto Metrópole Digital (IMD/UFRN) · 2026.1 – ongoing',
    languagesLabel: 'Languages',
    languages: 'Portuguese (native) · English (intermediate) · Spanish (basic)',
    experienceHeading: 'Professional experience',
    currentBadge: 'Current',
    cvLink: 'Download résumé (PDF · PT)',
    experience: [
      {
        period: 'Nov 2026 – present',
        role: 'Full Stack Developer & Technology Lead',
        organization: 'Wolfacilitates C&M',
        context: 'Remote',
        summary:
          'Planning and building web applications, landing pages and internal systems while defining architecture, integrations and digital infrastructure.',
        highlights: [
          'Structuring an in-house CRM and defining core architecture and stack decisions.',
          'Designing APIs, cross-system integrations and evaluating digital infrastructure costs.',
          'Establishing testing, security, versioning, deployment and monitoring practices.'
        ],
        stack: ['TypeScript', 'Angular', 'Java', 'Spring Boot', 'REST APIs', 'Docker'],
        current: true
      },
      {
        period: 'Aug 2026 – Oct 2026',
        role: 'Automation & Integrations Developer Intern',
        organization: 'Duarte e Almeida Advogados',
        context: 'LegalOps · Technology Department',
        summary:
          'Maintained production integrations connecting customer support, CRM, electronic signature and legal software via REST APIs and webhooks.',
        highlights: [
          'Converted and validated 30 production workflows from Make to n8n Cloud.',
          'Co-built a daily legal task audit with business rules refined alongside leadership and Legal Operations.',
          'Investigated AI support failures, data contracts, electronic signature and post-sale execution flows.'
        ],
        stack: ['Make', 'n8n', 'REST APIs', 'Webhooks', 'JSON', 'Google Workspace', 'Applied AI']
      },
      {
        period: 'Jun 2025 – Jul 2025',
        role: 'Full Stack Developer (Freelance)',
        organization: 'Machine Dashboard',
        context: 'Client engagement · Factory floor',
        summary: 'Built the backend and frontend of a web monitoring dashboard for industrial equipment operations.',
        highlights: [
          'Structured real-time machine visibility grouped by operational status.',
          'Deployed into direct daily use on the client’s factory floor, replacing manual rounds.'
        ],
        stack: ['Java', 'Spring Boot', 'Angular', 'TypeScript', 'MongoDB']
      }
    ]
  },
  skills: {
    index: '03',
    kicker: 'Technical capabilities',
    title: 'Stack in operational context',
    lead: 'Technologies grouped by how they are applied in architecture, delivery and reliability — aligned strictly with documented experience.',
    groups: [
      {
        index: '01',
        title: 'Backend, APIs & data',
        context:
          'Layered services, OpenAPI contracts, JWT/OAuth2 authentication with token rotation, and relational/NoSQL persistence with versioned migrations.',
        items: [
          'Java',
          'Spring Boot',
          'Spring Security',
          'Spring Data JPA',
          'REST APIs',
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
        title: 'Frontend & interfaces',
        context:
          'Strongly typed web applications focused on operational clarity, accessibility, contract-generated API clients and fast prerendered delivery.',
        items: ['Angular', 'TypeScript', 'JavaScript', 'RxJS', 'Tailwind CSS', 'Semantic HTML', 'SSR / Prerender']
      },
      {
        index: '03',
        title: 'Automation, integrations & applied AI',
        context:
          'Reliable orchestration across support, CRM, electronic signature and internal tools with error handling, pagination, idempotency and credential hygiene.',
        items: [
          'Make',
          'n8n',
          'Python',
          'Webhooks',
          'JSON',
          'Gemini API',
          'Google Workspace',
          'Error handling',
          'Pagination',
          'Credential security'
        ]
      },
      {
        index: '04',
        title: 'Testing, delivery & infrastructure',
        context:
          'Automated unit and end-to-end checks, CI pipelines with secret scanning, multi-stage containers and secure cloud media delivery.',
        items: ['JUnit', 'Mockito', 'Docker', 'Git', 'GitHub Actions (CI)', 'AWS S3', 'Linux']
      }
    ]
  },
  contact: {
    index: '04',
    kicker: 'Next conversation',
    sectionLabel: '04 / Next conversation',
    title: 'Got something to solve?',
    headingPre: 'Got something',
    headingEm: 'to solve?',
    lead: 'Open to technical conversations on software engineering, web architecture, integrations and technology.',
    channelsHeading: 'Direct channels',
    text: 'Currently at Wolfacilitates C&M. Feel free to reach out via the form or direct e-mail to discuss software engineering, integrations or architecture.',
    email: 'E-mail',
    copyEmail: 'Copy e-mail',
    copiedEmail: 'Copied',
    phone: 'Phone',
    location: 'Location',
    social: 'Profiles',
    backToTop: 'BACK TO TOP ↑',
    form: {
      name: 'Your name',
      namePlaceholder: 'How should I address you',
      email: 'Your e-mail',
      emailPlaceholder: 'name@company.com',
      subject: 'Subject',
      subjectPlaceholder: 'What would you like to discuss',
      message: 'Message',
      messagePlaceholder: 'Context, goal or technical question...',
      send: 'Send message',
      sending: 'Sending...',
      sent: "Message sent. I'll reply to the e-mail you provided.",
      error: "Couldn't send it right now. Write directly to"
    }
  },
  footer: {
    role: 'Full Stack Developer',
    rights: 'All rights reserved.',
    cv: 'Résumé (PDF · PT)'
  },
  projectPage: {
    back: 'Back to work',
    caseLabel: 'Case study',
    problemHeading: 'Problem & context',
    stack: 'Tech stack',
    code: 'View code on GitHub',
    demo: 'Open live demo',
    nextCase: 'Next case study'
  },
  pages: {
    oportunizavaga: {
      index: '01',
      slug: 'oportunizavaga',
      title: 'OportunizaVaga',
      name: 'Open-source job search and application agent with durable state and zero-DB monitor',
      category: 'Open-source · Automation & AI',
      period: '2026',
      metaDescription:
        'OportunizaVaga case study: open-source job search automation featuring an idempotent cron supervisor, durable JSON state outside the LLM, Chrome CDP and a zero-DB monitor.',
      specs: [
        { label: 'Role', value: 'Author & maintainer' },
        { label: 'License', value: 'Open-source (MIT)' },
        { label: 'Platforms', value: 'Linux · Windows (PS1 / WSL2)' },
        { label: 'Status', value: 'Published with live demo' }
      ],
      image: 'oportunizavaga_print.webp',
      imageWidth: 960,
      imageHeight: 600,
      imageAlt: 'OportunizaVaga monitor demo with fictitious data showing sent applications and cadence by source',
      imageCaption:
        'Optional Vercel monitor running on fictitious demo data, showing daily cadence and breakdown by source.',
      intro: [
        'Searching and filtering relevant listings across multiple Brazilian job boards demands repetitive discipline: checking profile constraints, preventing duplicate applications, tailoring résumés and tracking responses without losing state.',
        'OportunizaVaga models this workflow as a deterministic, AI-assisted local system running at zero infrastructure cost. Its documentation explicitly warns that automation may violate portal terms of service, advising users to review each site’s rules and discouraging mass applications.'
      ],
      architectureHeading: 'System architecture',
      architectureSummary:
        'Strict separation between orchestration (cron + supervisor), real-browser execution (Chrome CDP), durable JSON persistence outside the model session and aggregated telemetry in the monitor.',
      architectureAria:
        'OportunizaVaga architecture diagram: a 5-minute cron triggers an idempotent supervisor with file locking, which runs the loop and LLM provider cascade, drives Chrome via CDP, writes durable JSON state outside the AI and publishes aggregated snapshots to the Vercel monitor.',
      decisionsHeading: 'Technical decisions & trade-offs',
      decisions: [
        {
          title: 'Durable state strictly outside the model session',
          rationale:
            'Every round starts a clean LLM session. All history (applied, blocked, filtered and rotation state) lives in atomically written JSON files guarded by an exclusive lock (jsonlock.py), preventing context drift.'
        },
        {
          title: 'Idempotent supervisor over a fragile daemon',
          rationale:
            'A 5-minute cron verifies whether the loop and Chrome (CDP :9222) are alive and restarts anything that dropped. A single-instance file lock prevents two rounds from fighting over the browser.'
        },
        {
          title: 'Zero fabricated candidate data',
          rationale:
            'Every submitted value comes from local user-managed files. Missing fields halt the application and record an explicit block reason instead of letting the model guess.'
        },
        {
          title: 'Zero-DB monitor with aggregated telemetry',
          rationale:
            'The optional Vercel dashboard holds only the latest snapshot in memory (zero cost), publishing aggregate counters by default and redacting sensitive strings from logs.'
        }
      ],
      sections: [
        {
          heading: 'Operational flow',
          items: [
            'Visits one board per round in a configurable rotation, respecting intervals and automatic backoff when no new listings appear.',
            'Health-scored AI provider cascade: when one free provider hits rate limits, it switches to the next and returns to the preferred model automatically.',
            'Per-vacancy 1-page PDF résumé generation from a master markdown file, paired with ATS keyword coverage checks (target >= 75%).',
            'Weekly read-only follow-up routine and funnel export (seen → applied → replied → interviews).'
          ]
        },
        {
          heading: 'Quality & safety',
          items: [
            'Automated tests in GitHub Actions CI plus a pre-commit sanitizer scanning for secrets and personal data.',
            'Cross-platform parity across Linux (Bash) and Windows (native PowerShell / WSL2), plus a dry-run mode to inspect planned rounds without applying.'
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
      title: 'Machine Dashboard',
      name: 'Real-time web monitoring for factory-floor equipment',
      category: 'Freelance · Industrial operations',
      period: 'Jun–Jul 2025',
      metaDescription:
        'Authorized case study for Machine Dashboard: full stack Java, Spring Boot, Angular and MongoDB system for real-time factory-floor equipment monitoring.',
      specs: [
        { label: 'Role', value: 'Full Stack (end-to-end)' },
        { label: 'Engagement', value: 'Freelance delivery' },
        { label: 'Environment', value: 'Live factory-floor use' },
        { label: 'Source', value: 'Client proprietary' }
      ],
      image: 'painel-de-maquinas_print.webp',
      imageWidth: 1200,
      imageHeight: 579,
      imageAlt: 'Web dashboard displaying aggregated equipment status counts and individual machine cards',
      imageCaption:
        'Sanitized capture of the operational dashboard showing status totals and individual equipment tiles.',
      intro: [
        'Prior to this system, tracking which machines were running, stopped or awaiting maintenance required recurring manual rounds on the factory floor — slowing down operational awareness and response times.',
        'Delivered end-to-end as a dedicated web panel, the application consolidates plant-wide totals and individual equipment states into a single view used daily by the client’s floor team.'
      ],
      architectureHeading: 'System architecture',
      architectureSummary:
        'Java and Spring Boot REST API backed by MongoDB for equipment state persistence, consumed by a reactive Angular interface built with RxJS and Tailwind CSS.',
      architectureAria:
        'Machine Dashboard architecture diagram: equipment state updates flow through the Java Spring Boot API backed by MongoDB and stream into the reactive Angular and RxJS dashboard for factory-floor monitoring.',
      decisionsHeading: 'Technical decisions & trade-offs',
      decisions: [
        {
          title: 'Visual hierarchy built around four explicit states',
          rationale:
            'Equipment is categorized into four unmistakable conditions (running, stopped, under maintenance, no operator) with top-level counters optimized for quick scanning at a distance.'
        },
        {
          title: 'Document storage in MongoDB',
          rationale:
            'Storing each machine’s current operational state and metadata as a document streamlined summary aggregations and frequent updates without heavy relational joins.'
        },
        {
          title: 'Reactive Angular interface',
          rationale:
            'RxJS keeps the dashboard synchronized with the Spring Boot API without manual page refreshes, prioritizing clarity and low friction for floor operators.'
        }
      ],
      sections: [
        {
          heading: 'Key deliverables',
          items: [
            'End-to-end backend REST API in Java with Spring Boot and MongoDB persistence.',
            'Responsive web dashboard in Angular, TypeScript, RxJS and Tailwind CSS featuring live totals and per-machine state cards.',
            'Deployed into routine client use on the factory floor, replacing manual checks.'
          ]
        }
      ],
      techs: ['Java', 'Spring Boot', 'Angular', 'TypeScript', 'MongoDB', 'RxJS', 'Tailwind CSS'],
      privateNotice:
        'Delivered under a freelance agreement: source code, production datasets and client identity remain confidential. This case study presents authorized scope and architectural decisions only.',
      nextSlug: 'newgram'
    },
    newgram: {
      index: '03',
      slug: 'newgram',
      title: 'Newgram',
      name: 'Full stack social network with layered backend, OpenAPI contract and AWS S3',
      category: 'Full Stack · Java & Angular',
      period: '2025–2026',
      metaDescription:
        'Newgram case study: full stack social network built with Java 21, Spring Boot 3.5, Angular 19, OpenAPI client generation, JWT refresh rotation, Flyway PostgreSQL and AWS S3.',
      specs: [
        { label: 'Role', value: 'Author (Backend + Frontend)' },
        { label: 'Backend', value: 'Java 21 · Spring Boot 3.5' },
        { label: 'Frontend', value: 'Angular 19 · OpenAPI client' },
        { label: 'Status', value: 'Open-source with live demo' }
      ],
      image: 'newgram_print.webp',
      imageWidth: 1200,
      imageHeight: 546,
      imageAlt: 'Newgram main feed displaying posts, interactions and suggested creators panel',
      imageCaption:
        'Newgram feed consuming a typed OpenAPI client with presigned S3 media delivery and profile suggestions.',
      intro: [
        'Newgram was built to move past basic CRUD examples and model a realistic social domain with production-oriented security, cloud media handling and versioned database migrations.',
        'It connects a layered Spring Boot backend to an Angular frontend whose HTTP client is generated directly from the OpenAPI 3 specification, keeping API contracts synchronized automatically.'
      ],
      architectureHeading: 'System architecture',
      architectureSummary:
        'Four-layer Spring Boot backend (presentation, application, core.domain, infrastructure) isolating domain rules from HTTP transport, JWT security, PostgreSQL and S3 storage.',
      architectureAria:
        'Newgram architecture diagram: Angular 19 frontend with an OpenAPI-generated client communicates over REST with JWT authentication to a layered Spring Boot backend backed by Flyway-managed PostgreSQL and AWS S3 presigned URLs.',
      decisionsHeading: 'Technical decisions & trade-offs',
      decisions: [
        {
          title: 'JWT authentication with refresh token rotation',
          rationale:
            'Short-lived access tokens (15 min) paired with 7-day rotating refresh tokens that reject token reuse, backed by dedicated automated tests for the refresh lifecycle.'
        },
        {
          title: 'Media delivery via AWS S3 presigned URLs',
          rationale:
            'Avoids exposing public buckets or proxying binary streams through the API, using configurable 60-minute expiration and S3-compatible local testing via MinIO.'
        },
        {
          title: 'OpenAPI-generated frontend client',
          rationale:
            'Generating Angular services via ng-openapi-gen from springdoc-openapi enforces compile-time type safety between Java DTOs and UI components.'
        },
        {
          title: 'Controlled schema evolution & lean container build',
          rationale:
            'Flyway-managed PostgreSQL migrations, tuned HikariCP and JPA batch inserts, packaged with a multi-stage Docker build (Maven → Temurin JRE Alpine).'
        }
      ],
      sections: [
        {
          heading: 'Domain scope',
          items: [
            'Discovery feeds across followed accounts, popular, trending, recommended and location-based views.',
            'Media posts, likes, comments, hashtags, archiving and named saved collections.',
            'Expiring stories and profile highlights, follower graph with mutual-follow suggestions and interaction notifications.',
            'Paginated post and user search alongside interactive Swagger UI documentation.'
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
