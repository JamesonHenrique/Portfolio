import { UpperCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CaseSlug, FlagshipProject } from '../../content/types';
import { I18nService } from '../../services/i18n.service';
import { TransitionService } from '../../services/transition.service';

@Component({
  selector: 'app-projects',
  imports: [RouterLink, UpperCasePipe],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  readonly c = inject(I18nService).content;
  readonly transition = inject(TransitionService);

  prepareCase(slug: CaseSlug) {
    this.transition.prepare(slug, 'chapter');
  }

  srcset(project: FlagshipProject): string {
    const small = project.image.replace('.webp', '-600.webp');
    return `/${small} 600w, /${project.image} ${project.imageWidth}w`;
  }
}
