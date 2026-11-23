import { Injectable, signal } from '@angular/core';
import { CaseSlug } from '../content/types';

export type TransitionSource = 'hero' | 'chapter' | 'case';

/**
 * Coordinates M02 shared-element View Transition names so only the clicked project
 * card/chapter and its target case-study page share a unique view-transition-name.
 */
@Injectable({ providedIn: 'root' })
export class TransitionService {
  readonly activeSlug = signal<CaseSlug | null>(null);
  readonly activeSource = signal<TransitionSource | null>(null);

  prepare(slug: CaseSlug, source: TransitionSource) {
    this.activeSlug.set(slug);
    this.activeSource.set(source);
  }

  frameName(slug: CaseSlug, source: TransitionSource): string | null {
    return this.activeSlug() === slug && this.activeSource() === source ? `case-frame-${slug}` : null;
  }

  titleName(slug: CaseSlug, source: TransitionSource): string | null {
    return this.activeSlug() === slug && this.activeSource() === source ? `case-title-${slug}` : null;
  }
}
