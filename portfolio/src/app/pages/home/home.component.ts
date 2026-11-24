import { Component, afterNextRender, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AboutComponent } from '../../components/about/about.component';
import { ContactComponent } from '../../components/contact/contact.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { ProjectsComponent } from '../../components/projects/projects.component';
import { EN } from '../../content/en';
import { PT } from '../../content/pt';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-home',
  imports: [HeroComponent, ProjectsComponent, AboutComponent, ContactComponent],
  template: `
    <app-hero></app-hero>

    <div class="ribbon" aria-hidden="true">
      <div class="ribbon-track">
        @for (loop of [0, 1, 2, 3]; track loop) {
          <span>
            @for (item of c.ribbon; track item) {
              {{ item }} <b>✳</b>
            }
          </span>
        }
      </div>
    </div>

    <section class="intro-band" aria-labelledby="intro-heading">
      <div class="ed-container intro-layout">
        <div class="ed-section-label">{{ c.intro.label }}</div>
        <div>
          <h2 id="intro-heading" class="intro-line">
            {{ c.intro.headlinePre }}<em>{{ c.intro.headlineEm }}</em
            >{{ c.intro.headlinePost }}
          </h2>
          <div class="intro-note">
            <small>{{ c.intro.noteLabel }}</small>
            <p>{{ c.intro.noteText }}</p>
          </div>
        </div>
      </div>
    </section>

    <app-projects></app-projects>
    <app-about></app-about>
    <app-contact></app-contact>
  `,
  styles: `
    .ribbon {
      background: var(--night);
      color: var(--paper);
      border-bottom: 1px solid var(--night);
      padding: 0.95rem 0;
      white-space: nowrap;
      overflow: hidden;
    }

    .ribbon-track {
      display: flex;
      gap: 3.5rem;
      min-width: max-content;
      animation: ribbon-marquee 24s linear infinite;
      font-family: var(--font-mono);
      font-size: 0.8125rem;
      font-weight: 500;
      letter-spacing: 0.075em;
    }

    .ribbon b {
      font-weight: 500;
      color: var(--gold);
      margin-inline: 0.6rem;
    }

    @keyframes ribbon-marquee {
      to {
        transform: translateX(-50%);
      }
    }

    .intro-band {
      background: var(--paper);
      padding-block: clamp(4.5rem, 8vw, 7.5rem);
    }

    .intro-layout {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.75rem;
      align-items: start;
    }

    @media (min-width: 900px) {
      .intro-layout {
        grid-template-columns: 0.34fr 1fr;
        gap: 3.5rem;
      }
    }

    .intro-line {
      font-family: var(--font-display);
      font-weight: 750;
      letter-spacing: -0.045em;
      font-size: clamp(2.5rem, 5.8vw, 5.75rem);
      line-height: 0.98;
      max-width: 64rem;
    }

    .intro-line em {
      font-family: var(--font-serif);
      font-style: italic;
      font-weight: 400;
      letter-spacing: -0.03em;
      color: var(--accent);
    }

    .intro-note {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      max-width: 55rem;
      gap: 0.875rem;
      margin-top: 2.25rem;
      border-top: 1px solid var(--line);
      padding-top: 1.125rem;
    }

    @media (min-width: 768px) {
      .intro-note {
        flex-direction: row;
        gap: 2rem;
      }
    }

    .intro-note small {
      font-family: var(--font-mono);
      font-size: 0.6875rem;
      font-weight: 500;
      letter-spacing: 0.06em;
      white-space: nowrap;
    }

    .intro-note p {
      margin: 0;
      max-width: 27rem;
      font-size: 0.9375rem;
      line-height: 1.5;
      color: var(--text-secondary);
    }
  `
})
export class HomeComponent {
  readonly c = inject(ActivatedRoute).snapshot.data['lang'] === 'en' ? EN : PT;

  constructor() {
    const route = inject(ActivatedRoute);
    afterNextRender(() => {
      const id = route.snapshot.fragment;
      if (!id) return;
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      let tries = 0;
      const scroll = () => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
        else if (++tries < 60) requestAnimationFrame(scroll);
      };
      scroll();
    });

    inject(SeoService).update({
      title: this.c.meta.title,
      description: this.c.meta.description,
      path: this.c.home,
      htmlLang: this.c.htmlLang,
      ogLocale: this.c.ogLocale,
      alternates: { pt: PT.home, en: EN.home }
    });
  }
}
