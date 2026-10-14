import { expect, test, type Page } from '@playwright/test';

const ORIGIN = 'https://jamesonhenrique-portfolio.vercel.app';

const ROUTES = [
  { path: '/', lang: 'pt-BR', h1: 'Jameson Henrique', pt: '/', en: '/en' },
  { path: '/en', lang: 'en', h1: 'Jameson Henrique', pt: '/', en: '/en' },
  {
    path: '/projetos/oportunizavaga',
    lang: 'pt-BR',
    h1: 'OportunizaVaga',
    pt: '/projetos/oportunizavaga',
    en: '/en/projects/oportunizavaga'
  },
  { path: '/projetos/newgram', lang: 'pt-BR', h1: 'Newgram', pt: '/projetos/newgram', en: '/en/projects/newgram' },
  {
    path: '/en/projects/oportunizavaga',
    lang: 'en',
    h1: 'OportunizaVaga',
    pt: '/projetos/oportunizavaga',
    en: '/en/projects/oportunizavaga'
  },
  { path: '/en/projects/newgram', lang: 'en', h1: 'Newgram', pt: '/projetos/newgram', en: '/en/projects/newgram' }
];

/** Collects page errors and console errors, ignoring Vercel Analytics (only served when enabled on Vercel). */
function trackErrors(page: Page) {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => {
    if (m.type() === 'error' && !/_vercel\/insights|MIME type/.test(m.text())) errors.push(m.text());
  });
  return errors;
}

/** Scrolls through the page so IntersectionObserver-driven sections hydrate and animate. */
async function scrollThrough(page: Page) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < height; y += 400) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForTimeout(80);
  }
}

for (const route of ROUTES) {
  test(`${route.path}: renders, hydrates and has its own SEO tags`, async ({ page }) => {
    const errors = trackErrors(page);
    await page.goto(route.path);
    await page.waitForLoadState('networkidle');

    await expect(page.locator('html')).toHaveAttribute('lang', route.lang);
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
    expect(((await h1.getAttribute('aria-label')) ?? (await h1.textContent()) ?? '').trim()).toContain(route.h1);

    const canonical = route.path === '/' ? `${ORIGIN}/` : ORIGIN + route.path;
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', canonical);
    await expect(page.locator('link[rel="alternate"][hreflang="pt-BR"]')).toHaveAttribute('href', ORIGIN + route.pt);
    await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute('href', ORIGIN + route.en);

    await scrollThrough(page);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    expect(overflow, 'horizontal scroll').toBeLessThanOrEqual(0);
    expect(errors, errors.join('\n')).toEqual([]);
  });
}

test('prerendered HTML already contains the page text (SEO)', async ({ request }) => {
  const html = await (await request.get('/')).text();
  for (const text of ['SOBRE MIM', 'PROJETOS', 'jameson.henrique.dev', 'Spring Boot']) {
    expect(html).toContain(text);
  }
  const en = await (await request.get('/en')).text();
  expect(en).toContain('Automation Development Intern (RPA)');
});

test('unknown path falls back to the home page', async ({ page }) => {
  const errors = trackErrors(page);
  await page.goto('/rota-que-nao-existe');
  await expect(page).toHaveURL(/\/$/);
  expect(errors).toEqual([]);
});

test('below-the-fold sections animate when scrolled into view', async ({ page }) => {
  await page.goto('/');
  await scrollThrough(page);
  await expect(page.locator('#sobre .paragraph-animated').first()).toBeAttached();
  await expect(page.locator('#skills .skills-animated').first()).toBeAttached();
  await expect(page.locator('#projetos.animate-section')).toBeAttached();
  await expect(page.locator('#contato.animate-section')).toBeAttached();
  await expect(page.locator('#skills img')).toHaveCount(22);

  // Entrance animations start at opacity 0; make sure each animated group actually ends visible.
  await page.waitForTimeout(2500);
  for (const selector of [
    '#sobre .paragraph-animated',
    '#skills .skill-card',
    '#skills .skill-item',
    '#projetos .project-card',
    '#contato .form-group',
    'footer'
  ]) {
    const opacity = await page
      .locator(selector)
      .first()
      .evaluate((el) => getComputedStyle(el).opacity);
    expect(opacity, selector).toBe('1');
  }
});

test('navigation dot on a project page goes back to the home section', async ({ page, isMobile }) => {
  test.skip(isMobile, 'dots are hover targets on desktop');
  await page.goto('/projetos/newgram');
  await page.waitForLoadState('networkidle');
  await page.locator('nav a[aria-label="Sobre"]').click();
  await expect(page).toHaveURL(/\/#sobre$/);
  await expect
    .poll(() => page.evaluate(() => Math.round(document.getElementById('sobre')!.getBoundingClientRect().top)))
    .toBeLessThan(200);
});

test('language switch goes to the English home and back', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await page.locator('a.lang-switch').click();
  await expect(page).toHaveURL(/\/en$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page).toHaveTitle(/Automation \(RPA\)/);
  await page.locator('a.lang-switch').click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
});

test('project details button opens the case study at the top', async ({ page }) => {
  await page.goto('/en');
  await page.waitForLoadState('networkidle');
  await page.locator('a[href="/en/projects/oportunizavaga"]').click();
  await expect(page).toHaveURL(/\/en\/projects\/oportunizavaga$/);
  await expect(page.locator('h1')).toHaveText(/OportunizaVaga/);
  expect(await page.evaluate(() => window.scrollY)).toBe(0);
});

test('contact form sends through FormSubmit under the CSP', async ({ page }) => {
  const errors = trackErrors(page);
  let sent: string | null = null;
  // Intercepted: no real e-mail is sent. Reaching this handler proves the CSP allowed the request.
  await page.route('https://formsubmit.co/**', async (route) => {
    sent = route.request().postData();
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      headers: { 'access-control-allow-origin': '*' },
      body: '{"success":"true"}'
    });
  });
  await page.goto('/');
  await scrollThrough(page);
  await page.fill('#name', 'Teste e2e');
  await page.fill('#email', 'teste@example.com');
  await page.fill('#subject', 'Playwright');
  await page.fill('#message', 'Mensagem de teste automatizado.');
  await page.locator('#contato button[type=submit]').click();
  await expect(page.locator('#contato [role=status]')).toContainText('Mensagem enviada');
  expect(sent).toContain('Teste e2e');
  expect(errors).toEqual([]);
});

test('contact form shows the fallback message when sending fails', async ({ page }) => {
  await page.route('https://formsubmit.co/**', (route) => route.fulfill({ status: 500, body: '{}' }));
  await page.goto('/');
  await scrollThrough(page);
  await page.fill('#name', 'Teste');
  await page.fill('#email', 'teste@example.com');
  await page.fill('#subject', 'Erro');
  await page.fill('#message', 'Falha simulada.');
  await page.locator('#contato button[type=submit]').click();
  await expect(page.locator('#contato [role=status]')).toContainText('jameson.henrique.dev@gmail.com');
});

test('custom cursor follows a real mouse, grows over links and stays off on touch', async ({ browser }) => {
  const desktop = await browser.newPage();
  await desktop.addInitScript(() => {
    const original = window.matchMedia.bind(window);
    window.matchMedia = (q: string) =>
      q.includes('pointer: fine') ? ({ ...original(q), matches: true, media: q } as MediaQueryList) : original(q);
  });
  await desktop.goto('/');
  const ball = desktop.locator('app-cursor .cursor-ball');
  await expect(ball).toHaveClass(/cursor-hidden/);
  await desktop.mouse.move(400, 300);
  await expect(ball).not.toHaveClass(/cursor-hidden/);
  await expect(ball).toHaveAttribute('style', /translate\(388px, 288px\)/);

  const link = desktop.locator('a.lang-switch');
  await link.hover();
  await expect(desktop.locator('app-cursor .cursor-dot')).toHaveClass(/cursor-dot-hover/);
  await desktop.close();

  const phone = await browser.newPage({ hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } });
  await phone.goto('/');
  await expect(phone.locator('app-cursor .cursor-ball')).toHaveClass(/hidden/);
  await phone.close();
});

test('security headers and SEO files are served', async ({ request }) => {
  const home = await request.get('/');
  expect(home.headers()['content-security-policy']).toContain("frame-ancestors 'none'");
  expect(home.headers()['x-content-type-options']).toBe('nosniff');
  const robots = await request.get('/robots.txt');
  expect(await robots.text()).toContain('Sitemap:');
  const sitemap = await (await request.get('/sitemap.xml')).text();
  expect(sitemap.match(/<loc>/g)?.length).toBe(6);
});
