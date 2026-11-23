import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FlagshipProject } from '../../content/types';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-projects',
  imports: [RouterLink],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  readonly c = inject(I18nService).content;

  srcset(project: FlagshipProject): string {
    const small = project.image.replace('.webp', '-600.webp');
    return `/${small} 600w, /${project.image} ${project.imageWidth}w`;
  }
}
