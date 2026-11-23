import { expect, test, type Page } from '@playwright/test';

const ORIGIN = 'https://jamesonhenrique-portfolio.vercel.app';
const EMAIL = 'jameson.henrique.dev@gmail.com';
const FORM_ENDPOINT = 'https://formsubmit.co/ajax/' + EMAIL;

const CASE_STUDIES = [
  { slug: 'oportunizavaga', ptTitle: 'OportunizaVaga', enTitle: 'OportunizaVaga', type: 'SoftwareSourceCode' },
  { slug: 'painel-de-maquinas', ptTitle: 'Painel de Máquinas', enTitle: 'Machine Dashboard', type: 'CreativeWork' },
  { slug: 'newgram', ptTitle: 'Newgram', enTitle: 'Newgram', type: 'SoftwareSourceCode' }
];

const ROUTES = (['pt-BR', 'en'] as const).flatMap((lang) => {
  const english = lang === 'en';
  return [
    { path: english ? '/en' : '/', lang, h1: 'Jameson Henrique', pt: '/', en: '/en', project: null },
    ...CASE_STUDIES.map((project) => {
      const pt = '/projetos/' + project.slug;
      const en = '/en/projects/' + project.slug;
      return { path: english ? en : pt, lang, h1: english ? project.enTitle : project.ptTitle, pt, en, project };
    })
  ];
});

type SiteRoute = (typeof ROUTES)[number];

function trackErrors(page: Page) {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error' && !message.text().includes('/_vercel/insights')) {
      errors.push(message.text());
    }
  });
  return errors;
}

async function expectPageSeo(page: Page, route: SiteRoute) {
  const canonical = ORIGIN + route.path;
  await expect(page.locator('html')).toHaveAttribute('lang', route.lang);
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.getByRole('heading', { level: 1, name: route.h1, exact: Boolean(route.project) })).toBeVisible();
  await expect(page.locator('head link[rel="canonical"]')).toHaveAttribute('href', canonical);
  for (const [language, path] of [
    ['pt-BR', route.pt],
    ['en', route.en],
    ['x-default', route.pt]
  ]) {
    await expect(page.locator(`head link[rel="alternate"][hreflang="${language}"]`)).toHaveAttribute(
      'href',
      ORIGIN + path
    );
  }

  const script = page.locator('head script[type="application/ld+json"]');
  await expect(script).toHaveCount(1);
  const source = await script.evaluate((element: HTMLScriptElement) => element.text);
  const { '@context': context, '@graph': graph } = JSON.parse(source);
  expect(context).toBe('https://schema.org');
  const pageType = route.project ? 'WebPage' : 'ProfilePage';
  const types = ['Person', 'WebSite', pageType];
  if (route.project) types.push('BreadcrumbList', route.project.type);
  expect(graph.map((node: { '@type': string }) => node['@type']).sort()).toEqual(types.sort());

  const personId = ORIGIN + '/#person';
  const projectId = ORIGIN + route.pt + '#project';
  const breadcrumbId = canonical + '#breadcrumb';
  expect(graph).toContainEqual(
    expect.objectContaining({
      '@type': pageType,
      '@id': canonical + '#webpage',
      url: canonical,
      inLanguage: route.lang,
      isPartOf: { '@id': ORIGIN + '/#website' },
      mainEntity: { '@id': route.project ? projectId : personId },
      ...(route.project && { breadcrumb: { '@id': breadcrumbId } })
    })
  );

  if (route.project) {
    expect(graph).toContainEqual(
      expect.objectContaining({
        '@type': route.project.type,
        '@id': projectId,
        url: ORIGIN + route.pt,
        name: route.project.ptTitle,
        author: { '@id': personId }
      })
    );
    expect(graph).toContainEqual(
      expect.objectContaining({
        '@type': 'BreadcrumbList',
        '@id': breadcrumbId,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: route.lang === 'en' ? 'Home' : 'Início',
            item: ORIGIN + (route.lang === 'en' ? '/en' : '/')
          },
          { '@type': 'ListItem', position: 2, name: route.h1, item: canonical }
        ]
      })
    );
  }
}

test.describe('prerendered HTML', () => {
  test.use({ javaScriptEnabled: false });

  for (const route of ROUTES) {
    test(`${route.path} serves its heading and SEO without JavaScript`, async ({ page }) => {
      const response = await page.goto(route.path);
      expect(response?.status()).toBe(200);
      await expectPageSeo(page, route);

      const selectors = route.project
        ? ['main h1', 'main .case-figure', 'main .case-prose p', 'footer']
        : [
            '#inicio h1',
            '#inicio .hero-subhead',
            '#inicio [role="tabpanel"]',
            '#projetos .flagship-card',
            '#sobre .about-intro',
            '#skills .capability-card',
            '#contato form',
            'footer'
          ];
      // A descendant can have opacity 1 while a hidden ancestor makes it transparent.
      for (const selector of selectors) {
        const content = page.locator(selector).first();
        await expect(content).toBeVisible();
        const opacity = await content.evaluate((element) => {
          let opacity = 1;
          for (let ancestor: Element | null = element; ancestor; ancestor = ancestor.parentElement) {
            opacity *= Number(getComputedStyle(ancestor).opacity);
          }
          return opacity;
        });
        expect(opacity, selector).toBeGreaterThan(0);
      }
    });
  }
});

for (const route of ROUTES) {
  test(`${route.path} hydrates the prerendered heading and switches languages in place`, async ({ page }) => {
    const errors = trackErrors(page);
    let resumeScripts!: () => void;
    const scriptsReady = new Promise<void>((resolve) => {
      resumeScripts = resolve;
    });
    // Retain the original heading so replacing it during bootstrap cannot pass as hydration.
    await page.route(/\/main-[^/]+\.js$/, async (script) => {
      await scriptsReady;
      await script.continue();
    });

    const heading = page.locator('main h1');
    let prerenderedHeading;
    try {
      await page.goto(route.path, { waitUntil: 'commit' });
      prerenderedHeading = await heading.elementHandle();
    } finally {
      resumeScripts();
    }
    await page.waitForLoadState('load');
    expect(await prerenderedHeading.evaluate((node) => node === document.querySelector('main h1'))).toBe(true);

    const documentRoot = await page.locator('html').elementHandle();
    const switcher = page.locator('header a.lang-switch');
    const alternatePath = route.lang === 'en' ? route.pt : route.en;
    const alternate = ROUTES.find(({ path }) => path === alternatePath)!;
    await expect(switcher).toHaveAttribute('href', alternatePath);
    await expect(switcher).toHaveAttribute('hreflang', alternate.lang);
    await switcher.click();
    await expect(page).toHaveURL(alternatePath);
    expect(await documentRoot.evaluate((node) => node === document.documentElement)).toBe(true);
    await expectPageSeo(page, alternate);

    await expect(switcher).toHaveAttribute('href', route.path);
    await switcher.click();
    await expect(page).toHaveURL(route.path);
    await expectPageSeo(page, route);
    expect(errors).toEqual([]);
  });
}

test('fixed header navigation reaches the home section from a case study', async ({ page, isMobile }) => {
  await page.goto('/projetos/newgram');
  const header = page.locator('.site-header');
  let navigation = header.getByRole('navigation', { name: 'Navegação principal' });
  const menu = header.getByRole('button', { name: /^(Abrir|Fechar) menu$/ });

  if (isMobile) {
    const drawer = header.locator('#mobile-nav-panel');
    await expect(menu).toHaveAttribute('aria-expanded', 'false');
    await expect(menu).toHaveAttribute('aria-controls', 'mobile-nav-panel');
    await menu.click();
    await expect(menu).toHaveAttribute('aria-expanded', 'true');
    await expect(drawer).toBeVisible();
    await expect(drawer.getByRole('link')).toHaveCount(4);
    await page.keyboard.press('Escape');
    await expect(menu).toHaveAttribute('aria-expanded', 'false');
    await expect(drawer).toBeHidden();
    await menu.click();
    navigation = drawer;
  }

  const experience = navigation.getByRole('link', { name: 'Trajetória' });
  await expect(experience).toHaveAttribute('href', '/#sobre');
  await experience.click();
  await expect(page).toHaveURL('/#sobre');
  await expect
    .poll(
      () =>
        page.locator('#sobre').evaluate((section) => {
          const top = section.getBoundingClientRect().top;
          const headerBottom = document.querySelector('.site-header')!.getBoundingClientRect().bottom;
          return top >= headerBottom - 2 && top <= headerBottom + 48;
        }),
      { timeout: 8000 }
    )
    .toBe(true);
  expect((await header.boundingBox())?.y).toBe(0);
  expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
  await expect(header.locator('.reading-progress')).not.toHaveCSS('transform', 'matrix(0, 0, 0, 1, 0, 0)');

  if (isMobile) {
    await expect(menu).toHaveAttribute('aria-expanded', 'false');
    await expect(navigation).toBeHidden();
  } else {
    await expect(experience).toHaveAttribute('aria-current', 'location');
  }
});

test('System Index selects projects 01, 02 and 03 and opens the selected case', async ({ page }) => {
  await page.goto('/');
  const tabs = page.getByRole('tablist');
  const panel = page.getByRole('tabpanel');
  await expect(tabs.getByRole('tab')).toHaveCount(3);
  await expect(tabs.getByRole('tab', { selected: true })).toHaveAccessibleName('01 OportunizaVaga');

  for (const [index, project] of CASE_STUDIES.entries()) {
    const tab = tabs.getByRole('tab', { name: `0${index + 1} ${project.ptTitle}`, exact: true });
    await tab.click();
    await expect(tabs.getByRole('tab', { selected: true })).toHaveCount(1);
    await expect(tab).toHaveAttribute('aria-selected', 'true');
    await expect(panel).toHaveAccessibleName(`0${index + 1} ${project.ptTitle}`);
    await expect(panel.getByRole('heading', { name: project.ptTitle })).toBeVisible();
    await expect(panel.getByRole('link', { name: 'Ler estudo de caso' })).toHaveAttribute(
      'href',
      '/projetos/' + project.slug
    );
  }

  await panel.getByRole('link', { name: 'Ler estudo de caso' }).click();
  await expect(page).toHaveURL('/projetos/newgram');
  await expect(page.getByRole('heading', { level: 1, name: 'Newgram' })).toBeVisible();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
});

test('the deferred Work section opens a case study at the top', async ({ page }) => {
  await page.goto('/en');
  const work = page.locator('#projetos');
  await work.getByRole('heading', { name: 'OportunizaVaga' }).getByRole('link').click();
  await expect(page).toHaveURL('/en/projects/oportunizavaga');
  await expect(page.getByRole('heading', { level: 1, name: 'OportunizaVaga' })).toBeVisible();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
});

async function fillContactForm(page: Page) {
  const form = page.locator('#contato form');
  await form.getByLabel('Seu nome').fill('Teste Playwright');
  await form.getByLabel('Seu e-mail').fill('playwright@example.com');
  await form.getByLabel('Assunto').fill('Teste de contato');
  await form.getByLabel('Mensagem').fill('Mensagem sintética para o teste.');
  return form;
}

test('contact form submits under CSP and resets on success', async ({ page }) => {
  const errors = trackErrors(page);
  // Intercept before navigation so this test never sends an email.
  await page.route(FORM_ENDPOINT, (request) =>
    request.fulfill({
      json: { success: 'true' },
      headers: { 'access-control-allow-origin': '*' }
    })
  );
  const response = await page.goto('/');
  expect(response?.headers()['content-security-policy']).toContain("connect-src 'self' https://formsubmit.co");
  const form = await fillContactForm(page);
  const [submission] = await Promise.all([
    page.waitForRequest(FORM_ENDPOINT),
    form.getByRole('button', { name: 'Enviar mensagem' }).click()
  ]);
  expect(submission.method()).toBe('POST');
  expect(submission.headers()['content-type']).toContain('multipart/form-data');
  expect(submission.postData()).toContain('playwright@example.com');
  expect(submission.postData()).toContain('Mensagem sintética para o teste.');
  await expect(form.getByRole('status')).toContainText('Mensagem enviada');
  await expect(form.getByLabel('Seu nome')).toHaveValue('');
  expect(errors).toEqual([]);
});

test('contact form keeps the message and offers email after a failed submission', async ({ page }) => {
  await page.route(FORM_ENDPOINT, (request) =>
    request.fulfill({ status: 500, json: {}, headers: { 'access-control-allow-origin': '*' } })
  );
  await page.goto('/');
  const form = await fillContactForm(page);
  await form.getByRole('button', { name: 'Enviar mensagem' }).click();
  const status = form.getByRole('status');
  await expect(status).toContainText('Não foi possível enviar agora');
  await expect(status.getByRole('link')).toHaveAttribute('href', 'mailto:' + EMAIL);
  await expect(form.getByLabel('Mensagem')).toHaveValue('Mensagem sintética para o teste.');
});

test('one click copies the contact email to the clipboard', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/');
  await page.evaluate(() => navigator.clipboard.writeText(''));
  const copy = page.locator('#contato').getByRole('button', { name: 'Copiar', exact: true });
  await copy.scrollIntoViewIfNeeded();
  // Angular removes its event-replay marker when the deferred contact section hydrates.
  await expect(copy).not.toHaveAttribute('jsaction', /click/);
  await copy.click();
  await expect(page.locator('#contato').getByRole('button', { name: 'Copiado', exact: true })).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(EMAIL);
});

test('reduced motion removes the tab transition and disables the reading progress animation', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.getByRole('tab', { name: /02 Painel de Máquinas/ }).click();
  const panel = page.getByRole('tabpanel');
  await expect(panel.getByRole('heading', { name: 'Painel de Máquinas' })).toBeVisible();
  const duration = await panel.evaluate((node) => Number.parseFloat(getComputedStyle(node).animationDuration));
  expect(duration).toBeLessThan(0.001);
  await expect(page.locator('html')).toHaveCSS('scroll-behavior', 'auto');
  await page.getByRole('link', { name: 'Ver projetos' }).click();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
  await expect(page.locator('.reading-progress')).toHaveCSS('transform', 'matrix(0, 0, 0, 1, 0, 0)');
});

for (const route of ROUTES) {
  test(`${route.path} has zero horizontal overflow at the target widths`, async ({ page, isMobile }) => {
    for (const width of isMobile ? [360, 390] : [1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(route.path);
      await page.evaluate(() => document.fonts.ready);
      const { clientWidth, overflow } = await page.evaluate(() => {
        const root = document.documentElement;
        return { clientWidth: root.clientWidth, overflow: root.scrollWidth - root.clientWidth };
      });
      expect(clientWidth).toBe(width);
      expect(overflow, `${route.path} at ${width}px`).toBe(0);
    }
  });
}

test('unknown path falls back to the home page', async ({ page }) => {
  const errors = trackErrors(page);
  await page.goto('/rota-que-nao-existe');
  await expect(page).toHaveURL('/');
  expect(errors).toEqual([]);
});

test('security headers and the sitemap expose the expected configuration', async ({ request }) => {
  const home = await request.get('/');
  expect(home.headers()['content-security-policy']).toContain("frame-ancestors 'none'");
  expect(home.headers()['x-content-type-options']).toBe('nosniff');

  const robots = await request.get('/robots.txt');
  expect(robots.ok()).toBe(true);
  expect(await robots.text()).toContain('Sitemap: ' + ORIGIN + '/sitemap.xml');

  const sitemap = await request.get('/sitemap.xml');
  expect(sitemap.ok()).toBe(true);
  const urls = Array.from((await sitemap.text()).matchAll(/<loc>([^<]+)<\/loc>/g), ([, url]) => url).sort();
  expect(urls).toEqual(ROUTES.map((route) => ORIGIN + route.path).sort());
});
