import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  isVisible = false;
  currentYear = new Date().getFullYear();

  ngOnInit() {
    this.checkVisibility();
  }

  @HostListener('window:scroll')
  checkVisibility() {
    if (this.isVisible) return;

    const footer = document.querySelector('footer');
    if (!footer) return;

    const rect = footer.getBoundingClientRect();
    const isVisible = (rect.top <= window.innerHeight * 0.9);

    if (isVisible) {
      this.isVisible = true;
    }
  }
}
