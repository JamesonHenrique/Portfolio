import { DOCUMENT } from '@angular/core';

import { TestBed } from '@angular/core/testing';
import { SITE_ORIGIN } from '../content/types';
import { SeoService } from './seo.service';

describe('SeoService', () => {
  let doc: Document;
  let seo: SeoService;

  beforeEach(() => {
    seo = TestBed.inject(SeoService);
    doc = TestBed.inject(DOCUMENT);
  });

  const update = (path: string, lang: string) =>
    seo.update({
      title: 'Título ' + path,
      description: 'Descrição ' + path,
      path,
      htmlLang: lang,
      ogLocale: lang === 'en' ? 'en_US' : 'pt_BR',
      alternates: { pt: '/projetos/newgram', en: '/en/projects/newgram' }
    });

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
});
