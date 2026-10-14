
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
    const url = SITE_ORIGIN + (page.path === '/' ? '/' : page.path);
    this.title.setTitle(page.title);
    this.meta.updateTag({ name: 'description', content: page.description });
    this.meta.updateTag({ property: 'og:title', content: page.title });
    this.meta.updateTag({ property: 'og:description', content: page.description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:locale', content: page.ogLocale });
    this.doc.documentElement.lang = page.htmlLang;

    this.setLink('canonical', url);
    this.setLink('alternate', SITE_ORIGIN + page.alternates.pt, 'pt-BR');
    this.setLink('alternate', SITE_ORIGIN + page.alternates.en, 'en');
    this.setLink('alternate', SITE_ORIGIN + page.alternates.pt, 'x-default');
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
