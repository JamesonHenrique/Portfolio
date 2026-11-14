import { ChangeDetectorRef, Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, inject } from '@angular/core';
import { I18nService } from '../../services/i18n.service';
import { onFirstView } from '../../utils/in-view';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements AfterViewInit, OnDestroy {
  private cdr = inject(ChangeDetectorRef);

  @ViewChild('aboutSection') aboutSection!: ElementRef<HTMLElement>;
  isVisible = false;
  readonly c = inject(I18nService).content;
  private stopObserving?: () => void;

  ngAfterViewInit() {
    this.stopObserving = onFirstView(this.aboutSection.nativeElement, this.cdr, () => (this.isVisible = true));
  }

  ngOnDestroy() {
    this.stopObserving?.();
  }
}
