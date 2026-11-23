import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NavigationComponent } from './navigation.component';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and toggle mobile navigation', () => {
    expect(component).toBeTruthy();
    expect(component.menuOpen()).toBeFalse();
    component.toggleMenu();
    expect(component.menuOpen()).toBeTrue();
    component.closeMenu();
    expect(component.menuOpen()).toBeFalse();
  });

  it('should compute equivalent language paths for case studies', () => {
    component.currentPath.set('/projetos/oportunizavaga');
    expect(component.otherLangPath()).toBe('/en/projects/oportunizavaga');
    component.currentPath.set('/en/projects/newgram');
    expect(component.otherLangPath()).toBe('/projetos/newgram');
  });
});
