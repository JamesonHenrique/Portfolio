import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-hero',
  imports: [RouterLink],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  readonly c = inject(I18nService).content;
  readonly selectedIndex = signal(0);

  readonly activeProject = computed(() => {
    const list = this.c().projects.flagships;
    return list[this.selectedIndex()] ?? list[0];
  });

  selectProject(index: number) {
    this.selectedIndex.set(index);
  }

  onTabKeydown(event: KeyboardEvent, index: number) {
    const count = this.c().projects.flagships.length;
    if (!count) return;
    let next = -1;
    if (event.key === 'ArrowRight') next = (index + 1) % count;
    else if (event.key === 'ArrowLeft') next = (index - 1 + count) % count;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = count - 1;
    if (next < 0) return;

    event.preventDefault();
    this.selectedIndex.set(next);
    const slug = this.c().projects.flagships[next]?.slug;
    if (slug && typeof document !== 'undefined') {
      document.getElementById(`hero-tab-${slug}`)?.focus();
    }
  }
}
