import { Component, afterNextRender, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AboutComponent } from '../../components/about/about.component';
import { ContactComponent } from '../../components/contact/contact.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { ProjectsComponent } from '../../components/projects/projects.component';
import { SkillsComponent } from '../../components/skills/skills.component';
import { EN } from '../../content/en';
import { PT } from '../../content/pt';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-home',
  imports: [HeroComponent, ProjectsComponent, AboutComponent, SkillsComponent, ContactComponent],
  template: `
    <app-hero></app-hero>
    <!-- Below the fold: prerendered HTML stays immediately visible for SEO and zero-JS users,
         while each section's JS hydrates incrementally on viewport or interaction. -->
    @defer (on immediate; hydrate on viewport; hydrate on interaction) {
      <app-projects></app-projects>
    }
    @defer (on immediate; hydrate on viewport; hydrate on interaction) {
      <app-about></app-about>
    }
    @defer (on immediate; hydrate on viewport; hydrate on interaction) {
      <app-skills></app-skills>
    }
    @defer (on immediate; hydrate on viewport; hydrate on interaction) {
      <app-contact></app-contact>
    }
  `
})
export class HomeComponent {
  constructor() {
    const route = inject(ActivatedRoute);
    const c = route.snapshot.data['lang'] === 'en' ? EN : PT;
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
      title: c.meta.title,
      description: c.meta.description,
      path: c.home,
      htmlLang: c.htmlLang,
      ogLocale: c.ogLocale,
      alternates: { pt: PT.home, en: EN.home }
    });
  }
}
