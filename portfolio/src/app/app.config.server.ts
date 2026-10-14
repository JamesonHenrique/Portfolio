import { provideServerRendering } from '@angular/ssr';
import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { appConfig } from './app.config';

// Used only at build time to prerender index.html (static HTML for search engines and link previews).
const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering()]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
