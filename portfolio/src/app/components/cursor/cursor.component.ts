import { Component, DestroyRef, ElementRef, afterNextRender, inject, signal, viewChild } from '@angular/core';

const INTERACTIVE = 'a, button, input, textarea, select, label';

/**
 * Custom cursor ball (mouse devices only). Pointer events are handled with plain DOM listeners, outside
 * Angular's change detection: the ball is moved by writing `transform` directly, and Angular state only
 * changes when the ball appears, disappears or toggles its hover size.
 */
@Component({
  selector: 'app-cursor',
  template: `
    <div #ball class="cursor-ball" [class.cursor-hidden]="!active()" [class.hidden]="!enabled()" aria-hidden="true">
      <div class="cursor-dot" [class.cursor-dot-hover]="hovering()"></div>
    </div>
  `,
  styleUrl: './cursor.component.scss'
})
export class CursorComponent {
  private readonly ball = viewChild.required<ElementRef<HTMLElement>>('ball');
  readonly enabled = signal(false);
  readonly active = signal(false);
  readonly hovering = signal(false);

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
      this.enabled.set(true);
      document.body.style.cursor = 'none';

      const ball = this.ball().nativeElement;
      const move = (e: MouseEvent) => {
        ball.style.transform = `translate(${e.clientX - 12}px, ${e.clientY - 12}px)`;
        if (!this.active()) this.active.set(true);
      };
      const over = (e: MouseEvent) => {
        const hovering = e.target instanceof Element && !!e.target.closest(INTERACTIVE);
        if (hovering !== this.hovering()) this.hovering.set(hovering);
      };
      const leave = () => this.active.set(false);

      document.addEventListener('mousemove', move, { passive: true });
      document.addEventListener('mouseover', over, { passive: true });
      document.documentElement.addEventListener('mouseleave', leave);
      destroyRef.onDestroy(() => {
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseover', over);
        document.documentElement.removeEventListener('mouseleave', leave);
        document.body.style.cursor = '';
      });
    });
  }
}
