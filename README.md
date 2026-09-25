# Anunciaê! v7

Plataforma de tráfego pago simplificado com autenticação, PostgreSQL e Administração Geral.

## Novidades da v7
- Onboarding inteligente no primeiro acesso do cliente.
- Perfil **Minha empresa** editável em modal, com segmento, produtos/serviços, WhatsApp, site, redes sociais, região atendida, público, diferenciais, ticket médio, objetivo e orçamento de referência.
- Dados do negócio persistidos no PostgreSQL e reutilizados no fluxo de criação de anúncios.
- Novo assistente **Criar anúncio** em 6 etapas: Divulgação → Resultado → Público → Investimento → Arte → Revisão.
- Público, localização, objetivo, orçamento e preferência de controle são pré-preenchidos com o contexto da empresa.
- Revisão final antes da criação; o anúncio continua sendo salvo como rascunho e nenhuma publicação é simulada.
- Edição do anúncio em modal inclui briefing, público e localização.
- Mantidos Manual da marca, Meus anúncios, Concorrentes, Conexões e Administração Geral.

## Produção
Requer `DATABASE_URL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` e `NODE_ENV=production` no Railway.

```bash
npm install
npm test
npm start
```

- Refinamento da etapa Resultado: opção “Acessar meu site” com ação desejada (assinar plano, comprar, orçamento, cadastro, agendamento/reserva ou outra).
- Radios alinhados antes dos ícones e seta do submenu Criar anúncio centralizada.
