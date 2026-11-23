import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HeroComponent } from './hero.component';

describe('HeroComponent', () => {
  let component: HeroComponent;
  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(HeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and show the first flagship system by default', () => {
    expect(component).toBeTruthy();
    expect(component.activeProject().slug).toBe('oportunizavaga');
  });

  it('should switch active flagship system when selecting a tab', () => {
    component.selectProject(1);
    fixture.detectChanges();
    expect(component.activeProject().slug).toBe('painel-de-maquinas');
    expect(fixture.nativeElement.textContent).toContain('Painel de Máquinas');
  });
});
