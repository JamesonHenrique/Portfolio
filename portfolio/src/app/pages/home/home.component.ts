import { Component, inject } from '@angular/core';
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
    <app-about></app-about>
    <app-skills></app-skills>
    <app-projects></app-projects>
    <app-contact></app-contact>
  `
})
export class HomeComponent {
  constructor() {
    const c = inject(ActivatedRoute).snapshot.data['lang'] === 'en' ? EN : PT;
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
