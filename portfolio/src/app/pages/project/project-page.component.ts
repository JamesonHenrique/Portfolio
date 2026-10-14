import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EN } from '../../content/en';
import { PT } from '../../content/pt';
import { ProjectPage, SiteContent } from '../../content/types';
import { SeoService } from '../../services/seo.service';

/** Case-study page for a project with public documentation (OportunizaVaga, Newgram). */
@Component({
  selector: 'app-project-page',
  imports: [RouterLink],
  templateUrl: './project-page.component.html',
  styleUrl: './project-page.component.scss'
})
export class ProjectPageComponent {
  readonly c: SiteContent;
  readonly page: ProjectPage;

  constructor() {
    const data = inject(ActivatedRoute).snapshot.data;
    this.c = data['lang'] === 'en' ? EN : PT;
    this.page = this.c.pages[data['slug']];
    inject(SeoService).update({
      title: `${this.page.title} | ${this.page.name} | Jameson Henrique`,
      description: this.page.metaDescription,
      path: this.pathFor(this.c),
      htmlLang: this.c.htmlLang,
      ogLocale: this.c.ogLocale,
      alternates: { pt: this.pathFor(PT), en: this.pathFor(EN) }
    });
  }

  private pathFor(c: SiteContent) {
    return c.lang === 'en' ? `/en/projects/${this.page.slug}` : `/projetos/${this.page.slug}`;
  }
}
