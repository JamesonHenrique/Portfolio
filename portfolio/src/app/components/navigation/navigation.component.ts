import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../services/i18n.service';

type NavLabel = 'inicio' | 'sobre' | 'skills' | 'projetos' | 'contato' | 'rodape';

@Component({
  selector: 'app-navigation',
  imports: [RouterLink],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  readonly c = inject(I18nService).content;

  // Same dots, shapes and colors as before; links point to the home of the current language,
  // so they also work from the project pages.
  readonly dots: { id: string; label: NavLabel; shape: string }[] = [
    { id: 'inicio', label: 'inicio', shape: 'shape-star bg-purple-700' },
    { id: 'sobre', label: 'sobre', shape: 'shape-diamond bg-purple-600' },
    { id: 'skills', label: 'skills', shape: 'shape-hexagon bg-purple-500' },
    { id: 'projetos', label: 'projetos', shape: 'shape-octagon bg-purple-400' },
    { id: 'contato', label: 'contato', shape: 'rounded-full bg-purple-300' },
    { id: 'footer', label: 'rodape', shape: 'shape-blob bg-purple-200' }
  ];
}
