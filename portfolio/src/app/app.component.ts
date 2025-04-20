import { Component, HostListener } from '@angular/core';
import { FooterComponent } from './components/footer/footer.component';
import { HeroComponent } from './components/hero/hero.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ContactComponent } from './components/contact/contact.component';
import { NavigationComponent } from "./components/navigation/navigation.component";
import { AboutComponent } from "./components/about/about.component";

import { CommonModule } from '@angular/common';
import { SmoothScrollDirective } from './diretives/smoothScroll.directive';
import { ParticlesComponent } from './components/particles/particles.component';
import { CursorComponent } from "./components/cursor/cursor.component";

@Component({
  selector: 'app-root',
  imports: [FooterComponent, HeroComponent, SkillsComponent, ProjectsComponent, ContactComponent, NavigationComponent, AboutComponent, SmoothScrollDirective, CommonModule, ParticlesComponent, CursorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{
  title = 'portfolio';

}
