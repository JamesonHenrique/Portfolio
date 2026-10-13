import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { onFirstView } from '../../utils/in-view';

interface Skill {
  name: string;
  /** SVG in /public/icons (self-hosted: Devicon and Simple Icons, pinned versions). */
  icon: string;
}

interface SkillGroup {
  title: string;
  skills: Skill[];
  /** Concepts without a logo, shown as chips under the icons. */
  extras?: string[];
}

@Component({
  selector: 'app-skills',
  imports: [],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('skillsSection') skillsSection!: ElementRef<HTMLElement>;
  isVisible = false;
  private stopObserving = () => {};

  constructor(private cdr: ChangeDetectorRef) {}

  // Same tools as the "Habilidades" block of the CV.
  groups: SkillGroup[] = [
    {
      title: 'AUTOMAÇÃO E IA',
      skills: [
        { name: 'Make', icon: 'make' },
        { name: 'n8n', icon: 'n8n' },
        { name: 'Python', icon: 'python' },
        { name: 'Gemini', icon: 'gemini' },
        { name: 'Google Workspace', icon: 'googleworkspace' }
      ],
      extras: ['APIs REST', 'Webhooks', 'OAuth2', 'Idempotência', 'Paginação', 'Prompt com saída estruturada']
    },
    {
      title: 'BACKEND',
      skills: [
        { name: 'Java', icon: 'java' },
        { name: 'Spring Boot', icon: 'spring' },
        { name: 'PostgreSQL', icon: 'postgresql' },
        { name: 'MySQL', icon: 'mysql' },
        { name: 'MongoDB', icon: 'mongodb' },
        { name: 'Keycloak', icon: 'keycloak' },
        { name: 'JUnit', icon: 'junit' }
      ],
      extras: ['Spring Security', 'Spring AI', 'Flyway', 'Mockito']
    },
    {
      title: 'FRONTEND',
      skills: [
        { name: 'Angular', icon: 'angular' },
        { name: 'TypeScript', icon: 'typescript' },
        { name: 'JavaScript', icon: 'javascript' },
        { name: 'RxJS', icon: 'rxjs' },
        { name: 'Tailwind CSS', icon: 'tailwind' }
      ]
    },
    {
      title: 'INFRA E FERRAMENTAS',
      skills: [
        { name: 'Docker', icon: 'docker' },
        { name: 'Git', icon: 'git' },
        { name: 'GitHub Actions', icon: 'githubactions' },
        { name: 'Linux', icon: 'linux' },
        { name: 'AWS (S3)', icon: 'aws' }
      ]
    }
  ];

  integratedSystems = [
    'ADVBOX', 'Coda', 'Octadesk (WhatsApp)', 'ZapSign', 'Banco Inter (API PJ)', 'Google Workspace', 'API4Com', 'Typebot'
  ];

  ngAfterViewInit() {
    this.stopObserving = onFirstView(this.skillsSection.nativeElement, this.cdr, () => (this.isVisible = true));
  }

  ngOnDestroy() {
    this.stopObserving();
  }
}
