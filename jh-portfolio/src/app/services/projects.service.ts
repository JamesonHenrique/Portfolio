import { Injectable } from '@angular/core';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  getProjects(): Project[] {
    return [
      {
        title: 'NEXUS',
        image: 'assets/images/nexus.jpg',
        description: 'Sistema completo com Spring Boot e Angular...',
        technologies: ['Spring Boot', 'Angular', 'WebSockets'],
      },
    ];
  }
  constructor() {}
}
