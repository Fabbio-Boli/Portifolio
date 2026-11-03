# Portfólio Full Stack — Fabbio Boli

Portfólio em Next.js, React e TypeScript. O catálogo combina projetos públicos do GitHub com conteúdo editorial e um projeto cadastrado manualmente. Codex Automation Recommender aparece como primeiro destaque; outros repositórios podem ser destacados por tópico.

## Executar no computador

Use Node.js 22 e npm. Na pasta do projeto:

```bash
npm ci
cp .env.example .env.local
npm run dev
```

No PowerShell, use `Copy-Item .env.example .env.local` no lugar de `cp` se preferir. Abra o endereço informado no terminal. Para conferir a compilação de produção, use `npm run build`; para a análise de código, use `npm run lint`.

Edite `PORTFOLIO_REPOSITORY` em `.env.local` com o nome **real** do repositório dedicado a este site, no formato `proprietário/nome`, por exemplo `Fabbio-Boli/Portifolio`. Ele é usado na compilação para ocultar o próprio portfólio do catálogo. O valor do exemplo é apenas ilustrativo.

## Projetos e sincronização

O comando `npm run sync:github` consulta os repositórios públicos de `Fabbio-Boli` e atualiza `content/github-projects.json`. O catálogo guarda descrição, linguagem, tópicos, link da página do repositório, site indicado no GitHub e, quando disponível, um trecho do README. Imagens e estudos de caso escolhidos ficam em `content/`; projetos novos usam apresentação genérica até serem personalizados. O Nutri Nex está cadastrado manualmente enquanto não há repositório público correspondente.

A sincronização não publica repositórios privados. O repositório de perfil `Fabbio-Boli/Fabbio-Boli` é ocultado da lista. Quando `PORTFOLIO_REPOSITORY` é informado durante a sincronização, esse repositório fica fora do catálogo gerado; a mesma variável também o oculta durante a compilação do site. Isso evita que alterações no próprio portfólio provoquem atualizações repetidas no catálogo. Para ocultar outro projeto público, adicione o tópico `portfolio-ignore` em **About → Topics** do repositório no GitHub. Para voltar a exibi-lo, remova esse tópico.

Para adicionar um projeto aos destaques da página inicial, inclua o tópico `portfolio-featured` no repositório público; para removê-lo dos destaques, retire esse tópico. O Codex Automation Recommender é o primeiro destaque por padrão. Alterações de tópicos aparecem depois da próxima sincronização e publicação do catálogo.

### Automática no GitHub

Depois de enviar este projeto para um repositório GitHub com Actions habilitado, o fluxo `.github/workflows/sync-projects.yml` roda aproximadamente a cada seis horas, no minuto 17 (UTC), na branch padrão do GitHub. Para que a execução programada publique no site de produção, configure essa mesma branch como a branch de produção na Vercel. Horários programados podem sofrer atrasos conforme a disponibilidade do GitHub. Também é possível iniciar em **Actions → Sincronizar projetos do GitHub → Run workflow** e selecionar uma branch; o commit é enviado para a branch selecionada, então selecione a de produção para atualizar o site de produção. A execução programada continua usando a branch padrão.

O fluxo informa automaticamente o repositório atual a `PORTFOLIO_REPOSITORY`, usa o token temporário fornecido pelo GitHub, solicita permissão de escrita apenas para o conteúdo do repositório e cria um commit somente se o catálogo mudar. Uma falha na consulta da lista de repositórios faz a execução falhar sem substituir o catálogo anterior. Se uma consulta individual de README falhar, o catálogo ainda é atualizado e o trecho desse README pode ficar ausente.

### Manual no computador

Antes de executar `npm run sync:github` na raiz, defina `PORTFOLIO_REPOSITORY` no ambiente do processo com o nome completo do repositório do site. O comando não carrega `.env.local` automaticamente. Por exemplo, no PowerShell:

```powershell
$env:PORTFOLIO_REPOSITORY = "Fabbio-Boli/Portifolio"
npm run sync:github
```

Substitua pelo nome real, revise as alterações em `content/github-projects.json` e faça commit e push para a branch de produção. Uma nova publicação será necessária para mostrar o catálogo atualizado.

Para uma cota maior de consultas à API, `GITHUB_TOKEN` é opcional. O comando lê a variável do ambiente do processo; ele **não carrega automaticamente** o arquivo `.env.local`. Por exemplo, em PowerShell, defina `$env:GITHUB_TOKEN` na sessão antes de executar o comando e remova a variável depois. Nunca registre ou envie um token real ao repositório. O fluxo no GitHub já recebe seu próprio token automaticamente.

## Publicar na Vercel

1. Crie um repositório dedicado no GitHub e envie este projeto para a branch padrão que será usada para produção.
2. Na Vercel, importe esse repositório e configure como branch de produção a mesma branch padrão do GitHub. A configuração padrão do Next.js reconhece o projeto.
3. Em **Settings → Environment Variables**, configure `PORTFOLIO_REPOSITORY` como o nome completo real, por exemplo `Fabbio-Boli/Portifolio`, para o ambiente de produção, e faça o deploy. Ajuste também os demais ambientes em que o catálogo será visualizado.
4. Habilite o fluxo do GitHub Actions e execute-o manualmente uma vez. Verifique a execução em Actions e, se houver alteração no catálogo, confirme o novo commit e a publicação correspondente na Vercel.
5. Depois que a URL pública estiver confirmada, inclua-a no README do perfil GitHub e confira os links de contato e dos projetos.

A execução programada e a publicação dependem da configuração e das permissões dessas contas. Um push para a branch conectada solicita uma nova publicação; o catálogo só muda quando a sincronização encontra diferenças.

