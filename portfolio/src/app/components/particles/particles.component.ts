import { Component, OnDestroy, OnInit, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-particles',
  standalone: true,
  template: `<div id="particles-js" class="fixed inset-0 z-0"></div>`,
})
export class ParticlesComponent implements OnInit, OnDestroy {
  private destroyed = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private zone: NgZone
  ) {}

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    // Respect users who asked the OS for less motion: no canvas animation at all.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // The animation loop calls requestAnimationFrame every frame; inside the Angular zone each
    // frame would trigger change detection and the app would never become stable.
    this.zone.runOutsideAngular(() => this.loadParticles());
  }

  private loadParticles() {
    if (typeof (window as any).particlesJS !== 'function') {
      const script = document.createElement('script');
      // Self-hosted copy of particles.js 2.0.0 (public/vendor): no third-party CDN at runtime.
      script.src = 'vendor/particles-2.0.0.min.js';
      script.onload = () => this.initializeParticles();
      document.head.appendChild(script);
    } else {
      this.initializeParticles();
    }
  }

  ngOnDestroy() {
    this.destroyed = true;
  }

  private initializeParticles() {
    // The script loads asynchronously; the container may be gone by then (e.g. component destroyed).
    if (this.destroyed || !document.getElementById('particles-js')) return;
    // Small screens are usually phones: fewer particles and no connecting lines,
    // which are the expensive part (O(n²) distance checks every frame).
    const isSmallScreen = window.matchMedia('(max-width: 768px)').matches;
    (window as any).particlesJS("particles-js", {
      particles: {
        number: { value: isSmallScreen ? 20 : 45, density: { enable: true, value_area: 800 } },
        color: { value: "#a855f7" },
        shape: {
          type: ["circle", "triangle", "polygon"],
          stroke: { width: 0, color: "#000000" },
          polygon: { nb_sides: 6 },
        },
        opacity: {
          value: 0.3,
          random: true,
          anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false },
        },
        size: {
          value: 3,
          random: true,
          anim: { enable: false, speed: 40, size_min: 0.1, sync: false },
        },
        line_linked: {
          enable: !isSmallScreen,
          distance: 150,
          color: "#7e22ce",
          opacity: 0.2,
          width: 1,
        },
        move: {
          enable: true,
          speed: 1.2,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: { enable: false, rotateX: 600, rotateY: 1200 },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: !isSmallScreen, mode: "grab" },
          onclick: { enable: false, mode: "push" },
          resize: true,
        },
        modes: {
          grab: { distance: 140, line_linked: { opacity: 0.5 } },
          bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
          repulse: { distance: 200, duration: 0.4 },
          push: { particles_nb: 4 },
          remove: { particles_nb: 2 },
        },
      },
      retina_detect: false,
    });
  }
}