import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, ViewChild, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { onFirstView } from '../../utils/in-view';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-projects',
  imports: [RouterLink],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements AfterViewInit, OnDestroy {
  private cdr = inject(ChangeDetectorRef);

  @ViewChild('projectsSection') projectsSection!: ElementRef<HTMLElement>;
  isVisible = false;
  private stopObserving?: () => void;

  readonly c = inject(I18nService).content;

  ngAfterViewInit() {
    this.stopObserving = onFirstView(this.projectsSection.nativeElement, this.cdr, () => (this.isVisible = true));
  }

  ngOnDestroy() {
    this.stopObserving?.();
  }
}
