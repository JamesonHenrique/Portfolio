import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProjectPageComponent } from './pages/project/project-page.component';

// Static paths only, so the prerender discovers every page without a routes file.
export const routes: Routes = [
  { path: '', component: HomeComponent, data: { lang: 'pt' } },
  { path: 'en', component: HomeComponent, data: { lang: 'en' } },
  { path: 'projetos/oportunizavaga', component: ProjectPageComponent, data: { lang: 'pt', slug: 'oportunizavaga' } },
  { path: 'projetos/newgram', component: ProjectPageComponent, data: { lang: 'pt', slug: 'newgram' } },
  { path: 'en/projects/oportunizavaga', component: ProjectPageComponent, data: { lang: 'en', slug: 'oportunizavaga' } },
  { path: 'en/projects/newgram', component: ProjectPageComponent, data: { lang: 'en', slug: 'newgram' } },
  // Vercel answers unknown paths with the prerendered home, so redirect (a "not found" component
  // would not match the served HTML and break hydration).
  { path: '**', redirectTo: '' }
];
