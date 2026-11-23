export type Lang = 'pt' | 'en';

/** Public origin, used for canonical/hreflang/og:url. */
export const SITE_ORIGIN = 'https://jamesonhenrique-portfolio.vercel.app';

export type CaseSlug = 'oportunizavaga' | 'painel-de-maquinas' | 'newgram';

export interface FlagshipProject {
  index: string;
  slug: CaseSlug;
  title: string;
  subtitle: string;
  category: string;
  period: string;
  description: string;
  decision: string;
  techs: string[];
  image: string;
  imageWidth: number;
  imageHeight: number;
  imageAlt: string;
  page: string;
  url?: string;
  demo?: string;
  privateNote?: string;
}

export interface ArchiveProject {
  title: string;
  description: string;
  techs: string[];
  url: string;
}

export interface ExperienceItem {
  period: string;
  role: string;
  organization: string;
  context: string;
  summary: string;
  highlights: string[];
  stack: string[];
  current?: boolean;
}

export interface CapabilityGroup {
  index: string;
  title: string;
  context: string;
  items: string[];
}

export interface CaseDecision {
  title: string;
  rationale: string;
}

export interface CaseSpec {
  label: string;
  value: string;
}

export interface ProjectPage {
  index: string;
  slug: CaseSlug;
  title: string;
  name: string;
  category: string;
  period: string;
  metaDescription: string;
  specs: CaseSpec[];
  image: string;
  imageWidth: number;
  imageHeight: number;
  imageAlt: string;
  imageCaption: string;
  intro: string[];
  architectureHeading: string;
  architectureSummary: string;
  architectureAria: string;
  decisionsHeading: string;
  decisions: CaseDecision[];
  sections: { heading: string; items: string[] }[];
  techs: string[];
  url?: string;
  demo?: string;
  privateNotice?: string;
  nextSlug: CaseSlug;
}

export interface SiteContent {
  lang: Lang;
  htmlLang: string;
  ogLocale: string;
  home: string;
  otherHome: string;
  switchLabel: string;
  switchAria: string;
  meta: { title: string; description: string };
  skipLink: string;
  nav: {
    aria: string;
    menuOpen: string;
    menuClose: string;
    inicio: string;
    projetos: string;
    sobre: string;
    skills: string;
    contato: string;
  };
  hero: {
    context: string;
    name: string;
    headline: string;
    subhead: string;
    projectsButton: string;
    cvButton: string;
    panelLabel: string;
    panelHint: string;
    panelCta: string;
    panelDecisionLabel: string;
  };
  projects: {
    index: string;
    kicker: string;
    title: string;
    lead: string;
    decisionLabel: string;
    readCase: string;
    demo: string;
    code: string;
    techsAria: string;
    archiveTitle: string;
    archiveLead: string;
    archiveMore: string;
    flagships: FlagshipProject[];
    archive: ArchiveProject[];
  };
  about: {
    index: string;
    kicker: string;
    title: string;
    lead: string;
    photoAlt: string;
    intro: string;
    detail: string;
    locationLabel: string;
    location: string;
    educationLabel: string;
    education: string;
    educationDetail: string;
    languagesLabel: string;
    languages: string;
    experienceHeading: string;
    currentBadge: string;
    cvLink: string;
    experience: ExperienceItem[];
  };
  skills: {
    index: string;
    kicker: string;
    title: string;
    lead: string;
    groups: CapabilityGroup[];
  };
  contact: {
    index: string;
    kicker: string;
    title: string;
    lead: string;
    channelsHeading: string;
    text: string;
    email: string;
    copyEmail: string;
    copiedEmail: string;
    phone: string;
    location: string;
    locationValue: string;
    social: string;
    form: {
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      subject: string;
      subjectPlaceholder: string;
      message: string;
      messagePlaceholder: string;
      send: string;
      sending: string;
      sent: string;
      error: string;
    };
  };
  footer: {
    role: string;
    rights: string;
    cv: string;
  };
  projectPage: {
    back: string;
    caseLabel: string;
    problemHeading: string;
    stack: string;
    code: string;
    demo: string;
    nextCase: string;
  };
  pages: Record<CaseSlug, ProjectPage>;
}
