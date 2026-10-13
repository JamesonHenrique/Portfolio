import { ChangeDetectorRef } from '@angular/core';

/**
 * Calls `callback` once, the first time `element` enters the viewport, then re-renders the
 * component. Replaces per-component `window:scroll` listeners. zone.js does not patch
 * IntersectionObserver, so the change detection run here is required. Returns a cleanup function.
 */
export function onFirstView(
  element: Element,
  cdr: ChangeDetectorRef,
  callback: () => void
): () => void {
  const fire = () => {
    callback();
    cdr.detectChanges();
  };

  if (typeof IntersectionObserver === 'undefined') {
    fire();
    return () => {};
  }

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        observer.disconnect();
        fire();
      }
    },
    // threshold 0 + negative bottom margin: fires when the section's top passes 15% above the
    // viewport bottom, regardless of how tall the section is (a ratio threshold can never be
    // reached by sections much taller than the screen, e.g. stacked cards on mobile).
    { threshold: 0, rootMargin: '0px 0px -15% 0px' }
  );
  observer.observe(element);
  return () => observer.disconnect();
}
