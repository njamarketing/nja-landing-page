# NJA Marketing

Projeto institucional em Next.js com rotas por idioma.

## Estrutura

```text
app/
  [locale]/
    page.tsx
    privacy-policy/
    terms-conditions/
    account-cancellation-policy/
    donations/
components/
  layout/
    Header.tsx
    Footer.tsx
  providers/
    LenisProvider.tsx
i18n/
messages/
utils/
```

## Desenvolvimento

Use Node.js 22 e npm. Se utilizar nvm, execute `nvm use` na raiz do projeto.

```bash
npm ci
npm run dev
```

## Build e deploy automático na Vercel

O arquivo `vercel.json` configura Next.js, instalação com `npm ci`, build com
`npm run build` e deployments por Git habilitados. O Node.js 22 é definido em
`package.json`, e as versões das dependências estão em `package-lock.json`.

### Conectar o repositório

Esta etapa precisa ser feita uma vez na conta da Vercel. O arquivo de configuração
não cria o projeto nem conecta o GitHub sozinho.

1. Na [Vercel](https://vercel.com/new), importe o repositório
   `njamarketing/nja-landing-page`. Se o projeto já existir, conecte esse repositório
   em **Settings → Git**.
2. Use a raiz do repositório (`./`) como **Root Directory** e **Next.js** como
   **Framework Preset**. Os comandos de instalação e build vêm de `vercel.json`;
   mantenha o **Output Directory** no padrão do framework.
3. Defina `main` como **Production Branch** nas configurações do ambiente de
   produção e mantenha **Ignored Build Step** em **Automatic**.
4. Se o domínio público for diferente de `https://nja.marketing`, configure
   `NEXT_PUBLIC_SITE_URL` com a URL completa em **Settings → Environment Variables**
   antes do build. Ela é usada nos metadados, sitemap e robots; quando ausente,
   o projeto usa `https://nja.marketing`.
5. Envie estes arquivos de configuração ao GitHub e execute o primeiro deploy.

Com a integração conectada:

- Pushes e merges em `main` geram build e deploy de produção.
- Pushes em outras branches e pull requests geram deployments de preview.

A integração nativa faz a automação sem precisar de um workflow do GitHub Actions.
Consulte a [documentação de integração Git da Vercel](https://vercel.com/docs/git).

### Validar localmente

```bash
npm ci
npm run build
```

Para executar o resultado do build localmente, use `npm start`.
