import { Component, DestroyRef, ElementRef, afterNextRender, inject, viewChild } from '@angular/core';

type Shape = 'circle' | 'triangle' | 'hexagon';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  shape: Shape;
}

/**
 * Background particles, drawn on a canvas without third-party code. Reproduces the previous
 * particles.js setup: density-based count (45 per 800k px² on desktop, 20 on small screens), purple
 * circles/triangles/hexagons, links between nearby particles and a "grab" effect towards the mouse
 * (desktop only). Runs outside Angular change detection and is skipped when the user prefers
 * reduced motion.
 */
@Component({
  selector: 'app-particles',
  template: `<canvas #canvas class="fixed inset-0 z-0 pointer-events-none" aria-hidden="true"></canvas>`
})
export class ParticlesComponent {
  private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      // Decorative: start once the browser is idle, so it never adds to the startup task.
      let stop: (() => void) | undefined;
      const begin = () => (stop = this.start(this.canvas().nativeElement));
      const idle = 'requestIdleCallback' in window ? window.requestIdleCallback(begin, { timeout: 2000 }) : undefined;
      const timer = idle === undefined ? window.setTimeout(begin, 800) : undefined;
      destroyRef.onDestroy(() => {
        if (idle !== undefined) window.cancelIdleCallback(idle);
        if (timer !== undefined) window.clearTimeout(timer);
        stop?.();
      });
    });
  }

  private start(canvas: HTMLCanvasElement): () => void {
    const ctx = canvas.getContext('2d');
    if (!ctx) return () => undefined;

    // Small screens are usually phones: fewer particles and no links (the O(n²) part).
    const small = window.matchMedia('(max-width: 768px)').matches;
    const config = {
      perArea: small ? 20 : 45,
      areaUnit: 800, // particles.js "value_area", in thousands of px²
      color: '168, 85, 247', // #a855f7
      lineColor: '126, 34, 206', // #7e22ce
      maxOpacity: 0.3,
      maxRadius: 3,
      speed: 1.2,
      linkDistance: 150,
      linkOpacity: 0.2,
      links: !small,
      grabDistance: 140,
      grabOpacity: 0.5,
      grab: !small
    };
    const shapes: Shape[] = ['circle', 'triangle', 'hexagon'];
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let mouse: { x: number; y: number } | null = null;
    let frame = 0;

    const spawn = (): Particle => {
      // particles.js "random" direction and speed: each axis in [-0.5, 0.5], scaled by a random factor.
      const vx = (Math.random() - 0.5) * Math.random();
      const vy = (Math.random() - 0.5) * Math.random();
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx,
        vy,
        radius: Math.random() * config.maxRadius,
        opacity: Math.random() * config.maxOpacity,
        shape: shapes[Math.floor(Math.random() * shapes.length)]
      };
    };

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      const count = Math.round((config.perArea * (width * height)) / 1000 / config.areaUnit);
      particles = Array.from({ length: count }, spawn);
    };

    const drawShape = (p: Particle) => {
      ctx.fillStyle = `rgba(${config.color}, ${p.opacity})`;
      ctx.beginPath();
      if (p.shape === 'circle') {
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      } else {
        const sides = p.shape === 'triangle' ? 3 : 6;
        for (let i = 0; i < sides; i++) {
          const angle = (i / sides) * Math.PI * 2 - Math.PI / 2;
          const px = p.x + Math.cos(angle) * p.radius * 1.3;
          const py = p.y + Math.sin(angle) * p.radius * 1.3;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
      }
      ctx.fill();
    };

    const line = (ax: number, ay: number, bx: number, by: number, opacity: number) => {
      ctx.strokeStyle = `rgba(${config.lineColor}, ${opacity})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(ax, ay);
      ctx.lineTo(bx, by);
      ctx.stroke();
    };

    const step = () => {
      ctx.clearRect(0, 0, width, height);
      const move = config.speed / 2;
      for (const p of particles) {
        p.x += p.vx * move;
        p.y += p.vy * move;
        // "out" mode: leaving one edge re-enters from the opposite one.
        if (p.x - p.radius > width) p.x = -p.radius;
        else if (p.x + p.radius < 0) p.x = width + p.radius;
        if (p.y - p.radius > height) p.y = -p.radius;
        else if (p.y + p.radius < 0) p.y = height + p.radius;
        drawShape(p);
      }

      if (config.links) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const a = particles[i];
            const b = particles[j];
            const dist = Math.hypot(a.x - b.x, a.y - b.y);
            if (dist <= config.linkDistance) {
              line(a.x, a.y, b.x, b.y, config.linkOpacity - (dist * config.linkOpacity) / config.linkDistance);
            }
          }
        }
      }

      if (config.grab && mouse) {
        for (const p of particles) {
          const dist = Math.hypot(p.x - mouse.x, p.y - mouse.y);
          if (dist <= config.grabDistance) {
            line(p.x, p.y, mouse.x, mouse.y, config.grabOpacity - (dist * config.grabOpacity) / config.grabDistance);
          }
        }
      }
      frame = requestAnimationFrame(step);
    };

    const onMove = (e: MouseEvent) => (mouse = { x: e.clientX, y: e.clientY });
    const onLeave = () => (mouse = null);

    resize();
    window.addEventListener('resize', resize, { passive: true });
    if (config.grab) {
      window.addEventListener('mousemove', onMove, { passive: true });
      document.documentElement.addEventListener('mouseleave', onLeave);
    }
    frame = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }
}
