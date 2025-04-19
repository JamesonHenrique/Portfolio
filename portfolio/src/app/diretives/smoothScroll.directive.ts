import { Directive, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[smoothScroll]'
})
export class SmoothScrollDirective {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLAnchorElement;

    if (target.tagName.toLowerCase() === 'a' && target.getAttribute('href')?.startsWith('#')) {
      event.preventDefault();
      const targetId = target.getAttribute('href');

      if (targetId) {
        const element = this.document.querySelector(targetId);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    }
  }
}