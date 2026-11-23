import { Component, DestroyRef, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../services/i18n.service';

const EMAIL_ADDRESS = 'jameson.henrique.dev@gmail.com';

@Component({
  selector: 'app-contact',
  imports: [RouterLink],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  private readonly destroyRef = inject(DestroyRef);

  readonly c = inject(I18nService).content;
  readonly emailAddress = EMAIL_ADDRESS;
  readonly copied = signal(false);

  private copyTimer?: number;

  constructor() {
    this.destroyRef.onDestroy(() => {
      if (this.copyTimer !== undefined && typeof window !== 'undefined') {
        window.clearTimeout(this.copyTimer);
      }
    });
  }

  async copyEmail() {
    if (typeof navigator === 'undefined' || !navigator.clipboard?.writeText) return;
    try {
      await navigator.clipboard.writeText(EMAIL_ADDRESS);
      this.copied.set(true);
      if (this.copyTimer !== undefined) window.clearTimeout(this.copyTimer);
      this.copyTimer = window.setTimeout(() => this.copied.set(false), 2000);
    } catch {
      this.copied.set(false);
    }
  }
}
