import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and render concise bio, portrait and profile links', () => {
    expect(component).toBeTruthy();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('IMD/UFRN');
    expect(el.querySelector('.polaroid img')?.getAttribute('src')).toBe('/about-me.jpg');
    expect(el.querySelectorAll('.about-links a').length).toBe(3);
    expect(el.querySelector('.about-intro')?.textContent).toContain('Curso Bacharelado em Tecnologia da Informação');
    const experience = el.querySelector('#experiencia');
    expect(experience?.querySelectorAll('li').length).toBe(3);
    expect(experience?.textContent).toContain('Wolfacilitates C&M');
    expect(experience?.textContent).toContain('Duarte e Almeida Advogados');
  });
});
