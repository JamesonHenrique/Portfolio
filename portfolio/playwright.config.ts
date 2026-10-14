import { defineConfig, devices } from '@playwright/test';

// Runs against the production build (prerendered pages) served like Vercel. Build first: `npm run build`.
export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  fullyParallel: true,
  reporter: process.env['CI'] ? 'github' : 'list',
  use: {
    baseURL: 'http://127.0.0.1:4600',
    // Locally use the installed Chrome (temporary profile); CI installs Playwright's Chromium.
    channel: process.env['CI'] ? undefined : 'chrome'
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } }
  ],
  webServer: {
    command: 'node e2e/serve.mjs',
    url: 'http://127.0.0.1:4600',
    reuseExistingServer: !process.env['CI']
  }
});
