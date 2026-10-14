import { DeferBlockBehavior, DeferBlockState, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { routes } from './app.routes';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter(routes)],
      deferBlockBehavior: DeferBlockBehavior.Manual
    }).compileComponents();
  });

  // Below-the-fold sections are @defer blocks (incremental hydration); render them explicitly.
  async function renderAll(harness: RouterTestingHarness) {
    for (const block of await harness.fixture.getDeferBlocks()) {
      await block.render(DeferBlockState.Complete);
    }
    return harness.routeNativeElement as HTMLElement;
  }

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render every home section in Portuguese at /', async () => {
    const el = await renderAll(await RouterTestingHarness.create('/'));
    for (const id of ['inicio', 'sobre', 'skills', 'projetos', 'contato']) {
      expect(el.querySelector('#' + id))
        .withContext(id)
        .not.toBeNull();
    }
    expect(el.querySelector('h1')?.getAttribute('aria-label')).toBe('Jameson Henrique');
    expect(el.querySelector('#sobre h2')?.getAttribute('aria-label')).toBe('SOBRE MIM');
  });

  it('should render the English home at /en', async () => {
    const el = await renderAll(await RouterTestingHarness.create('/en'));
    expect(el.textContent).toContain('Automation Development Intern (RPA)');
    expect(el.querySelector('#sobre h2')?.getAttribute('aria-label')).toBe('ABOUT ME');
  });

  it('should render a project page', async () => {
    const harness = await RouterTestingHarness.create('/projetos/newgram');
    expect((harness.routeNativeElement as HTMLElement).querySelector('h1')?.textContent).toContain('Newgram');
  });
});
