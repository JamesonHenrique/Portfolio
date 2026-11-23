import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EN } from '../../content/en';
import { PT } from '../../content/pt';
import { CaseSlug, ProjectPage, SiteContent } from '../../content/types';
import { SeoService } from '../../services/seo.service';

/** Case-study dossier page (OportunizaVaga, Painel de Máquinas, Newgram). */
@Component({
  selector: 'app-project-page',
  imports: [RouterLink],
  templateUrl: './project-page.component.html',
  styleUrl: './project-page.component.scss'
})
export class ProjectPageComponent {
  readonly c: SiteContent;
  readonly page: ProjectPage;
  readonly nextPage: ProjectPage;
  readonly nextPath: string;

  constructor() {
    const data = inject(ActivatedRoute).snapshot.data;
    const slug = data['slug'] as CaseSlug;
    this.c = data['lang'] === 'en' ? EN : PT;
    this.page = this.c.pages[slug];
    this.nextPage = this.c.pages[this.page.nextSlug];
    this.nextPath = this.pathFor(this.c, this.page.nextSlug);

    inject(SeoService).update({
      title: `${this.page.title} | ${this.page.name} | Jameson Henrique`,
      description: this.page.metaDescription,
      path: this.pathFor(this.c, this.page.slug),
      htmlLang: this.c.htmlLang,
      ogLocale: this.c.ogLocale,
      alternates: {
        pt: this.pathFor(PT, this.page.slug),
        en: this.pathFor(EN, this.page.slug)
      }
    });
  }

  get imageSrcset(): string {
    const small = this.page.image.replace('.webp', '-600.webp');
    return `/${small} 600w, /${this.page.image} ${this.page.imageWidth}w`;
  }

  private pathFor(c: SiteContent, slug: CaseSlug): string {
    return c.lang === 'en' ? `/en/projects/${slug}` : `/projetos/${slug}`;
  }
}
