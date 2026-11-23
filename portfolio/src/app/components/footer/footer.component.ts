import { PlatformLocation } from '@angular/common';
import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  private readonly router = inject(Router);
  readonly currentYear = new Date().getFullYear();
  readonly c = inject(I18nService).content;
  readonly currentPath = signal<string>(inject(PlatformLocation).pathname || '/');

  readonly links = [
    { id: 'projetos', label: 'projetos' },
    { id: 'sobre', label: 'sobre' },
    { id: 'skills', label: 'skills' },
    { id: 'contato', label: 'contato' }
  ] as const;

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
      }
    });
    destroyRef.onDestroy(() => sub.unsubscribe());
  }
}
