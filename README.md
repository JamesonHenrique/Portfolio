# Portfólio | Jameson Henrique

Desenvolvedor de **automação (RPA) e full stack**. Este é o código do meu site pessoal.

**No ar:** https://jamesonhenrique-portfolio.vercel.app/

![Página inicial no desktop](docs/preview-desktop.webp)

## O que tem no site

| Seção | Conteúdo |
|---|---|
| Sobre | Formação e experiência, com o mesmo texto do currículo |
| Stack | Ferramentas com ícones (automação e IA, backend, frontend, infra), mais os sistemas que já integrei |
| Projetos | OportunizaVaga, Painel de Máquinas, Newgram e outros projetos full stack |
| Contato | Formulário (FormSubmit via AJAX, com honeypot), e-mail, telefone e redes |

<p>
  <img src="docs/preview-mobile.webp" alt="Página inicial no celular" width="28%">
</p>

## Stack do site

- **Angular 19** (componentes standalone, control flow `@if`/`@for`)
- **Pré-renderização no build** (SSG): o `index.html` já sai com todo o texto, para o Google e para previews de link
- **Tailwind CSS** e SCSS
- **animate.css** e **particles.js**, com menos partículas no celular e desligadas quando o sistema pede menos movimento (`prefers-reduced-motion`)
- Ícones de tecnologias servidos do próprio site (`public/icons`, de Devicon e Simple Icons)
- Animações de entrada disparadas por `IntersectionObserver`, sem listeners de scroll
- SEO: `robots.txt`, `sitemap.xml`, canonical, Open Graph com `og-image.jpg` e JSON-LD (`Person`)
- Deploy automático na **Vercel** a partir da branch `main` (`portfolio/vercel.json` define cache longo para os arquivos com hash)

## Rodando localmente

```bash
cd portfolio
npm ci
npm start                 # http://localhost:4200
npm run build             # gera dist/jh-portfolio/browser
npx ng test --watch=false --browsers=ChromeHeadless
```

## Onde editar o conteúdo

| O quê | Arquivo |
|---|---|
| Projetos | `portfolio/src/app/components/projects/projects.component.ts` |
| Stack | `portfolio/src/app/components/skills/skills.component.ts` |
| Sobre e carreira | `portfolio/src/app/components/about/about.component.html` |
| Currículo em PDF | `portfolio/public/JAMESON_HENRIQUE_CV.pdf` |

Os textos seguem o currículo. Ao mudar um, atualize o outro.

## Contato

- E-mail: jameson.henrique.dev@gmail.com
- LinkedIn: [linkedin.com/in/jamesonhenrique](https://www.linkedin.com/in/jamesonhenrique/)
- GitHub: [github.com/JamesonHenrique](https://github.com/JamesonHenrique)
