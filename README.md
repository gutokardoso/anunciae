# Anunciaê! v1
**Anunciar ficou fácil.**

Primeira base funcional do SaaS de anúncios autônomos para pequenos negócios.

## Incluído nesta versão
- Dashboard simplificado, sem métricas técnicas falsas.
- Criação de campanha por objetivo e orçamento.
- Três fluxos criativos: IA, arte própria, arte própria + melhoria por IA.
- Biblioteca da Marca e instruções de preservação visual.
- Modo “quero aprovar” e estrutura de modo automático.
- Radar de concorrentes com cadastro de referências.
- Histórico de decisões automáticas.
- Central de conexões para Meta Ads, Google Ads, WhatsApp e pagamentos.
- Persistência no servidor em `data/db.json` para desenvolvimento.
- Layout responsivo.
- Endpoints de health/state/onboarding/brand/campaigns/competitors/integrations.

## Regra de integração
Nenhuma integração externa é simulada. Botões de conexão retornam `CREDENTIALS_REQUIRED` até que as credenciais e autorizações oficiais sejam configuradas.

## Executar
Requer Node.js 20+.

```bash
npm start
```
Abra `http://localhost:3000`.

## Testes
```bash
npm test
```

## Próximas integrações reais
- Meta Marketing API: OAuth, contas de anúncio, campanhas, conjuntos, criativos, insights e Conversions API conforme permissões aprovadas.
- Google Ads API: OAuth/developer token, contas, budgets, Search/Performance Max/Demand Gen conforme suporte oficial, conversões e relatórios.
- Storage de produção para logos, imagens e vídeos.
- Provedor de IA para geração/análise de criativos.
- Cobrança recorrente.
- Banco PostgreSQL e autenticação multi-tenant antes de produção pública.

> A API pública da Biblioteca de Anúncios da Meta possui escopo/requisitos próprios. O Radar não deve presumir acesso programático irrestrito a todos os anúncios comerciais.
