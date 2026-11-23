import { PlatformLocation } from '@angular/common';
import { Component, DestroyRef, afterNextRender, computed, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { I18nService } from '../../services/i18n.service';
import { InspectionService } from '../../services/inspection.service';

type NavKey = 'projetos' | 'sobre' | 'contato';

@Component({
  selector: 'app-navigation',
  imports: [RouterLink],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  private readonly router = inject(Router);
  readonly c = inject(I18nService).content;
  readonly inspection = inject(InspectionService);

  readonly links: { id: NavKey; label: NavKey }[] = [
    { id: 'projetos', label: 'projetos' },
    { id: 'sobre', label: 'sobre' },
    { id: 'contato', label: 'contato' }
  ];

  readonly currentPath = signal<string>(inject(PlatformLocation).pathname || '/');
  readonly activeSection = signal<string>('inicio');
  readonly menuOpen = signal(false);
  readonly scrollProgress = signal(0);

  /** Route-aware language switch: keeps visitors on the equivalent case study when switching languages. */
  readonly otherLangPath = computed(() => {
    const clean = this.currentPath().split(/[?#]/)[0];
    const ptCase = /^\/projetos\/([^/]+)$/.exec(clean);
    if (ptCase) return `/en/projects/${ptCase[1]}`;
    const enCase = /^\/en\/projects\/([^/]+)$/.exec(clean);
    if (enCase) return `/projetos/${enCase[1]}`;
    return this.c().otherHome;
  });

  constructor() {
    const destroyRef = inject(DestroyRef);

    const sub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentPath.set(event.urlAfterRedirects);
        this.menuOpen.set(false);
      }
    });
    destroyRef.onDestroy(() => sub.unsubscribe());

    afterNextRender(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      let rafId = 0;

      const updateScroll = () => {
        rafId = 0;
        const doc = document.documentElement;
        const max = doc.scrollHeight - window.innerHeight;
        const ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
        this.scrollProgress.set(reduced ? 0 : ratio);

        const sections = ['inicio', 'projetos', 'sobre', 'contato'];
        const offset = 120;
        let current = 'inicio';
        for (const id of sections) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= offset) {
            current = id;
          }
        }
        this.activeSection.set(current);
      };

      const onScroll = () => {
        if (!rafId) rafId = window.requestAnimationFrame(updateScroll);
      };

      const onKeydown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          if (this.menuOpen()) this.menuOpen.set(false);
          else if (this.inspection.enabled()) this.inspection.set(false);
        }
      };

      updateScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });
      window.addEventListener('keydown', onKeydown);

      destroyRef.onDestroy(() => {
        if (rafId) window.cancelAnimationFrame(rafId);
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
        window.removeEventListener('keydown', onKeydown);
      });
    });
  }

  toggleMenu() {
    this.menuOpen.update((v) => !v);
  }

  closeMenu() {
    this.menuOpen.set(false);
  }
}
