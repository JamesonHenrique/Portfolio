import { PlatformLocation } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { I18nService } from './i18n.service';

function serviceAt(pathname: string) {
  TestBed.configureTestingModule({
    providers: [
      { provide: Router, useValue: { events: EMPTY } },
      { provide: PlatformLocation, useValue: { pathname } }
    ]
  });
  return TestBed.inject(I18nService);
}

describe('I18nService', () => {
  it('starts in Portuguese on Portuguese URLs', () => {
    const i18n = serviceAt('/projetos/newgram');
    expect(i18n.lang()).toBe('pt');
    expect(i18n.content().contact.title).toBe('VAMOS CONVERSAR');
  });

  it('starts in English on /en URLs, before any navigation', () => {
    const i18n = serviceAt('/en/projects/newgram');
    expect(i18n.lang()).toBe('en');
    expect(i18n.content().contact.title).toBe("LET'S TALK");
  });
});
