import { Injectable, inject, DOCUMENT } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SITE_ORIGIN } from '../content/types';

export interface PageSeo {
  title: string;
  description: string;
  /** Path of this page, e.g. '/en/projects/newgram'. */
  path: string;
  htmlLang: string;
  ogLocale: string;
  /** Same page in each language, for hreflang. */
  alternates: { pt: string; en: string };
}

const SITE_URL = SITE_ORIGIN + '/';
const PERSON_ID = SITE_URL + '#person';
const WEBSITE_ID = SITE_URL + '#website';
const STRUCTURED_DATA_ID = 'site-structured-data';

const PERSON = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: 'Jameson Henrique Cruz Sabino',
  alternateName: 'Jameson Henrique',
  jobTitle: 'Desenvolvedor Full Stack e Responsável por Tecnologia',
  worksFor: { '@type': 'Organization', name: 'Wolfacilitates Consulting & Management' },
  url: SITE_URL,
  image: SITE_ORIGIN + '/about-me.jpg',
  address: { '@type': 'PostalAddress', addressLocality: 'Natal', addressRegion: 'RN', addressCountry: 'BR' },
  knowsAbout: [
    'Automação de processos',
    'Integração de sistemas',
    'Make',
    'n8n',
    'APIs REST',
    'Webhooks',
    'Java',
    'Spring Boot',
    'Angular',
    'TypeScript',
    'Python'
  ],
  sameAs: ['https://www.linkedin.com/in/jamesonhenrique/', 'https://github.com/JamesonHenrique']
};

const WEBSITE = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  name: 'Jameson Henrique',
  url: SITE_URL,
  inLanguage: ['pt-BR', 'en'],
  publisher: { '@id': PERSON_ID }
};

const PROJECTS = new Map([
  [
    'oportunizavaga',
    {
      '@type': 'SoftwareSourceCode',
      name: 'OportunizaVaga',
      codeRepository: 'https://github.com/JamesonHenrique/OportunizaVaga',
      programmingLanguage: ['Shell', 'Python', 'JavaScript']
    }
  ],
  [
    'newgram',
    {
      '@type': 'SoftwareSourceCode',
      name: 'Newgram',
      codeRepository: 'https://github.com/JamesonHenrique/Newgram',
      programmingLanguage: ['Java', 'TypeScript']
    }
  ],
  ['painel-de-maquinas', { '@type': 'CreativeWork', name: 'Painel de Máquinas', alternateName: 'Machine Dashboard' }]
]);

/**
 * Per-page head tags. Runs during the build-time prerender too, so every static HTML file gets its
 * own title, description, canonical and hreflang (otherwise all pages would inherit the home canonical).
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly doc = inject(DOCUMENT);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  update(page: PageSeo) {
    const url = SITE_ORIGIN + page.path;
    const project = PROJECTS.get(page.path.substring(page.path.lastIndexOf('/') + 1));
    const english = page.htmlLang === 'en';
    const coverAlt = english ? "Jameson Henrique's portfolio cover" : 'Capa do portfólio de Jameson Henrique';
    const projectName = english ? (project?.alternateName ?? project?.name) : project?.name;
    const imageAlt = projectName ? `${coverAlt} · ${english ? 'Project' : 'Projeto'}: ${projectName}` : coverAlt;

    this.title.setTitle(page.title);
    this.meta.updateTag({ name: 'description', content: page.description });
    this.meta.updateTag({ property: 'og:title', content: page.title });
    this.meta.updateTag({ property: 'og:description', content: page.description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:locale', content: page.ogLocale });
    this.meta.updateTag({ property: 'og:image:alt', content: imageAlt });
    this.meta.updateTag({ name: 'twitter:title', content: page.title });
    this.meta.updateTag({ name: 'twitter:description', content: page.description });
    this.meta.updateTag({ name: 'twitter:image:alt', content: imageAlt });
    this.doc.documentElement.lang = page.htmlLang;

    this.setLink('canonical', url);
    this.setLink('alternate', SITE_ORIGIN + page.alternates.pt, 'pt-BR');
    this.setLink('alternate', SITE_ORIGIN + page.alternates.en, 'en');
    this.setLink('alternate', SITE_ORIGIN + page.alternates.pt, 'x-default');
    this.setStructuredData(page, url, project);
  }

  private setStructuredData(page: PageSeo, url: string, project: ReturnType<typeof PROJECTS.get>) {
    const webPage = {
      '@id': url + '#webpage',
      url,
      name: page.title,
      description: page.description,
      inLanguage: page.htmlLang,
      isPartOf: { '@id': WEBSITE_ID }
    };
    const graph: Record<string, unknown>[] = [PERSON, WEBSITE];
    if (page.path === '/' || page.path === '/en') {
      graph.push({ ...webPage, '@type': 'ProfilePage', mainEntity: { '@id': PERSON_ID } });
    } else if (project) {
      const projectUrl = SITE_ORIGIN + page.alternates.pt;
      const projectId = projectUrl + '#project';
      const breadcrumbId = url + '#breadcrumb';
      const english = page.htmlLang === 'en';
      graph.push(
        { ...webPage, '@type': 'WebPage', mainEntity: { '@id': projectId }, breadcrumb: { '@id': breadcrumbId } },
        {
          '@type': 'BreadcrumbList',
          '@id': breadcrumbId,
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: english ? 'Home' : 'Início',
              item: english ? SITE_ORIGIN + '/en' : SITE_URL
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: english ? (project.alternateName ?? project.name) : project.name,
              item: url
            }
          ]
        },
        { ...project, '@id': projectId, url: projectUrl, author: { '@id': PERSON_ID } }
      );
    } else {
      graph.push({ ...webPage, '@type': 'WebPage' });
    }

    let script = this.doc.head.querySelector<HTMLScriptElement>('#' + STRUCTURED_DATA_ID);
    if (!script) {
      script = this.doc.createElement('script');
      script.id = STRUCTURED_DATA_ID;
      script.type = 'application/ld+json';
      this.doc.head.appendChild(script);
    }
    // Keep JSON data from being interpreted as the end of the script in prerendered HTML.
    script.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
  }

  private setLink(rel: string, href: string, hreflang?: string) {
    const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]`;
    let link = this.doc.head.querySelector<HTMLLinkElement>(selector);
    if (!link) {
      link = this.doc.createElement('link');
      link.rel = rel;
      if (hreflang) link.hreflang = hreflang;
      this.doc.head.appendChild(link);
    }
    link.href = href;
  }
}
