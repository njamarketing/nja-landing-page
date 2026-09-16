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

## Sitemap e rastreamento

- `/sitemap.xml`: lista as páginas com conteúdo nos três idiomas (`pt`, `en` e
  `es`), com referências entre as versões traduzidas e português como padrão.
- `/robots.txt`: permite o rastreamento e informa a URL absoluta do sitemap.
- O domínio é definido por `NEXT_PUBLIC_SITE_URL`, com `https://njamarketing.com.br`
  como padrão. Barras finais na configuração não geram URLs duplicadas.
- Ao publicar uma nova página, atualize a lista de rotas em `app/sitemap.ts`.
  Redirecionamentos, páginas de erro e a página de doações ainda sem conteúdo
  não entram nessa lista. `lastModified` deve ser informado apenas quando houver
  uma data real de atualização do conteúdo.
- Após o deploy, envie a URL do sitemap ao Google Search Console e ao Bing
  Webmaster Tools para facilitar a descoberta das páginas.

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
4. Se o domínio público for diferente de `https://njamarketing.com.br`, configure
   `NEXT_PUBLIC_SITE_URL` com a URL completa em **Settings → Environment Variables**
   antes do build. Ela é usada nos metadados, sitemap e robots; quando ausente,
   o projeto usa `https://njamarketing.com.br`.
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

## Produto de criação de sites

A página está em `/pt/website-creation`, com versões em `/en/website-creation` e
`/es/website-creation`. O menu principal inclui o acesso ao produto, e a home tem
uma chamada na seção de soluções. As URLs anteriores (`/{locale}/criacao-de-sites`)
redirecionam permanentemente para a nova rota, preservando o idioma.

O briefing tem três etapas, validação e revisão dos dados. Ao concluir, abre o
WhatsApp da NJA configurado em `HomePage.footer.phone`, com a mensagem preenchida.
O cliente precisa tocar em **Enviar** no WhatsApp; um link `wa.me` não confirma
nem realiza o envio sozinho. Ao voltar, ele confirma o envio e segue ao pagamento.
Há opções para reabrir a conversa, copiar o briefing e editar os dados.
O rascunho é mantido no `sessionStorage` da aba para permitir retorno ou recarga;
não há envio dos dados a uma API própria.

Para ativar o pagamento, configure a variável de ambiente no servidor:

```dotenv
NJA_WEBSITE_PAYMENT_URL=https://seu-provedor.com/seu-link-de-pagamento
```

Em desenvolvimento, use `.env.local` e reinicie o servidor. No ambiente de deploy,
configure a variável e publique novamente. A URL deve usar HTTPS e não conter
credenciais. Enquanto ela estiver ausente ou inválida, a página orienta o cliente
a combinar o pagamento com a equipe no WhatsApp. Nenhum pagamento é criado ou
confirmado pelo site; isso é responsabilidade do provedor do link.

Os textos do produto estão em `data/website-product.ts`; os valores e a montagem
do briefing estão em `lib/website-briefing.ts`. Alterações comerciais devem manter
os textos dos três idiomas e a mensagem de WhatsApp coerentes.

Execute `npm run test:website` para verificar a validação, a montagem da mensagem
e a configuração do link de pagamento (Node.js 22).
