import { CommonModule } from '@angular/common';
import { Component, HostListener, ViewChild, ElementRef, Inject, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-skills',
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {
  @ViewChild('skillsSection') skillsSection!: ElementRef;
  constructor(private cdRef: ChangeDetectorRef) {}
  isVisible = false;
  animationTriggered = false;
  titleLetters: string[] = [];

  backendSkills = [
    { name: 'Spring Boot', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg', level: 95 },
    { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', level: 90 },
    { name: 'Junit', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/junit/junit-original.svg', level: 90 },
    { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', level: 88 },
    { name: 'Keycloak', icon: 'https://img.jsdelivr.com/github.com/keycloak.png', level: 85 }
  ];

  frontendSkills = [
    { name: 'Angular', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg', level: 93 },

    { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', level: 90 },
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', level: 90 },
    { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg', level: 87 },
    { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', level: 95 }
  ];

  tools = [
    { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
    { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
    { name: 'AWS', icon: 'https://logos-world.net/wp-content/uploads/2021/08/Amazon-Web-Services-AWS-Logo.png' },
    { name: 'CI/CD', icon: 'https://images.seeklogo.com/logo-png/42/2/github-actions-logo-png_seeklogo-428028.png' }
  ];

  ngOnInit() {
    this.titleLetters = 'HABILIDADES TECNICAS'.split('');
    this.cdRef.detectChanges();
  }

  @HostListener('window:scroll')
  checkScroll() {
    if (this.animationTriggered) return;

    const element = this.skillsSection.nativeElement;
    const rect = element.getBoundingClientRect();
    const isVisible = (rect.top <= window.innerHeight * 0.8) && (rect.bottom >= 0);

    if (isVisible) {
      this.isVisible = true;
      this.animationTriggered = true;

      setTimeout(() => {
        this.animateProgressBars();
      }, 100);
    }
  }

  animateProgressBars() {

  }
}
