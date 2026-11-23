import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProjectPageComponent } from './pages/project/project-page.component';

// Static paths only, so the prerender discovers every page without a routes file.
export const routes: Routes = [
  { path: '', component: HomeComponent, data: { lang: 'pt' } },
  { path: 'en', component: HomeComponent, data: { lang: 'en' } },
  { path: 'projetos/oportunizavaga', component: ProjectPageComponent, data: { lang: 'pt', slug: 'oportunizavaga' } },
  { path: 'projetos/newgram', component: ProjectPageComponent, data: { lang: 'pt', slug: 'newgram' } },
  {
    path: 'projetos/painel-de-maquinas',
    component: ProjectPageComponent,
    data: { lang: 'pt', slug: 'painel-de-maquinas' }
  },
  { path: 'en/projects/oportunizavaga', component: ProjectPageComponent, data: { lang: 'en', slug: 'oportunizavaga' } },
  { path: 'en/projects/newgram', component: ProjectPageComponent, data: { lang: 'en', slug: 'newgram' } },
  {
    path: 'en/projects/painel-de-maquinas',
    component: ProjectPageComponent,
    data: { lang: 'en', slug: 'painel-de-maquinas' }
  },
  // Vercel handles direct requests to unknown URLs. This fallback is for client-side navigation.
  { path: '**', redirectTo: '' }
];
