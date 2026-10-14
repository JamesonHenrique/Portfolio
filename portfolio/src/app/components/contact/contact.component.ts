import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, ViewChild, inject } from '@angular/core';
import { onFirstView } from '../../utils/in-view';
import { I18nService } from '../../services/i18n.service';

// FormSubmit AJAX endpoint: answers with JSON instead of redirecting the visitor away.
// The first submission sends an activation e-mail to this address; until it is confirmed,
// messages are not delivered.
const FORM_ENDPOINT = 'https://formsubmit.co/ajax/jameson.henrique.dev@gmail.com';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements AfterViewInit, OnDestroy {
  @ViewChild('contactSection') contactSection!: ElementRef<HTMLElement>;
  isVisible = false;
  readonly c = inject(I18nService).content;
  status: 'idle' | 'sending' | 'sent' | 'error' = 'idle';
  private stopObserving = () => {};

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.stopObserving = onFirstView(this.contactSection.nativeElement, this.cdr, () => (this.isVisible = true));
  }

  ngOnDestroy() {
    this.stopObserving();
  }

  async onSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    if (!form.reportValidity()) return;

    this.status = 'sending';
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form)
      });
      const body = await response.json().catch(() => ({}));
      // FormSubmit returns success as the string "true" (or "false" with a message).
      if (!response.ok || String(body.success) !== 'true') throw new Error(body.message ?? response.statusText);
      this.status = 'sent';
      form.reset();
    } catch {
      this.status = 'error';
    }
    this.cdr.detectChanges();
  }
}
