import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SmoothScrollDirective } from './diretives/smoothScroll.directive';
import { ParticlesComponent } from './components/particles/particles.component';
import { CursorComponent } from './components/cursor/cursor.component';
import { I18nService } from './services/i18n.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    FooterComponent,
    NavigationComponent,
    SmoothScrollDirective,
    ParticlesComponent,
    CursorComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  readonly i18n = inject(I18nService);
}
