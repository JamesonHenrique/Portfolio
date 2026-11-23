import { Directive, HostListener, DOCUMENT, inject } from '@angular/core';

@Directive({
  selector: '[appSmoothScroll]'
})
export class SmoothScrollDirective {
  private document = inject<Document>(DOCUMENT);

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    const target = (event.target as HTMLElement).closest('a');
    const href = target?.getAttribute('href');
    if (!href?.startsWith('#') || href.length < 2) return;

    const element = this.document.querySelector(href);
    if (!element) return;
    event.preventDefault();
    const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    element.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  }
}
