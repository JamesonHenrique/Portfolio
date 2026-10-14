import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, ViewChild, inject } from '@angular/core';
import { onFirstView } from '../../utils/in-view';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-projects',
  imports: [],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements AfterViewInit, OnDestroy {
  private cdr = inject(ChangeDetectorRef);

  @ViewChild('projectsSection') projectsSection!: ElementRef<HTMLElement>;
  isVisible = false;
  private stopObserving?: () => void;

  readonly c = inject(I18nService).content;

  /** Screenshots exist in two widths: name.webp (1200px) and name-600.webp. */
  srcset(image: string) {
    return `${image.replace('.webp', '-600.webp')} 600w, ${image} 1200w`;
  }

  ngAfterViewInit() {
    this.stopObserving = onFirstView(this.projectsSection.nativeElement, this.cdr, () => (this.isVisible = true));
  }

  ngOnDestroy() {
    this.stopObserving?.();
  }
}
