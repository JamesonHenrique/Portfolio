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
  imports: [HeroComponent, AboutComponent, SkillsComponent, ProjectsComponent, ContactComponent],
  template: `
    <app-hero></app-hero>
    <!-- Below the fold: the prerendered HTML stays in the page (SEO), but each section's JS is
         loaded and hydrated only when it scrolls into view, so startup does not hydrate everything.
         "on immediate" covers client-side navigation (e.g. coming back from a project page). -->
    @defer (on immediate; hydrate on viewport) {
      <app-about></app-about>
    }
    @defer (on immediate; hydrate on viewport) {
      <app-skills></app-skills>
    }
    @defer (on immediate; hydrate on viewport) {
      <app-projects></app-projects>
    }
    @defer (on immediate; hydrate on viewport) {
      <app-contact></app-contact>
    }
  `
})
export class HomeComponent {
  constructor() {
    const route = inject(ActivatedRoute);
    const c = route.snapshot.data['lang'] === 'en' ? EN : PT;
    // Coming from another page with a fragment (/#sobre): the section is inside a @defer block that
    // may not exist yet when the router tries to scroll, so scroll once it is in the DOM.
    afterNextRender(() => {
      const id = route.snapshot.fragment;
      if (!id) return;
      let tries = 0;
      const scroll = () => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
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
