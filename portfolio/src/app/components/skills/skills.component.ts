import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, ViewChild, inject } from '@angular/core';
import { onFirstView } from '../../utils/in-view';
import { I18nService } from '../../services/i18n.service';
import { Lang } from '../../content/types';

interface Skill {
  name: string;
  /** SVG in /public/icons (self-hosted: Devicon and Simple Icons, pinned versions). */
  icon: string;
}

interface SkillGroup {
  title: Record<Lang, string>;
  skills: Skill[];
  /** Concepts without a logo, shown as chips under the icons. */
  extras?: Record<Lang, string[]>;
}

@Component({
  selector: 'app-skills',
  imports: [],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent implements AfterViewInit, OnDestroy {
  private cdr = inject(ChangeDetectorRef);

  @ViewChild('skillsSection') skillsSection!: ElementRef<HTMLElement>;
  isVisible = false;
  readonly c = inject(I18nService).content;
  private stopObserving?: () => void;

  // Same tools as the "Habilidades" block of the CV.
  groups: SkillGroup[] = [
    {
      title: { pt: 'AUTOMAÇÃO E IA', en: 'AUTOMATION & AI' },
      skills: [
        { name: 'Make', icon: 'make' },
        { name: 'n8n', icon: 'n8n' },
        { name: 'Python', icon: 'python' },
        { name: 'Gemini', icon: 'gemini' },
        { name: 'Google Workspace', icon: 'googleworkspace' }
      ],
      extras: {
        pt: ['APIs REST', 'Webhooks', 'OAuth2', 'Idempotência', 'Paginação', 'Prompt com saída estruturada'],
        en: ['REST APIs', 'Webhooks', 'OAuth2', 'Idempotency', 'Pagination', 'Structured-output prompting']
      }
    },
    {
      title: { pt: 'BACKEND', en: 'BACKEND' },
      skills: [
        { name: 'Java', icon: 'java' },
        { name: 'Spring Boot', icon: 'spring' },
        { name: 'PostgreSQL', icon: 'postgresql' },
        { name: 'MySQL', icon: 'mysql' },
        { name: 'MongoDB', icon: 'mongodb' },
        { name: 'Keycloak', icon: 'keycloak' },
        { name: 'JUnit', icon: 'junit' }
      ],
      extras: { pt: ['Spring Security', 'Spring AI', 'Flyway', 'Mockito'], en: ['Spring Security', 'Spring AI', 'Flyway', 'Mockito'] }
    },
    {
      title: { pt: 'FRONTEND', en: 'FRONTEND' },
      skills: [
        { name: 'Angular', icon: 'angular' },
        { name: 'TypeScript', icon: 'typescript' },
        { name: 'JavaScript', icon: 'javascript' },
        { name: 'RxJS', icon: 'rxjs' },
        { name: 'Tailwind CSS', icon: 'tailwind' }
      ]
    },
    {
      title: { pt: 'INFRA E FERRAMENTAS', en: 'INFRA & TOOLS' },
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
    this.stopObserving?.();
  }
}
