import { ChangeDetectorRef, Component, DestroyRef, inject, signal } from '@angular/core';
import { I18nService } from '../../services/i18n.service';

// FormSubmit AJAX endpoint: answers with JSON instead of redirecting the visitor away.
const FORM_ENDPOINT = 'https://formsubmit.co/ajax/jameson.henrique.dev@gmail.com';
const EMAIL_ADDRESS = 'jameson.henrique.dev@gmail.com';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);

  readonly c = inject(I18nService).content;
  readonly emailAddress = EMAIL_ADDRESS;
  readonly copied = signal(false);
  status: 'idle' | 'sending' | 'sent' | 'error' = 'idle';

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

  async onSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    if (!form.reportValidity()) return;

    this.status = 'sending';
    this.cdr.detectChanges();
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form)
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok || String(body.success) !== 'true') throw new Error(body.message ?? response.statusText);
      this.status = 'sent';
      form.reset();
    } catch {
      this.status = 'error';
    }
    this.cdr.detectChanges();
  }
}
