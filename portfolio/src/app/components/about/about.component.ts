import { Component, ElementRef, HostListener, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements AfterViewInit {
  @ViewChild('aboutSection') aboutSection!: ElementRef;
  isVisible = false;
  yearsExperience = 0;
  projectsCompleted = 0;
  animationTriggered = false;
  constructor(private cdRef: ChangeDetectorRef) {}
  ngAfterViewInit() {
    this.checkScroll();
    this.cdRef.detectChanges();
  }

  @HostListener('window:scroll')
  checkScroll() {
    if (this.animationTriggered) return;

    const element = this.aboutSection.nativeElement;
    const rect = element.getBoundingClientRect();
    const isVisible = (rect.top <= window.innerHeight * 0.8) && (rect.bottom >= 0);

    if (isVisible) {
      this.isVisible = true;
      this.animationTriggered = true;
      this.animateCounters();
    }
  }

  animateCounters() {
    this.animateValue(0, 5, 2000, (value) => this.yearsExperience = value);
    this.animateValue(0, 50, 2000, (value) => this.projectsCompleted = value);
  }

  animateValue(start: number, end: number, duration: number, callback: (value: number) => void) {
    const range = end - start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / range));
    let current = start;
    const timer = setInterval(() => {
      current += increment;
      callback(current);
      if (current === end) {
        clearInterval(timer);
      }
    }, stepTime);
  }
}
