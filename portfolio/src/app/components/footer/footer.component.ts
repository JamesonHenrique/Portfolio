import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { onFirstView } from '../../utils/in-view';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements AfterViewInit, OnDestroy {
  @ViewChild('footerEl') footerEl!: ElementRef<HTMLElement>;
  isVisible = false;
  currentYear = new Date().getFullYear();
  private stopObserving = () => {};

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.stopObserving = onFirstView(this.footerEl.nativeElement, this.cdr, () => (this.isVisible = true));
  }

  ngOnDestroy() {
    this.stopObserving();
  }
}
