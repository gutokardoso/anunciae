# Anunciaê! v5

Plataforma de tráfego pago simplificado com autenticação, PostgreSQL e Administração Geral.

## Novidades da v5
- **Meus anúncios** agora é submenu de **Criar anúncio**.
- Edição de anúncio em **modal**, sem sair da listagem.
- **Minha marca / Biblioteca da marca** renomeados para **Manual da marca**.
- Manual da marca em modal, com card organizado para logo, cores reais, regras e presença digital.
- Regras salvas ficam visíveis no próprio Manual da marca.
- Logo salva e exibida no card (PNG/JPG/WebP até 1 MB).
- Cadastro de site, Instagram, Facebook, TikTok, LinkedIn e YouTube para contexto da marca.
- Manual pode ser editado ou removido.

## Produção
Requer `DATABASE_URL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` e `NODE_ENV=production` no Railway.

```bash
npm install
npm test
npm start
```
