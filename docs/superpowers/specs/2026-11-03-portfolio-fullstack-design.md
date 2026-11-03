# Portfólio Full Stack — desenho aprovado

## Objetivo

Criar um portfólio voltado a recrutadores e equipes técnicas para vagas Full Stack. O site deve demonstrar desenvolvimento de ponta a ponta e destacar o Codex Automation Recommender, mantendo back-end como uma ênfase entre competências full stack.

## Público e conteúdo

- Recrutadores e lideranças técnicas.
- Página inicial com título “Desenvolvedor Full Stack”, apresentação curta, contatos e projetos selecionados.
- Catálogo dos repositórios públicos de projetos de Fabbio-Boli, carregado do GitHub; o repositório de README de perfil e o próprio repositório do portfólio não aparecem como projetos.
- Codex Automation Recommender é o destaque principal da página inicial; o tópico `portfolio-featured` permite adicionar outros projetos aos destaques.
- Repositórios marcados com `portfolio-ignore` continuam sincronizados, mas não aparecem no catálogo do portfólio.
- Cards de projeto com imagem/GIF ou ilustração representativa, tags de tecnologia, link do repositório e link de demonstração quando disponível.
- Estudos de caso que descrevem problema, contribuição pessoal, interface, arquitetura, tecnologias, decisões e resultados comprováveis.
- Estudo de caso aprofundado do Codex Automation Recommender, explicando que ele recomenda melhorias comprovadas pelo conteúdo do repositório e não altera a configuração.
- Nutri Nex pode ser um projeto editorial destacado a partir do currículo, mesmo sem repositório público, com links de código/demonstração omitidos até existirem.
- Páginas Sobre e Currículo, com link para baixar o currículo.
- Contatos: WhatsApp, Instagram, LinkedIn e e-mail informados pelo usuário.
- Alternância entre tema claro e escuro, respeitando a preferência de movimento reduzido e o foco de teclado.

## Comportamento da sincronização

- GitHub Actions busca periodicamente os repositórios públicos e atualiza o catálogo, inicialmente a cada seis horas, com acionamento manual.
- Metadados e README são derivados dos dados públicos do GitHub; nenhum segredo ou token é exposto ao navegador.
- Vercel hospeda o site e publica atualizações do repositório conectado.
- Atualização quase em tempo real por webhooks fica fora da primeira versão.
- A primeira versão atualiza o catálogo de repositórios, mas não cria um estudo de caso para cada commit ou projeto automaticamente.

## Arquitetura proposta

- Next.js, React e TypeScript, com conteúdo renderizado estaticamente a partir de um catálogo gerado pelo workflow.
- Repositório dedicado ao portfólio, separado do repositório `Fabbio-Boli` usado para o README de perfil. Esta separação é uma decisão operacional proposta para preservar o README existente.
- GitHub Actions atualiza o catálogo no repositório do portfólio; Vercel implanta alterações desse repositório.
- Taxonomia de projeto derivada dos tópicos do GitHub; apresentação editorial e estudos de caso mantidos em dados locais versionados.
- Imagens de projetos escolhidas por mapeamento editorial local a partir de imagens existentes ou de ilustrações próprias, sem executar conteúdo dos READMEs.

## Objetivos

- Tornar identidade e foco Full Stack claros desde o primeiro bloco da página.
- Mostrar evidências técnicas e visuais de trabalho em interfaces, APIs, dados, integração e arquitetura.
- Reduzir manutenção repetitiva do catálogo quando novos repositórios públicos forem criados ou atualizados.
- Permitir controle editorial dos projetos em destaque.
- Facilitar comparação visual dos projetos e oferecer tema claro/escuro.
- Oferecer contato e currículo em poucos cliques.

## Fora de escopo

- Executar o plugin Codex dentro do site.
- Publicar cada commit como projeto, atualização de portfólio ou postagem social.
- Automatizar o texto dos estudos de caso sem revisão humana.
- Criar backend dedicado, banco de dados ou integração em tempo real na primeira versão.

## Restrições e decisões

- Catálogo de repositórios públicos de projetos é automático; o repositório de perfil, o próprio portfólio e repositórios com tópico `portfolio-ignore` não aparecem como projetos; Codex Automation Recommender é o destaque principal e `portfolio-featured` seleciona destaques adicionais.
- Frequência inicial da sincronização: seis horas; também há execução manual.
- Não expor tokens no código ou bundle do navegador.
- Usar links de contato fornecidos pelo usuário e linguagem em português como padrão inicial.
- O conteúdo técnico de cada projeto deve ser conferido no repositório antes da publicação.

## Abordagens consideradas

1. **GitHub Actions agendado e catálogo versionado (selecionado):** baixo custo operacional, dados disponíveis no build estático, atraso de até algumas horas.
2. **Webhooks e serviço receptor:** atualiza mais depressa, mas exige endpoint e manutenção de serviço; opção para evolução futura.
3. **Consulta da API GitHub a cada visita:** pouca infraestrutura inicial, mas a experiência depende da API e dos limites de requisição.

## Critérios de aceitação do produto

- Site publicado com páginas principais responsivas e contato funcional.
- Todos os repositórios públicos de projetos retornados pelo GitHub aparecem no catálogo, com links válidos; o README de perfil, o próprio portfólio e entradas com tópico `portfolio-ignore` são omitidos da lista visível.
- Codex Automation Recommender aparece primeiro na área de destaque; repositórios com tópico `portfolio-featured` também aparecem após sincronização.
- Cards apresentam mídia com texto alternativo, tags de tecnologia, link do GitHub e link de demonstração somente quando o projeto possui um.
- Usuário pode alternar os temas claro e escuro, e todos os controles são utilizáveis por teclado.
- Workflow pode rodar por agenda e manualmente, sem credenciais no cliente.
- README com instruções de execução local e publicação.
- O estudo de caso do plugin é baseado no conteúdo real do repositório e distingue claramente funcionalidades disponíveis, limitações e planos futuros.
- Projetos editoriais sem repositório público, como Nutri Nex, podem aparecer sem link de código ou demonstração não confirmado.

## Premissas pendentes para a implementação

- Criar um repositório separado para o site (sugestão de nome: `portfolio`) e conectá-lo à Vercel.
- Revisar o currículo e os perfis públicos para alinhar descrição de formação, competências e links.
- Confirmar a descrição técnica e a situação atual de cada projeto a partir dos READMEs e arquivos dos repositórios.
