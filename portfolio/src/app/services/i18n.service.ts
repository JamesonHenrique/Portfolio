import { Injectable, computed, inject, signal } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { ActivationEnd, Router } from '@angular/router';
import { EN } from '../content/en';
import { PT } from '../content/pt';
import { Lang, SiteContent } from '../content/types';

/** Current language, taken from the `lang` data of the active route ('/' = pt, '/en' = en). */
@Injectable({ providedIn: 'root' })
export class I18nService {
  // Seeded from the URL so the shell (skip link, dots, footer) renders in the right language from the first pass.
  readonly lang = signal<Lang>(inject(PlatformLocation).pathname.startsWith('/en') ? 'en' : 'pt');
  readonly content = computed<SiteContent>(() => (this.lang() === 'en' ? EN : PT));

  constructor() {
    inject(Router).events.subscribe((event) => {
      if (event instanceof ActivationEnd && event.snapshot.data['lang']) {
        this.lang.set(event.snapshot.data['lang']);
      }
    });
  }
}
