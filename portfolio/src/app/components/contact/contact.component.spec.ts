import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  let fixture: ComponentFixture<ContactComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent],
      providers: [provideRouter([])]
    }).compileComponents();
    fixture = TestBed.createComponent(ContactComponent);
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  function fillAndSubmit() {
    const set = (id: string, value: string) => ((el.querySelector('#' + id) as HTMLInputElement).value = value);
    set('name', 'Teste');
    set('email', 'teste@example.com');
    set('subject', 'Assunto');
    set('message', 'Mensagem');
    const form = el.querySelector('form')!;
    return fixture.componentInstance.onSubmit({ preventDefault: () => undefined, target: form } as unknown as Event);
  }

  it('posts to the FormSubmit AJAX endpoint and shows the success message', async () => {
    const fetchSpy = spyOn(window, 'fetch').and.resolveTo(new Response('{"success":"true"}', { status: 200 }));
    await fillAndSubmit();
    expect(fetchSpy.calls.mostRecent().args[0]).toBe('https://formsubmit.co/ajax/jameson.henrique.dev@gmail.com');
    expect(el.querySelector('[role=status]')?.textContent).toContain('Mensagem enviada');
    expect((el.querySelector('#name') as HTMLInputElement).value).toBe('');
  });

  it('shows the direct e-mail when FormSubmit rejects the message', async () => {
    spyOn(window, 'fetch').and.resolveTo(
      new Response('{"success":"false","message":"needs activation"}', { status: 200 })
    );
    await fillAndSubmit();
    expect(el.querySelector('[role=status]')?.textContent).toContain('jameson.henrique.dev@gmail.com');
  });

  it('shows the direct e-mail on network errors', async () => {
    spyOn(window, 'fetch').and.rejectWith(new TypeError('offline'));
    await fillAndSubmit();
    expect(el.querySelector('[role=status]')?.textContent).toContain('jameson.henrique.dev@gmail.com');
  });

  it('does not send an incomplete form', async () => {
    const fetchSpy = spyOn(window, 'fetch');
    const form = el.querySelector('form')!;
    spyOn(form, 'reportValidity').and.returnValue(false);
    await fixture.componentInstance.onSubmit({ preventDefault: () => undefined, target: form } as unknown as Event);
    expect(fetchSpy).not.toHaveBeenCalled();
  });
});
