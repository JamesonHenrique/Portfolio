import { DOCUMENT } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SITE_ORIGIN } from '../content/types';
import { SeoService } from './seo.service';

interface GraphNode {
  '@type': string;
  [key: string]: unknown;
}

describe('SeoService', () => {
  let doc: Document;
  let seo: SeoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: DOCUMENT, useValue: document.implementation.createHTMLDocument() }]
    });
    seo = TestBed.inject(SeoService);
    doc = TestBed.inject(DOCUMENT);
  });

  const update = (path: string, lang: string, alternates = { pt: '/projetos/newgram', en: '/en/projects/newgram' }) =>
    seo.update({
      title: 'Título ' + path,
      description: 'Descrição ' + path,
      path,
      htmlLang: lang,
      ogLocale: lang === 'en' ? 'en_US' : 'pt_BR',
      alternates
    });

  const graph = (): GraphNode[] => {
    const scripts = doc.head.querySelectorAll('script[type="application/ld+json"]');
    expect(scripts.length).toBe(1);
    return scripts.length ? JSON.parse(scripts[0].textContent ?? '')['@graph'] : [];
  };

  it('sets title, description, lang and Open Graph tags', () => {
    update('/en/projects/newgram', 'en');
    expect(doc.title).toBe('Título /en/projects/newgram');
    expect(doc.documentElement.lang).toBe('en');
    expect(doc.querySelector('meta[name="description"]')?.getAttribute('content')).toBe(
      'Descrição /en/projects/newgram'
    );
    expect(doc.querySelector('meta[property="og:url"]')?.getAttribute('content')).toBe(
      SITE_ORIGIN + '/en/projects/newgram'
    );
  });

  it('keeps a single canonical and one link per hreflang across updates', () => {
    update('/projetos/newgram', 'pt-BR');
    update('/en/projects/newgram', 'en');
    const canonicals = doc.querySelectorAll('link[rel="canonical"]');
    expect(canonicals.length).toBe(1);
    expect(canonicals[0].getAttribute('href')).toBe(SITE_ORIGIN + '/en/projects/newgram');
    for (const lang of ['pt-BR', 'en', 'x-default']) {
      expect(doc.querySelectorAll(`link[rel="alternate"][hreflang="${lang}"]`).length)
        .withContext(lang)
        .toBe(1);
    }
    expect(doc.querySelector('link[hreflang="x-default"]')?.getAttribute('href')).toBe(
      SITE_ORIGIN + '/projetos/newgram'
    );
  });

  it('uses the bare origin with a trailing slash for the home canonical', () => {
    update('/', 'pt-BR');
    expect(doc.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(SITE_ORIGIN + '/');
  });

  it('identifies the same profile and website across both home pages', () => {
    const alternates = { pt: '/', en: '/en' };
    for (const [path, lang] of [
      ['/', 'pt-BR'],
      ['/en', 'en']
    ]) {
      update(path, lang, alternates);
      const nodes = graph();
      expect(nodes.find((node) => node['@type'] === 'ProfilePage')).toEqual(
        jasmine.objectContaining({
          url: SITE_ORIGIN + path,
          inLanguage: lang,
          mainEntity: { '@id': SITE_ORIGIN + '/#person' },
          isPartOf: { '@id': SITE_ORIGIN + '/#website' }
        })
      );
      const person = nodes.find((node) => node['@type'] === 'Person');
      expect(person).toEqual(
        jasmine.objectContaining({
          '@id': SITE_ORIGIN + '/#person',
          name: 'Jameson Henrique Cruz Sabino',
          alternateName: 'Jameson Henrique',
          worksFor: { '@type': 'Organization', name: 'Wolfacilitates Consulting & Management' },
          address: { '@type': 'PostalAddress', addressLocality: 'Natal', addressRegion: 'RN', addressCountry: 'BR' }
        })
      );
      const topics = person?.['knowsAbout'] as string[] | undefined;
      expect(topics?.filter((topic) => topic === 'Automação de processos')).toEqual(['Automação de processos']);
      expect(nodes.find((node) => node['@type'] === 'WebSite')?.['@id']).toBe(SITE_ORIGIN + '/#website');
    }
  });

  it('identifies the open-source projects across localized case studies', () => {
    const repositories = [
      { slug: 'newgram', repository: 'https://github.com/JamesonHenrique/Newgram' },
      { slug: 'oportunizavaga', repository: 'https://github.com/JamesonHenrique/OportunizaVaga' }
    ];
    for (const { slug, repository } of repositories) {
      const alternates = { pt: '/projetos/' + slug, en: '/en/projects/' + slug };
      for (const [path, lang, home] of [
        [alternates.pt, 'pt-BR', '/'],
        [alternates.en, 'en', '/en']
      ]) {
        update(path, lang, alternates);
        const nodes = graph();
        const projectId = SITE_ORIGIN + alternates.pt + '#project';
        expect(nodes.find((node) => node['@type'] === 'SoftwareSourceCode')).toEqual(
          jasmine.objectContaining({ '@id': projectId, codeRepository: repository })
        );
        expect(nodes.find((node) => node['@type'] === 'WebPage')).toEqual(
          jasmine.objectContaining({
            mainEntity: { '@id': projectId },
            breadcrumb: { '@id': SITE_ORIGIN + path + '#breadcrumb' }
          })
        );
        expect(nodes.find((node) => node['@type'] === 'BreadcrumbList')?.['itemListElement']).toEqual([
          jasmine.objectContaining({ position: 1, item: SITE_ORIGIN + home }),
          jasmine.objectContaining({ position: 2, item: SITE_ORIGIN + path })
        ]);
      }
    }
  });

  it('replaces the graph for a private case study and localizes social metadata', () => {
    update('/projetos/newgram', 'pt-BR');
    const ptAlt = doc.head.querySelector('meta[property="og:image:alt"]')?.getAttribute('content');
    const alternates = { pt: '/projetos/painel-de-maquinas', en: '/en/projects/painel-de-maquinas' };
    update(alternates.en, 'en', alternates);

    const nodes = graph();
    expect(nodes.find((node) => node['@type'] === 'SoftwareSourceCode')).toBeUndefined();
    const work = nodes.find((node) => node['@type'] === 'CreativeWork');
    expect(work).toEqual(jasmine.objectContaining({ name: 'Painel de Máquinas' }));
    expect(work?.['codeRepository']).toBeUndefined();
    expect(work?.['customer']).toBeUndefined();
    expect(nodes.find((node) => node['@type'] === 'BreadcrumbList')?.['itemListElement']).toEqual([
      jasmine.objectContaining({ name: 'Home' }),
      jasmine.objectContaining({ name: 'Machine Dashboard' })
    ]);
    expect(doc.head.querySelector('meta[name="twitter:title"]')?.getAttribute('content')).toBe(
      'Título /en/projects/painel-de-maquinas'
    );
    expect(doc.head.querySelector('meta[name="twitter:description"]')?.getAttribute('content')).toBe(
      'Descrição /en/projects/painel-de-maquinas'
    );
    const enAlt = doc.head.querySelector('meta[property="og:image:alt"]')?.getAttribute('content');
    expect(enAlt).toContain('Machine Dashboard');
    expect(enAlt).not.toBe(ptAlt);
    expect(doc.head.querySelector('meta[name="twitter:image:alt"]')?.getAttribute('content')).toBe(enAlt);
  });

  it('keeps markup-like titles inside the serialized JSON-LD data', () => {
    const title = 'Jameson </script><b>Henrique</b>';
    seo.update({
      title,
      description: 'Profile',
      path: '/en',
      htmlLang: 'en',
      ogLocale: 'en_US',
      alternates: { pt: '/', en: '/en' }
    });
    expect(doc.head.querySelector('script[type="application/ld+json"]')?.textContent).not.toContain('</script>');
    expect(graph().find((node) => node['@type'] === 'ProfilePage')?.['name']).toBe(title);
  });
});
