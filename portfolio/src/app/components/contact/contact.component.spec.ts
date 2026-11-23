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

  it('renders the direct mailto link and copy button', () => {
    const link = el.querySelector<HTMLAnchorElement>('a.outro-mail');
    expect(link?.getAttribute('href')).toBe('mailto:jameson.henrique.dev@gmail.com');
    expect(el.querySelector('button.outro-copy')?.textContent?.trim()).toBe('Copiar e-mail');
  });

  it('copies the email to the clipboard and updates button state', async () => {
    const writeText = jasmine.createSpy('writeText').and.resolveTo();
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });

    await fixture.componentInstance.copyEmail();
    fixture.detectChanges();

    expect(writeText).toHaveBeenCalledWith('jameson.henrique.dev@gmail.com');
    expect(fixture.componentInstance.copied()).toBeTrue();
    expect(el.querySelector('button.outro-copy')?.textContent?.trim()).toBe('Copiado');
  });
});
