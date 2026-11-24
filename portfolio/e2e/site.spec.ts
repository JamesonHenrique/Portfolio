import { expect, test, type Page } from '@playwright/test';

const ORIGIN = 'https://jamesonhenrique-portfolio.vercel.app';
const EMAIL = 'jameson.henrique.dev@gmail.com';

const CASE_STUDIES = [
  { slug: 'oportunizavaga', ptTitle: 'OportunizaVaga', enTitle: 'OportunizaVaga', type: 'SoftwareSourceCode' },
  { slug: 'painel-de-maquinas', ptTitle: 'Painel de Máquinas', enTitle: 'Machine Dashboard', type: 'CreativeWork' },
  { slug: 'newgram', ptTitle: 'Newgram', enTitle: 'Newgram', type: 'SoftwareSourceCode' }
];

const ROUTES = (['pt-BR', 'en'] as const).flatMap((lang) => {
  const english = lang === 'en';
  return [
    {
      path: english ? '/en' : '/',
      lang,
      h1: english ? 'Beyond the click lives code.' : 'Além do clique tem código.',
      pt: '/',
      en: '/en',
      project: null
    },
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
  if (route.project) {
    await expect(page.getByRole('heading', { level: 1, name: route.h1, exact: true })).toBeVisible();
  } else {
    await expect(page.locator('main h1')).toBeVisible();
  }
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
            '#inicio .hero-desc',
            '#inicio .hero-art',
            '#projetos .work-entry',
            '#sobre .about-intro',
            '#experiencia li',
            '#contato .outro-mail',
            'footer'
          ];
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
    await expect(drawer.getByRole('link')).toHaveText(['Trabalhos', 'Sobre', 'Experiência', 'Contato']);
    await page.keyboard.press('Escape');
    await expect(menu).toHaveAttribute('aria-expanded', 'false');
    await expect(drawer).toBeHidden();
    await menu.click();
    navigation = drawer;
  }

  const about = navigation.getByRole('link', { name: 'Sobre' });
  await expect(about).toHaveAttribute('href', '/#sobre');
  await about.click();
  await expect(page).toHaveURL('/#sobre');
  await expect
    .poll(
      () =>
        page.locator('#sobre').evaluate((section) => {
          const top = section.getBoundingClientRect().top;
          const headerBottom = document.querySelector('.site-header')!.getBoundingClientRect().bottom;
          return top >= headerBottom - 4 && top <= headerBottom + 48;
        }),
      { timeout: 8000 }
    )
    .toBe(true);
  expect((await header.boundingBox())?.y).toBe(0);
  expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0);

  if (isMobile) {
    await expect(menu).toHaveAttribute('aria-expanded', 'false');
    await expect(navigation).toBeHidden();
  } else {
    await expect(about).toHaveAttribute('aria-current', 'location');
  }
});

test('Proof Deck cycles through projects 01, 02 and 03 and opens the active case study', async ({ page }) => {
  await page.goto('/');
  const stage = page.locator('.hero-stage');
  await expect(stage.locator('.stage-caption')).toContainText('[ 01 — 03 ]');
  await expect(stage.locator('.art-card[data-order="0"]')).toHaveAttribute('data-project', 'oportunizavaga');

  await page.locator('#nextWork').click();
  await expect(stage.locator('.stage-caption')).toContainText('[ 02 — 03 ]');
  await expect(stage.locator('.art-card[data-order="0"]')).toHaveAttribute('data-project', 'painel-de-maquinas');

  await page.locator('#nextWork').click();
  await expect(stage.locator('.stage-caption')).toContainText('[ 03 — 03 ]');
  await expect(stage.locator('.art-card[data-order="0"]')).toHaveAttribute('data-project', 'newgram');

  await stage.locator('.art-card[data-order="0"] a.card-open-link').click();
  await expect(page).toHaveURL('/projetos/newgram');
  await expect(page.getByRole('heading', { level: 1, name: 'Newgram' })).toBeVisible();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
});

test('The homepage shows professional experience and removes inspection controls', async ({ page, isMobile }) => {
  await page.goto('/');
  if (isMobile) {
    await page.getByRole('button', { name: 'Abrir menu' }).click();
  }
  await expect(page.getByRole('button', { name: /inspecionar/i })).toHaveCount(0);
  await expect(page.locator('.hero-copy')).not.toContainText(/Natal|arquivo de sistemas/i);
  const navigation = isMobile ? page.locator('#mobile-nav-panel') : page.locator('.desktop-nav');
  await navigation.getByRole('link', { name: 'Experiência' }).click();
  await expect(page).toHaveURL('/#experiencia');
  const experience = page.getByRole('region', { name: 'Experiência profissional' });
  await expect(experience.getByRole('listitem')).toHaveCount(3);
  await expect(experience.getByRole('heading', { name: 'Wolfacilitates C&M' })).toBeVisible();
  await expect(experience.getByRole('heading', { name: 'Duarte e Almeida Advogados' })).toBeVisible();
});

test('Project images animate on scroll and honor reduced motion', async ({ page }) => {
  await page.goto('/');
  const image = page.locator('.frame-body img').first();
  await expect(image).toHaveCSS('animation-name', /project-image-in$/);
  const progress = () => image.evaluate((element) => element.getAnimations()[0]?.effect?.getComputedTiming().progress);
  await expect.poll(progress).toBe(0);
  await image.evaluate((element) => element.scrollIntoView({ block: 'center', behavior: 'instant' }));
  await expect.poll(progress).toBe(1);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(image).toHaveCSS('animation-name', 'none');
});

test('Work chapter opens a case study at the top', async ({ page }) => {
  await page.goto('/en');
  await page
    .locator('.work-entry')
    .first()
    .getByRole('link', { name: /Read case study/i })
    .first()
    .click();
  await expect(page).toHaveURL('/en/projects/oportunizavaga');
  await expect(page.getByRole('heading', { level: 1, name: 'OportunizaVaga' })).toBeVisible();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
});

test('one click copies the contact email to the clipboard', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/');
  await page.evaluate(() => navigator.clipboard.writeText(''));
  const copy = page.locator('#contato').getByRole('button', { name: 'Copiar e-mail', exact: true });
  await copy.scrollIntoViewIfNeeded();
  await copy.click();
  await expect(page.locator('#contato').getByRole('button', { name: 'Copiado', exact: true })).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(EMAIL);
});

test('reduced motion disables scroll progress and keeps instant transitions', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('html')).toHaveCSS('scroll-behavior', 'auto');
  await page.locator('a.hero-cta').click();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
  await expect(page.locator('.reading-progress')).toHaveCSS('transform', 'matrix(0, 0, 0, 1, 0, 0)');
});

for (const route of ROUTES) {
  test(`${route.path} has zero horizontal overflow at the target widths`, async ({ page, isMobile }) => {
    for (const width of isMobile ? [360, 390] : [768, 1024, 1440, 1920]) {
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
