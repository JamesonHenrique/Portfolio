import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-projects',
  imports: [CommonModule
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  isVisible = false;
  projects = [
     {
          title: 'Painel de máquinas',
          name: 'Freelancer',
          description: 'Um painel de monitoramento em tempo real para acompanhar o status de máquinas, permitindo a alteração dos estados de cada equipamento.',
          techs: [
            'Java','Typescript',
            'Spring Boot',
            'Angular',
            'TailwindCSS',
            'MongoDB',
          ],
          image: 'painel-de-maquinas_print.png',
          url: 'URL Indisponivel',

        },
    {
      title: 'NEWGRAM',
      name: 'Rede Social Moderna',
      description: 'Plataforma de compartilhamento de fotos e stories, com feed personalizado, sistema de seguidores, sistema de favoritos e criação de posts e destaques.',
      techs: ['Java','Typescript',
        'Spring Boot',
        'Angular',
        'TailwindCSS',
        'PostgreSQL',
        'JWT',
        'S3(AWS)',
        'Docker',
        'Flyway',
      ],
      image: 'newgram_print.png',
      url: 'https://github.com/JamesonHenrique/Newgram',

    },
    {
      title: 'ALGAMONEY',
      name: 'Sistema de Gestão Financeira Pessoal',
      description: 'Plataforma full stack de gerenciamento financeiro pessoal com dashboard, relatórios e controle de receitas e despesas.',
      techs: ['Java','Typescript','Spring Boot', 'Angular','Chart.js','PostgreSQL','TailwindCSS','JasperReports','JWT'],
      image: 'algamoney_print.png',
      url: 'https://github.com/JamesonHenrique/Algamoney'
    },

    {
      title: 'WAVECHAT',
      name: 'Chat em Tempo Real com WebSocket',
      description: 'Aplicação de chat em tempo real com implementação de WebSocket para comunicação instantânea entre usuários.',
      techs: ['Java','Typescript', 'Spring Boot', 'Angular', 'WebSocket','PostgreSQL', 'Keycloak','Bootstrap','Docker'],
      image: 'wavechat_print.png',
      url: 'https://github.com/JamesonHenrique/WaveChat'
    },
    {
      title: 'BOOKLORE',
      name: 'Gerenciador de Biblioteca Pessoal',
      description: 'Plataforma full-stack para gerenciamento de coleções de livros com autenticação via e-mail e sistema de empréstimos.',
      techs: ['Java','Typescript','Spring Boot', 'Angular Boot',  'PostgreSQL', 'Docker', 'JWT', 'DaisyUI'],
      image: 'booklore_print.png',
      url: 'https://github.com/JamesonHenrique/Booklore'
    }
  ];
  redirectTo(url: string) {
    window.open(url, '_blank');
  }

  ngOnInit() {
    this.checkVisibility();
  }

  @HostListener('window:scroll')
  checkVisibility() {
    if (this.isVisible) return;

    const projectsSection = document.getElementById('projetos');
    if (!projectsSection) return;

    const rect = projectsSection.getBoundingClientRect();
    const isVisible = (rect.top <= window.innerHeight * 0.7) && (rect.bottom >= 0);

    if (isVisible) {
      this.isVisible = true;
    }
  }
}
