import { Component, ElementRef, HostListener, Inject, PLATFORM_ID, Renderer2, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-cursor',
  standalone: true,
  imports: [],
  template: `
    <div
      class="fixed w-6 h-6 rounded-full bg-purple-500 mix-blend-difference pointer-events-none z-50 animate-pulse"
      #cursorElement
    ></div>
  `,
  styles: [`
    :host {
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
    }
  `],
  styleUrl: './cursor.component.scss'
})
export class CursorComponent {
  @ViewChild('cursorElement', { static: true }) cursorElement!: ElementRef;

  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.renderer.setStyle(document.body, 'cursor', 'none');
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    if (isPlatformBrowser(this.platformId)) {
      this.moveCursor(e);
    }
  }

  private moveCursor(e: MouseEvent) {
    const x = e.clientX - 12;
    const y = e.clientY - 12;

    this.renderer.setStyle(
      this.cursorElement.nativeElement,
      'transform',
      `translate(${x}px, ${y}px)`
    );
  }

  @HostListener('document:mouseover', ['$event.target'])
  onHover(target: HTMLElement) {
    if (isPlatformBrowser(this.platformId)) {
      const interactiveElements = ['A', 'BUTTON', 'INPUT', 'TEXTAREA', 'SELECT'];
      if (interactiveElements.includes(target.tagName)) {
        this.renderer.addClass(this.cursorElement.nativeElement, 'scale-150');
      } else {
        this.renderer.removeClass(this.cursorElement.nativeElement, 'scale-150');
      }
    }
  }
}