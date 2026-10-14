import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, ViewChild, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { onFirstView } from '../../utils/in-view';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements AfterViewInit, OnDestroy {
  @ViewChild('footerEl') footerEl!: ElementRef<HTMLElement>;
  isVisible = false;
  currentYear = new Date().getFullYear();
  readonly c = inject(I18nService).content;
  readonly links = [
    { id: 'inicio', label: 'inicio' },
    { id: 'sobre', label: 'sobre' },
    { id: 'skills', label: 'skills' },
    { id: 'projetos', label: 'projetos' },
    { id: 'contato', label: 'contato' }
  ] as const;
  private stopObserving = () => {};

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.stopObserving = onFirstView(this.footerEl.nativeElement, this.cdr, () => (this.isVisible = true));
  }

  ngOnDestroy() {
    this.stopObserving();
  }
}
