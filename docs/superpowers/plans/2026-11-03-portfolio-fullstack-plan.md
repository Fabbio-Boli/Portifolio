# Portfólio Full Stack Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publicar um portfólio Full Stack que mantenha o catálogo alinhado aos repositórios públicos do GitHub e destaque estudos de caso revisados, sobretudo o Codex Automation Recommender.

**Architecture:** Aplicação Next.js com TypeScript e páginas estáticas na Vercel. Um workflow agendado/manual do GitHub Actions atualiza um arquivo versionado de metadados públicos; conteúdo editorial e estudos de caso ficam em dados locais mantidos manualmente.

**Tech Stack:** Next.js, React, TypeScript, CSS Modules ou Tailwind (decidir no bootstrap conforme padrão atual do Next), GitHub REST API, GitHub Actions, Vercel.

**Spec:** [2026-11-03-portfolio-fullstack-design.md](2026-11-03-portfolio-fullstack-design.md)

## Global Constraints

- Título profissional principal: “Desenvolvedor Full Stack”.
- Todos os repositórios públicos são sincronizados; o repositório de README de perfil, o próprio portfólio e repositórios com tópico `portfolio-ignore` são omitidos da lista visível; Codex Automation Recommender é o destaque principal e `portfolio-featured` seleciona destaques adicionais.
- Atualização agendada a cada seis horas e acionamento manual.
- Nenhum token ou segredo é enviado ao cliente.
- Idioma inicial da interface: português.
- Repositório do site é dedicado, separado do repositório `Fabbio-Boli` do README de perfil.
- Os cards dos projetos incluem mídia ou ilustração local, texto alternativo, tags, repositório e link de demonstração se houver.
- Deve haver tema claro/escuro, controles operáveis por teclado e suporte a preferência de movimento reduzido.
- Estudos de caso afirmam apenas fatos conferidos nos repositórios ou confirmados pelo usuário.

## Review Focus

- Repositórios paginados além dos primeiros 100 devem ser incluídos sem duplicatas (sync script).
- Repositórios arquivados, forks, sem descrição ou sem README precisam de apresentação estável (catálogo).
- Tópicos ausentes ou com capitalização variada não devem quebrar seleção e filtros (catálogo/UI).
- Conteúdo README deve ser exibido como texto/Markdown sanitizado, sem execução de HTML arbitrário (detalhes de projeto).
- Falha/limite da API ou interrupção do workflow deve manter o último catálogo publicado (sync workflow).

---

## File Map

- `package.json`, `tsconfig.json`, `next.config.ts`, `eslint.config.mjs`: aplicação e qualidade estática do projeto.
- `app/layout.tsx`, `app/globals.css`: estrutura comum, metadados, tipografia, estilo global responsivo e tokens dos dois temas.
- `app/page.tsx`: apresentação, foco Full Stack, projetos selecionados e contatos.
- `app/projetos/page.tsx`: catálogo completo com filtros.
- `app/projetos/[slug]/page.tsx`: página de projeto/estudo de caso.
- `app/sobre/page.tsx`: apresentação, formação e competências.
- `app/curriculo/page.tsx` e `public/curriculo.pdf`: currículo para baixar, após revisão do PDF fornecido.
- `components/SiteHeader.tsx`, `components/SiteFooter.tsx`, `components/ProjectCard.tsx`, `components/ProjectFilters.tsx`, `components/ContactLinks.tsx`, `components/ThemeToggle.tsx`: blocos reutilizáveis.
- `content/github-projects.json`: metadados sincronizados e versionados dos repositórios públicos.
- `content/case-studies.ts`: material editorial revisado, incluindo o estudo do plugin e Nutri Nex.
- `content/project-media.ts`: caminhos de imagem/GIF e texto alternativo por projeto; usar ilustração própria se o projeto não tiver captura adequada.
- `lib/projects.ts`: une o catálogo sincronizado a projetos editoriais sem repositório público e resolve links e mídia para os componentes.
- `public/projects/`: mídia local otimizada para cards e estudos de caso.
- `public/projects/default-project.svg`: arte decorativa de fallback para repositórios novos sem mídia curada.
- `scripts/sync-github-projects.ts`: consulta paginada ao GitHub e gera o catálogo.
- `.github/workflows/sync-projects.yml`: agendamento, execução manual, permissões mínimas e commit do catálogo atualizado.
- `README.md`: execução local, sincronização, configuração de tópicos e publicação.
- `.env.example`: exemplo da variável `PORTFOLIO_REPOSITORY` necessária para ocultar o repositório dedicado do catálogo visível.

### Task 1: Create the portfolio application shell

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `eslint.config.mjs`
- Create: `app/layout.tsx`, `app/globals.css`, `app/page.tsx`

**Interfaces:**
- Produces: Next App Router application with scripts `dev`, `build`, `start`, and `lint`.

- [ ] Create a dedicated portfolio repository and bootstrap Next.js with TypeScript and the chosen styling baseline.
- [ ] Set Portuguese document language, global metadata, responsive layout, and base landing page.
- [ ] Run `npm run lint` and `npm run build`; both must finish successfully.

### Task 2: Build the GitHub repository catalog synchronizer

**Files:**
- Create: `scripts/sync-github-projects.ts`
- Create: `content/github-projects.json`
- Modify: `package.json`

**Interfaces:**
- Produces: `npm run sync:github` writes an array of project records to `content/github-projects.json`.
- Each record contains `name`, `fullName`, `description`, `htmlUrl`, `homepageUrl`, `language`, `topics`, `updatedAt`, `isArchived`, `isFork`, `stars`, `readmeUrl`, and optional `readmeExcerpt` (plain text excerpt generated from README content).

- [ ] Implement pagination against the public GitHub user repositories endpoint for `Fabbio-Boli`, ordered by last update.
- [ ] Normalize missing descriptions, homepage URLs, and languages to `null`; normalize topics to lowercase.
- [ ] Keep all public repositories, including forks and archived projects, in the catalog and label their status for the UI.
- [ ] Preserve the previous JSON file if the API request fails or produces malformed data.
- [ ] Run sync locally; confirm JSON parses, every record has a valid GitHub URL, and paged results contain no duplicates.

### Task 3: Create editorial case studies and project pages

**Files:**
- Create: `content/case-studies.ts`
- Create: `content/project-media.ts`
- Create: `lib/projects.ts`
- Create: `app/projetos/page.tsx`
- Create: `app/projetos/[slug]/page.tsx`
- Create: `components/ProjectCard.tsx`, `components/ProjectFilters.tsx`
- Create: `components/ThemeToggle.tsx`
- Create: `public/projects/codex-automation-recommender.svg`
- Create: `public/projects/challenge-toledo.png`, `public/projects/sdc-eletrolls.png`, `public/projects/agv-bosch.png`
- Create: `public/projects/nutri-nex.svg`
- Create: `public/projects/default-project.svg`
- Modify: `app/layout.tsx`, `app/globals.css`

**Interfaces:**
- Consumes: records from `content/github-projects.json` and editorial records keyed by repository `fullName`.
- Produces: project catalog, statically generated project pages, and highlight predicate `topics.includes("portfolio-featured")`; omit `Fabbio-Boli/Fabbio-Boli`, the dedicated portfolio repository, and records tagged `portfolio-ignore` from visible project lists.
- Produces: `PortfolioProject` records with `slug`, `title`, `summary`, `repositoryUrl?`, `demoUrl?`, `language?`, `topics`, `imageSrc`, `imageAlt`, and optional `caseStudy`.

- [ ] Create the catalog view with text search and topic/language filters; show empty and no-results states.
- [ ] Include curated media with descriptive alt text; use the decorative default image with empty alt for future repositories without curated media, plus technology/topic tags, repository link, and homepage demo link only when configured.
- [ ] Add theme toggle with persisted preference, initial system preference, keyboard operation, and a reduced-motion-safe transition.
- [ ] Use repo screenshots/GIFs already present where suitable; otherwise create a simple local illustration per featured project rather than leaving an empty media frame.
- [ ] Render the optional plain-text README excerpt from synchronized project data; do not inject raw GitHub HTML or Markdown as trusted markup.
- [ ] Add a reviewed case study for `Fabbio-Boli/codex-automation-recommender` after reading its README and source; identify it as an independent third-party, read-only advisor that recommends evidence-based Codex setup improvements and does not apply them or imply OpenAI endorsement.
- [ ] Add editorial records for `challenge-toledo`, `sdc-eletrolls`, and `agv-bosch` only for claims supported by their repositories.
- [ ] Add Nutri Nex as an editorial project only from the supplied resume, without inventing repository or demo links.
- [ ] Merge synchronized GitHub projects with standalone editorial projects in `lib/projects.ts`; make repository/demo links optional and generate static routes from the merged list.
- [ ] Keep all public repos in the generated source data, but exclude the profile README repo, the configured portfolio repo, and repositories tagged `portfolio-ignore` from visible project routes.
- [ ] Render a neutral fallback for GitHub projects without a manually written case study.
- [ ] Run lint and production build; confirm all project routes build.

### Task 4: Add personal profile, contact paths, and resume

**Files:**
- Create: `app/sobre/page.tsx`, `app/curriculo/page.tsx`
- Create: `components/SiteHeader.tsx`, `components/SiteFooter.tsx`, `components/ContactLinks.tsx`
- Create: `public/curriculo.pdf`
- Modify: `app/page.tsx`, `app/layout.tsx`, `app/projetos/page.tsx`, `app/projetos/[slug]/page.tsx`, `lib/projects.ts`

**Interfaces:**
- Produces: one contact component with links for WhatsApp, Instagram, LinkedIn, GitHub, and email.
- Produces: homepage section that always features Codex Automation Recommender first, then any additional `portfolio-featured` projects.

- [ ] Add “Desenvolvedor Full Stack” headline and a concise summary consistent with the resume and LinkedIn.
- [ ] Add a project spotlight with Codex Automation Recommender first and projects tagged `portfolio-featured` after it.
- [ ] Move project navigation into the shared site header and remove duplicate per-page headers; include the theme toggle in the shared header.
- [ ] Add contact URLs: `https://wa.me/5511977140452`, `https://www.instagram.com/fabbioboli/`, `https://www.linkedin.com/in/fabbio-boli/`, `https://github.com/Fabbio-Boli`, and `mailto:fabinho871@live.com`.
- [ ] Fix the provided resume PDF's placeholder text before copying it to the public asset path; preserve its existing personal details unless the user requests specific removals.
- [ ] Add skill groupings for frontend, backend, mobile, data, and tools based on verified resume/repository facts.
- [ ] Run lint and production build; check all contact links and the downloadable resume path.

### Task 5: Add automatic GitHub synchronization

**Files:**
- Create: `.github/workflows/sync-projects.yml`
- Create: `.env.example`
- Modify: `README.md`

**Interfaces:**
- Consumes: `npm run sync:github` from Task 2.
- Produces: six-hour schedule, `workflow_dispatch`, and a commit of changed `content/github-projects.json` with least-privilege repository contents write permission.

- [ ] Configure scheduled trigger and manual dispatch; use a non-hour schedule to reduce schedule delays.
- [ ] Set only the GitHub Actions permissions needed to read the public API and update the generated catalog.
- [ ] Skip commits when generated JSON is unchanged; use a descriptive bot commit message when it changes.
- [ ] Configure Vercel to deploy from the portfolio repository's production branch and verify a generated catalog change creates a deployment.
- [ ] Document how to add/remove the `portfolio-featured` repository topic and manually run synchronization.
- [ ] Document that deployment must set `PORTFOLIO_REPOSITORY` to the dedicated portfolio repository `owner/name`, so it is excluded from visible project listings.

### Task 6: Final content and publication review

**Files:**
- Modify: all pages and `content/case-studies.ts` as needed.
- Modify: `README.md` as needed.
- Modify (separate repository): `Fabbio-Boli/README.md` to link to the deployed portfolio after its URL is confirmed.

- [ ] Check mobile and desktop layouts, keyboard navigation, visible focus, and text contrast against WCAG 2.2 AA guidance.
- [ ] Check Portuguese spelling, external links, metadata, and browser page titles.
- [ ] Verify the featured selection changes after adding/removing the topic and running synchronization.
- [ ] Verify repository API failure retains the previous generated catalog and causes the workflow to report failure clearly.
- [ ] Verify the production URL and links from the GitHub profile README after the user has connected the Vercel project and domain.
- [ ] Add the confirmed production URL to the GitHub profile README, preserving its existing content.

## Execution Notes

- Use `superpowers:executing-plans` for single-agent implementation or `superpowers:subagent-driven-development` for task-by-task delegation after the user chooses the execution method.
- No code, dependencies, GitHub settings, or Vercel settings are changed by this planning document.

## Official References

- [React: Creating a React App](https://react.dev/learn/creating-a-react-app)
- [GitHub Actions: Workflows and triggers](https://docs.github.com/en/actions/concepts/workflows-and-actions/workflows)
- [GitHub REST API: List repositories for a user](https://docs.github.com/en/rest/repos/repos#list-repositories-for-a-user)
- [Vercel: Deploying Git repositories](https://vercel.com/docs/git)
- [W3C: WCAG 2.2](https://www.w3.org/TR/WCAG22/)
