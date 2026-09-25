# Anunciaê! v3

Versão com cadastro/login, isolamento por usuário, Administração Geral e persistência real em PostgreSQL.

## Railway
Variáveis do serviço `anunciae`:
- `DATABASE_URL` = referência ao `Postgres.DATABASE_URL` (já configurada).
- `ADMIN_EMAIL` = e-mail do Administrador Geral.
- `ADMIN_PASSWORD` = senha forte do Administrador Geral, mínimo 8 caracteres.
- `NODE_ENV=production` = recomendado.

Ao iniciar com `DATABASE_URL`, a aplicação cria automaticamente tabelas e índices sem apagar dados existentes. O admin só é criado automaticamente quando `ADMIN_EMAIL` e `ADMIN_PASSWORD` estão definidos.

## Banco
Tabelas: `users`, `sessions`, `businesses`, `brands`, `campaigns`, `competitors`, `decisions`, `integrations`, `creatives` e `campaign_results`. Dados operacionais são vinculados ao usuário autenticado. A Administração Geral exige `role=admin`.

Sem `DATABASE_URL`, a aplicação usa memória somente para desenvolvimento/QA; não há mais persistência em `db.json`.

## QA
`npm test`

Depois do deploy, `/api/health` deve retornar `version: anunciae-v3` e `database: postgresql`.
