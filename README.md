# Anunciaê! v8

Plataforma de tráfego pago simplificado com autenticação, PostgreSQL e Administração Geral.

## Novidades da v8
- Refresh mantém o usuário na mesma área/tela da aplicação; a logo continua levando explicitamente para a Home pública.
- **Minha empresa** foi simplificada: objetivo da campanha, investimento diário e preferência de controle foram removidos por serem informações específicas de cada anúncio.
- **Ticket médio** foi renomeado para **Valor médio por cliente (ticket médio)** e ganhou explicação no formulário.
- **Tipo de atendimento** agora diferencia Online, Presencial/local e Online e presencial.
- Para negócios online, Cidade/base e Região atendida deixam de aparecer e são substituídas por **Área de atuação**: Todo o Brasil, Países específicos ou Internacional.
- Em Países específicos, o usuário informa os países atendidos.
- Para negócios presenciais, Cidade/base e Região atendida continuam disponíveis.
- O assistente de criação usa a área de atuação da empresa como contexto inicial de localização, mas objetivo, orçamento e controle são definidos no próprio anúncio.
- Mantidos o assistente em 6 etapas, Manual da marca, Meus anúncios, Concorrentes, Conexões e Administração Geral.

## Produção
Requer `DATABASE_URL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` e `NODE_ENV=production` no Railway.

```bash
npm install
npm test
npm start
```
