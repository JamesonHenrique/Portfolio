import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';

/** Global state for M03 (Technical Inspection Mode). */
@Injectable({ providedIn: 'root' })
export class InspectionService {
  private readonly doc = inject(DOCUMENT);
  readonly enabled = signal(false);

  toggle() {
    this.set(!this.enabled());
  }

  set(next: boolean) {
    this.enabled.set(next);
    this.doc.body?.classList.toggle('inspect', next);
  }
}
