import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { onFirstView } from '../../utils/in-view';

interface Project {
  title: string;
  name: string;
  description: string;
  techs: string[];
  /** Screenshot in /public. */
  image: string;
  /** Public repository. Client projects have no public code. */
  url?: string;
  /** Live demo. */
  demo?: string;
  /** One technical decision, taken from the project's own docs. */
  decision?: string;
  note?: string;
}

@Component({
  selector: 'app-projects',
  imports: [],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('projectsSection') projectsSection!: ElementRef<HTMLElement>;
  isVisible = false;
  private stopObserving = () => {};

  constructor(private cdr: ChangeDetectorRef) {}

  projects: Project[] = [
    {
      title: 'OPORTUNIZAVAGA',
      name: 'Agente open-source de candidatura a vagas',
      description:
        'Busca, filtra e se candidata a vagas em portais brasileiros usando modelos de IA gratuitos e um navegador real, com custo zero de operação. Roda sem supervisão: reinicia sozinho, guarda o histórico fora da IA, troca entre seis provedores de IA quando um atinge o limite e nunca inventa dado do candidato.',
      techs: ['Python', 'Shell', 'Node.js', 'Chrome (CDP)', 'LLMs', 'GitHub Actions', 'Docker'],
      image: 'oportunizavaga_print.webp',
      decision:
        'Um supervisor idempotente roda a cada 5 minutos e religa o loop e o Chrome se caírem; o estado fica em JSON durável, fora da IA.',
      url: 'https://github.com/JamesonHenrique/OportunizaVaga',
      demo: 'https://oportunizavaga-demo.vercel.app'
    },
    {
      title: 'PAINEL DE MÁQUINAS',
      name: 'Monitoramento de equipamentos em tempo real',
      description:
        'Sistema completo (backend e frontend) em uso pelo cliente no chão de fábrica. Substituiu a conferência manual: a equipe vê em tempo real quais máquinas estão paradas, em operação, em manutenção ou sem operador.',
      techs: ['Java', 'Spring Boot', 'Angular', 'TypeScript', 'MongoDB', 'RxJS', 'Tailwind CSS'],
      image: 'painel-de-maquinas_print.webp',
      note: 'Projeto freelance: código do cliente, não público.'
    },
    {
      title: 'NEWGRAM',
      name: 'Rede social full stack',
      description:
        'Compartilhamento de fotos e stories com feed com descoberta, seguidores, favoritos e destaques. Autenticação JWT e upload de imagens no S3.',
      techs: ['Java', 'Spring Boot', 'Angular', 'TypeScript', 'PostgreSQL', 'JWT', 'AWS S3', 'Docker', 'Flyway', 'Tailwind CSS'],
      image: 'newgram_print.webp',
      decision: 'Mídia no AWS S3 entregue por presigned URLs com expiração configurável; schema versionado com Flyway.',
      url: 'https://github.com/JamesonHenrique/Newgram',
      demo: 'https://newgram-nine.vercel.app/'
    },
    {
      title: 'ALGAMONEY',
      name: 'Gestão financeira pessoal',
      description: 'Controle de receitas e despesas com dashboard e relatórios.',
      techs: ['Java', 'Spring Boot', 'Angular', 'PostgreSQL', 'JWT', 'JasperReports', 'Chart.js'],
      image: 'algamoney_print.webp',
      url: 'https://github.com/JamesonHenrique/Algamoney'
    },
    {
      title: 'WAVECHAT',
      name: 'Chat em tempo real',
      description: 'Mensagens instantâneas via WebSocket, com autenticação pelo Keycloak.',
      techs: ['Java', 'Spring Boot', 'Angular', 'WebSocket', 'PostgreSQL', 'Keycloak', 'Docker'],
      image: 'wavechat_print.webp',
      url: 'https://github.com/JamesonHenrique/WaveChat'
    },
    {
      title: 'BOOKLORE',
      name: 'Biblioteca pessoal',
      description: 'Coleção de livros com autenticação por e-mail e sistema de empréstimos.',
      techs: ['Java', 'Spring Boot', 'Angular', 'PostgreSQL', 'JWT', 'Docker'],
      image: 'booklore_print.webp',
      url: 'https://github.com/JamesonHenrique/BookLore'
    }
  ];

  ngAfterViewInit() {
    this.stopObserving = onFirstView(this.projectsSection.nativeElement, this.cdr, () => (this.isVisible = true));
  }

  ngOnDestroy() {
    this.stopObserving();
  }
}
