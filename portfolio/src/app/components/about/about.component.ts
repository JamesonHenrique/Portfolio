import { ChangeDetectorRef, Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { onFirstView } from '../../utils/in-view';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements AfterViewInit, OnDestroy {
  @ViewChild('aboutSection') aboutSection!: ElementRef<HTMLElement>;
  isVisible = false;
  private stopObserving = () => {};

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.stopObserving = onFirstView(this.aboutSection.nativeElement, this.cdr, () => (this.isVisible = true));
  }

  ngOnDestroy() {
    this.stopObserving();
  }
}
