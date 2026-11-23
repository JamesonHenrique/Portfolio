import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CaseSlug, FlagshipProject } from '../../content/types';
import { I18nService } from '../../services/i18n.service';
import { TransitionService } from '../../services/transition.service';

@Component({
  selector: 'app-hero',
  imports: [RouterLink],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  readonly c = inject(I18nService).content;
  readonly transition = inject(TransitionService);
  readonly selectedIndex = signal(0);

  readonly tiltX = signal(0);
  readonly tiltY = signal(0);
  readonly rotX = signal(0);
  readonly rotY = signal(0);

  private pointerDown = false;
  private startX = 0;

  readonly activeProject = computed(() => {
    const list = this.c().projects.flagships;
    return list[this.selectedIndex()] ?? list[0];
  });

  selectProject(index: number) {
    const count = this.c().projects.flagships.length;
    if (!count) return;
    this.selectedIndex.set((index + count) % count);
  }

  prev() {
    this.selectProject(this.selectedIndex() - 1);
  }

  next() {
    this.selectProject(this.selectedIndex() + 1);
  }

  orderFor(index: number): number {
    const count = this.c().projects.flagships.length;
    return (index - this.selectedIndex() + count) % count;
  }

  srcset(project: FlagshipProject): string {
    const small = project.image.replace('.webp', '-600.webp');
    return `/${small} 600w, /${project.image} ${project.imageWidth}w`;
  }

  prepareCase(slug: CaseSlug) {
    this.transition.prepare(slug, 'hero');
  }

  onStageKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.next();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.prev();
    }
  }

  onPointerDown(event: PointerEvent) {
    this.pointerDown = true;
    this.startX = event.clientX;
  }

  onPointerUp(event: PointerEvent) {
    if (this.pointerDown && Math.abs(event.clientX - this.startX) > 44) {
      if (event.clientX < this.startX) this.next();
      else this.prev();
    }
    this.pointerDown = false;
  }

  onPointerMove(event: PointerEvent) {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = event.currentTarget as HTMLElement | null;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (event.clientX - r.left) / r.width - 0.5;
    const y = (event.clientY - r.top) / r.height - 0.5;
    this.tiltX.set(x * 11);
    this.tiltY.set(y * 12);
    this.rotX.set(-y * 5);
    this.rotY.set(x * 7);
  }

  onPointerLeave() {
    this.pointerDown = false;
    this.tiltX.set(0);
    this.tiltY.set(0);
    this.rotX.set(0);
    this.rotY.set(0);
  }
}
