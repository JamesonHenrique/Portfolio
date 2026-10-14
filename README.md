# Portfólio | Jameson Henrique

[![CI](https://github.com/JamesonHenrique/Portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/JamesonHenrique/Portfolio/actions/workflows/ci.yml)

Desenvolvedor de **automação (RPA) e full stack**. Este é o código do meu site pessoal.

**No ar:** https://jamesonhenrique-portfolio.vercel.app/

![Página inicial no desktop](docs/preview-desktop.webp)

## O que tem no site

| Seção | Conteúdo |
|---|---|
| Sobre | Formação e experiência, com o mesmo texto do currículo |
| Stack | Ferramentas com ícones (automação e IA, backend, frontend, infra), mais os sistemas que já integrei |
| Projetos | OportunizaVaga, Painel de Máquinas, Newgram e outros; OportunizaVaga e Newgram têm página própria |
| Inglês | Versão completa em `/en`, com hreflang entre os idiomas |
| Contato | Formulário (FormSubmit via AJAX, com honeypot), e-mail, telefone e redes |

<p>
  <img src="docs/preview-mobile.webp" alt="Página inicial no celular" width="28%">
</p>

## Stack do site

- **Angular 22**: componentes standalone, signals, `OnPush` e **sem zone.js** (detecção de mudanças zoneless)
- **Tailwind CSS 3** e SCSS, com tokens de design em variáveis CSS (`src/styles.scss`)
- **TypeScript 6**, **ESLint** (angular-eslint) e **Prettier**
- **Karma/Jasmine** (unitários) e **Playwright** (e2e em desktop e mobile)
- **GitHub Actions**: lint, formatação, testes, build, e2e e gitleaks a cada push
- Deploy na **Vercel** a partir da `main`

## Arquitetura e decisões

| Decisão | Por quê |
|---|---|
| **Pré-renderização (SSG)** das 6 páginas | O HTML já chega com todo o texto: Google, LinkedIn e WhatsApp leem sem executar JavaScript |
| **i18n próprio** (`content/pt.ts` e `content/en.ts` com um tipo comum) | Sem build por idioma; se faltar uma tradução, o build falha |
| **SEO por rota** (`SeoService`) | Cada página tem title, description, canonical e hreflang próprios, inclusive no HTML pré-renderizado |
| **Hidratação incremental** (`@defer (hydrate on viewport; hydrate on interaction)`) | O HTML das seções abaixo da dobra continua na página, mas o JavaScript delas só carrega quando aparecem; um clique antes disso hidrata e é repetido |
| **Zoneless + OnPush** | Remove o zone.js (34 kB e o custo de patch no carregamento) |
| **Sem bibliotecas de efeito** | Partículas em canvas próprio e animações em CSS (antes: particles.js de 2015 e animate.css); CSS caiu de 103 para 27 kB |
| **Fontes no próprio domínio** (`@fontsource`) | Sem requisição ao Google; a CSP aceita fontes só de `'self'` |
| **Cabeçalhos de segurança** (`portfolio/vercel.json`) | CSP, HSTS, `nosniff`, `X-Frame-Options`; cache de 1 ano para arquivos com hash |
| **Cursor e partículas fora do Angular** | Eventos de mouse e animação em listeners nativos: não disparam detecção de mudanças |

Medições e investigações de desempenho (A/B intercalado, perfil de CPU com source maps) estão no histórico de commits `perf:`.

## Rodando localmente

```bash
cd portfolio
npm ci
npm start                 # http://localhost:4200
npm run build             # pré-renderiza em dist/jh-portfolio/browser
npm run test:ci           # testes unitários (Chrome headless)
npm run e2e               # e2e com Playwright (rode o build antes)
npm run lint && npm run format:check
```

## Onde editar o conteúdo

| O quê | Arquivo |
|---|---|
| Todos os textos em português (hero, sobre, projetos, contato, páginas de projeto) | `portfolio/src/app/content/pt.ts` |
| Tradução em inglês (mesma estrutura; o build falha se faltar algo) | `portfolio/src/app/content/en.ts` |
| Ícones e grupos da Stack | `portfolio/src/app/components/skills/skills.component.ts` |
| Rotas (`/`, `/en`, páginas de projeto) | `portfolio/src/app/app.routes.ts` |
| Currículo em PDF | `portfolio/public/JAMESON_HENRIQUE_CV.pdf` |

Ao trocar de domínio, atualize `SITE_ORIGIN` em `content/types.ts`, as URLs absolutas de `src/index.html`, `public/robots.txt` e `public/sitemap.xml`.

Os textos seguem o currículo. Ao mudar um, atualize o outro.

## Contato

- E-mail: jameson.henrique.dev@gmail.com
- LinkedIn: [linkedin.com/in/jamesonhenrique](https://www.linkedin.com/in/jamesonhenrique/)
- GitHub: [github.com/JamesonHenrique](https://github.com/JamesonHenrique)
