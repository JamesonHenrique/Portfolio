import { Directive, HostListener, Inject, DOCUMENT } from '@angular/core';


@Directive({
  selector: '[smoothScroll]'
})
export class SmoothScrollDirective {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    const target = (event.target as HTMLElement).closest('a');
    const href = target?.getAttribute('href');
    if (!href?.startsWith('#') || href.length < 2) return;

    // Only take over when the anchor exists on this page; otherwise let the browser/router handle it.
    const element = this.document.querySelector(href);
    if (!element) return;
    event.preventDefault();
    element.scrollIntoView({ behavior: 'smooth' });
  }
}