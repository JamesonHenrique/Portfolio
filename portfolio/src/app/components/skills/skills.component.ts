import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { onFirstView } from '../../utils/in-view';

interface SkillGroup {
  title: string;
  items: string[];
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

  // Same groups as the "Habilidades" block of the CV.
  groups: SkillGroup[] = [
    {
      title: 'AUTOMAÇÃO E INTEGRAÇÃO',
      items: ['Make', 'n8n', 'APIs REST', 'Webhooks', 'JSON', 'OAuth2', 'Tratamento de erro', 'Paginação', 'Idempotência']
    },
    {
      title: 'DESENVOLVIMENTO',
      items: ['Java', 'Spring Boot', 'Spring Security', 'Spring AI', 'Angular', 'TypeScript', 'JavaScript', 'Python', 'RxJS', 'Tailwind CSS']
    },
    {
      title: 'DADOS, INFRA E QUALIDADE',
      items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Flyway', 'Docker', 'GitHub Actions', 'Linux', 'AWS (S3)', 'Keycloak', 'JUnit', 'Mockito']
    },
    {
      title: 'IA APLICADA',
      items: ['Gemini API', 'Engenharia de prompt com saída estruturada', 'Agentes com LLM']
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
