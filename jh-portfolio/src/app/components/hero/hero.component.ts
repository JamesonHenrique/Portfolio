import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ParticlesComponent } from "../particles/particles.component";

@Component({
  selector: 'app-hero',
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  letters = [
    { char: 'J', color: 'purple-400' },
    { char: 'A', color: 'purple-300' },
    { char: 'M', color: 'purple-200' },
    { char: 'E', color: 'purple-100' },
    { char: 'S', color: 'white' },
    { char: 'O', color: 'purple-100' },
    { char: 'N', color: 'purple-200' },
    { char: ' ', color: 'transparent' }, // Espaço entre nome e sobrenome
    { char: 'H', color: 'purple-300' },
    { char: 'E', color: 'purple-400' },
    { char: 'N', color: 'purple-500' },
    { char: 'R', color: 'purple-600' },
    { char: 'I', color: 'purple-700' },
    { char: 'Q', color: 'purple-800' },
    { char: 'U', color: 'purple-900' },
    { char: 'E', color: 'purple-950' }
  ];
}
