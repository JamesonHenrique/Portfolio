export type Lang = 'pt' | 'en';

/** Public origin, used for canonical/hreflang/og:url. Change here (and in index.html, robots.txt, sitemap.xml) when moving to a custom domain. */
export const SITE_ORIGIN = 'https://jamesonhenrique-portfolio.vercel.app';

/** A run of text; `hl` renders it highlighted (the purple words in the hero, about and career texts). */
export interface Segment {
  text: string;
  hl?: 'strong' | 'tech' | 'underline' | 'plain';
}

export interface TimelineItem {
  heading: string;
  sub?: string;
  text?: Segment[];
  list?: string[];
}

export interface ProjectCard {
  title: string;
  name: string;
  description: string;
  techs: string[];
  image: string;
  /** Internal case-study page (only projects with enough public documentation). */
  page?: string;
  decision?: string;
  url?: string;
  demo?: string;
  note?: string;
}

export interface ProjectPage {
  slug: string;
  title: string;
  name: string;
  metaDescription: string;
  image: string;
  imageAlt: string;
  intro: string[];
  sections: { heading: string; items: string[] }[];
  techs: string[];
  url: string;
  demo?: string;
}

export interface SiteContent {
  lang: Lang;
  htmlLang: string;
  ogLocale: string;
  /** Home path of this language and of the other one (for the language switch). */
  home: string;
  otherHome: string;
  switchLabel: string;
  switchAria: string;
  meta: { title: string; description: string };
  skipLink: string;
  nav: {
    aria: string;
    inicio: string;
    sobre: string;
    skills: string;
    projetos: string;
    contato: string;
    rodape: string;
  };
  hero: {
    availability: string;
    badge: string;
    lines: Segment[][];
    projectsButton: string;
    cvButton: string;
  };
  about: {
    title: string;
    photoAlt: string;
    paragraphs: Segment[][];
    educationTitle: string;
    education: TimelineItem[];
    careerTitle: string;
    career: TimelineItem[];
  };
  skills: { title: string; systemsTitle: string };
  projects: {
    title: string;
    cards: ProjectCard[];
    decisionLabel: string;
    demo: string;
    code: string;
    details: string;
    more: string;
    techsAria: string;
    screenshotOf: string;
  };
  contact: {
    title: string;
    cardTitle: string;
    text: string;
    email: string;
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
  footer: { quote: string; rights: string };
  projectPage: { back: string; stack: string; code: string; demo: string };
  pages: Record<string, ProjectPage>;
}
