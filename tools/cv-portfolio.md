# Jameson Henrique Cruz Sabino
@ Desenvolvedor Full Stack Java | Automação e Integrações · Spring Boot · Angular · APIs REST · Make · n8n
> Natal/RN • (84) 98822-4405 • jameson.henrique.dev@gmail.com • linkedin.com/in/jamesonhenrique • github.com/JamesonHenrique

## RESUMO PROFISSIONAL
Desenvolvedor full stack (Java/Spring Boot e Angular) atuando com automação e integração de sistemas, estudante de Tecnologia da Informação no IMD/UFRN. No Duarte e Almeida Advogados (ago/2026 a out/2026), mantive em produção as integrações por APIs REST e webhooks que levam o cliente do primeiro contato ao contrato assinado e cadastrado no sistema jurídico, e migrei 30 dessas automações do Make para o n8n, prontas para o corte para produção. Antes, construí sozinho um painel de monitoramento em Spring Boot e Angular em uso por um cliente. Trabalho com tratamento de erro, idempotência, segurança de credenciais e investigação de causa raiz.

## EXPERIÊNCIA PROFISSIONAL
### Estagiário em Desenvolvimento de Automação (RPA) — Duarte e Almeida Advogados · ago/2026 – out/2026
_ LegalOps · Departamento de Tecnologia · atende o escritório, a PrecInvest (antecipação de precatórios) e a Deahub
- Desenvolvi e mantive integrações via APIs REST e webhooks entre CRM, sistema jurídico, assinatura eletrônica, WhatsApp, Google Workspace e IA, que levam o cliente do primeiro contato ao contrato assinado e cadastrado sem digitação manual.
- Migrei do Make para o n8n Cloud **30 automações ativas** (19 do escritório e 11 da PrecInvest), escolhidas após inventariar e auditar os 57 cenários existentes (~7.300 execuções/mês). Cobrem assinatura de contrato, PIX (Banco Inter), atendimento por WhatsApp com agente de IA e CRM. Workflows validados e prontos para o corte, que depende de credenciais e de teste real autorizado.
- Auditei a segurança das automações (credenciais expostas, ações duplicadas por falta de idempotência, consultas sem paginação) e removi **136 segredos literais** dos workflows convertidos, inclusive do histórico de versões, movendo-os para credenciais do n8n separadas por empresa; apontei à chefia o token e a conta compartilhados entre as duas empresas como risco de segregação.
- Projetei **travas de idempotência** para PIX, contratos e ligações (que o Make não tinha), evitando pagamento e envelope de assinatura duplicados, e um **Error Workflow central** com dados pessoais mascarados (LGPD); retry apenas em chamadas que não criam efeito externo.
- Corrigi defeitos que causariam, em produção, dados de cliente trocados (busca sem parâmetros em 138 chamadas HTTP), pagamentos interrompidos (loop de PIX parava no primeiro item) e perda silenciosa de lançamentos (paginação do extrato bancário).
- Desenvolvi em Python e Node.js as ferramentas da migração: inventário, conversão em lote para n8n, validação via MCP e upload idempotente, com testes automatizados (197 Code nodes validados, 0 falha de sintaxe).
- Investiguei e corrigi bugs em produção no fluxo de assinatura de contrato (erro 422 por lista de IDs vazia, anexos perdidos e CPF inválido aceito), que geravam cerca de **5 retrabalhos manuais por semana** para recriar cliente e processo.
- Criei a auditoria diária de protocolos judiciais: confere de **30 a 40 petições** concluídas por dia e aponta as não protocoladas. A Controladoria, que não tinha esse controle, passou a cobrar as pendências diariamente; depois, ajustei a regra para que peças paradas em revisão com prazo próximo também gerem alerta.
- Reescrevi as instruções de IA (Gemini) do plano de ação jurídico em cinco áreas, com formato de saída e checklist; auditei e documentei (BPMN) o agente de IA de WhatsApp, apontando modelos inválidos, ramo morto no roteamento e falta de idempotência por mensagem.
- Criei o cenário que gera a contagem de processos por área exigida em um formulário de seguro, substituindo uma planilha manual, e elaborei o plano de um módulo de comunicação (Chatwoot, n8n e WhatsApp Cloud API) para substituir o Octadesk, em planejamento.
^ Make · n8n · APIs REST · Webhooks · JSON · Python · Node.js · Gemini API · Google Workspace · ADVBOX · Coda · Octadesk · ZapSign · Banco Inter

### Desenvolvedor Full Stack (Freelancer) — Painel de Máquinas · jun/2025 – jul/2025
- **Desenvolvi sozinho** o sistema completo, backend e frontend, de monitoramento de equipamentos em tempo real, em uso pelo cliente no chão de fábrica: a equipe vê quais máquinas estão paradas, em operação, em manutenção ou sem operador. API REST em Spring Boot e MongoDB com endpoint de estatísticas consolidadas; frontend Angular reativo com RxJS.
^ Java · Spring Boot · Angular · TypeScript · MongoDB · RxJS · Tailwind CSS

## PROJETOS
### Newgram — rede social full stack · github.com/JamesonHenrique/Newgram
- Feed, stories, seguidores, comentários, notificações e busca paginada. Backend Spring Boot em camadas, com JWT (access e refresh token), mídia na AWS S3 por URLs pré-assinadas, schema versionado com Flyway e build Docker multi-stage. Frontend Angular 19 com cliente TypeScript gerado do contrato OpenAPI.
^ Java 17 · Spring Boot 3 · Spring Security · PostgreSQL · Flyway · AWS S3 · Docker · Angular 19 · TypeScript

### OportunizaVaga — agente open-source de candidatura a vagas · github.com/JamesonHenrique/OportunizaVaga
- Busca, filtra e se candidata a vagas em portais brasileiros com modelos de IA gratuitos e navegador real. Roda sem supervisão: reinicia se cair, guarda o histórico fora da IA, alterna entre seis provedores de IA ao atingir limite de uso e nunca inventa dado do candidato. Testes automatizados e CI com varredura de segredos.
^ Python · Node.js · Shell · Chrome DevTools Protocol · LLMs · GitHub Actions · Docker

## COMPETÊNCIAS TÉCNICAS
* **Linguagens:** Java, TypeScript, JavaScript, Python, SQL
* **Backend:** Spring Boot, Spring Security, Spring Data JPA, APIs REST, JWT, OAuth2, OpenAPI/Swagger
* **Frontend:** Angular, RxJS, Tailwind CSS
* **Bancos de dados:** PostgreSQL, MySQL, MongoDB, Flyway
* **Automação e integrações:** Make, n8n, webhooks, JSON, tratamento de erro, paginação, idempotência, segurança de credenciais, LGPD, Gemini API, Claude Code e MCP
* **Testes e infraestrutura:** JUnit, Mockito, Docker, Git, GitHub Actions (CI), AWS S3, Linux

## FORMAÇÃO ACADÊMICA E IDIOMAS
* **Bacharelado em Tecnologia da Informação** — Instituto Metrópole Digital (IMD/UFRN) · ingresso em 2026.1 · cursando
* **Cursos:** Spring 6 & Spring Boot 3 for Beginners (Udemy) • Angular e Spring Boot (loiane.training) • Angular (loiane.training)
* **Idiomas:** Português — nativo • Inglês — intermediário • Espanhol — básico
