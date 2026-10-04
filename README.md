# Public.IA v103

### Identidade Public.IA
- Nome comercial migrado de Public.IA para **Public.IA**.
- Identidade oficial aplicada à Home e às áreas autenticadas: Cobalto `#2436F5`, Sol `#FFC21A`, Tinta `#0E1330`, Névoa `#F1F3FF`.
- Tipografia: Quicksand em marca/títulos/números e DM Sans em interface/textos.
- O conteúdo comercial e a estrutura funcional da Home v45 foram preservados; a referência visual enviada foi usada como direção de estilo.
- Callbacks OAuth e sais criptográficos existentes foram preservados nesta versão para não interromper integrações/tokens durante a migração de domínio.

## v48 — Identidade Public.IA + base v45 — LinkedIn Ads OAuth real (leitura segura)
- Ativa OAuth 2.0 individual por usuário para LinkedIn Advertising API.
- Solicita somente `r_ads` nesta etapa; não cria, altera nem publica campanhas.
- Descobre contas Ads do membro autenticado por `adAccountUsers?q=authenticatedUser`.
- Permite selecionar e persistir a conta LinkedIn Ads por usuário.
- Mantém Meta, Google e X Ads existentes.
- No Development Tier, a conta Ads precisa estar mapeada ao aplicativo no Developer Portal.

## v44 — X Ads MCP oficial (OAuth 2.0, leitura segura)
- Corrige persistência do OAuth do X para usuários antigos usando UPSERT.
- Migra automaticamente linhas de integrações ausentes para usuários já existentes.
- Separa visualmente OAuth autorizado, acesso ao X Ads API e conta X Ads selecionada.
- Registra no metadata o resultado da última verificação do X Ads API sem expor tokens.


## Nova Home comercial

A v31 reconstrói a página inicial para uma apresentação mais comercial e publicitária, com hero orientado a benefício, demonstração visual do produto, fluxo simplificado, comparação de complexidade, exemplos de anúncios, contexto da marca, controle de orçamento, canais, resultados em linguagem simples, Autopilot, objeções, planos e FAQ. Os planos exibidos são **Iniciante R$ 79/mês**, **Intermediário R$ 149/mês** e **PRO R$ 299/mês**. A assinatura é apresentada separadamente da verba de mídia e nenhuma integração ainda indisponível é anunciada como ativa.


## Item 3 — IA de criação de campanhas

A v31 adiciona preparação real de campanhas com IA. Em **Meus anúncios**, cada rascunho pode ser enviado para a IA, que usa o contexto de **Minha empresa**, **Manual da marca** e os dados específicos do anúncio para criar estratégia, sugestão de público, CTA, texto principal, título e três variações para teste. O resultado fica salvo no PostgreSQL e pode ser visualizado em modal ou regenerado. Nada é publicado em plataformas de mídia nesta etapa.

### Variáveis novas no Railway

- `OPENAI_API_KEY` — obrigatória para a geração por IA.
- `OPENAI_MODEL` — opcional; padrão: `gpt-5.6-luna`.

As variáveis existentes (`DATABASE_URL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `NODE_ENV`) continuam iguais.

### Segurança e comportamento

A chave da IA fica apenas no servidor e nunca é enviada ao navegador. A geração não inventa publicação, não altera orçamento e não publica mídia. Cada campanha permanece isolada por usuário.

### Testes

Execute `npm test`. O teste valida autenticação, onboarding, Manual da marca, CRUD, isolamento, proteção administrativa e o bloqueio seguro da IA quando a chave não está configurada.


## v31
- Corrige o flash da Home no refresh: a interface só é revelada depois de restaurar sessão e tela.
- Refina a IA para gerar três ângulos publicitários realmente diferentes.
- Gera previews visuais com imagens via OpenAI Images API quando a campanha usa “Criar com IA”.
- Exige Responses → Write e Images → Request na chave OpenAI.
- Atualiza todos os marcadores de versão para v31.

### Aprovação de criativos
- Três previews publicitários priorizados no modal.
- Seleção persistente do criativo aprovado, sem publicar mídia.
- Edição individual de título e texto.
- Regeneração individual da imagem.
- Estratégia, público e observações em área recolhível.
- Manual da marca aceita até 3 imagens reais de referência, além da logo; quando disponíveis, a geração visual usa essas imagens como referência.

### Refinamentos v31
- Corrige o preenchimento do botão “Visualizar IA” e padroniza “Gerar três novas opções” como ação principal.
- “Gerar outra imagem” agora mostra estado de processamento e erro explícito, e atualiza somente o criativo escolhido.
- Ao escolher um anúncio, a plataforma prepara também masters horizontal e vertical, além do quadrado, para futura adaptação aos posicionamentos de Meta e Google.
- Mantém imagem, texto, título, CTA e destino como recursos separados, preservando a estrutura necessária às integrações reais.
- Corrige novamente o alinhamento da seta de “Criar anúncio”.

## Ajustes v31
- Remove a caixa introdutória redundante “Campanha preparada” do modal de criativos.
- Reforça o clique de “Gerar outra imagem” com delegação de eventos no modal, estado visível de processamento e tratamento de erro.
- Substitui o caractere textual da seta de “Criar anúncio” por uma seta CSS geométrica, alinhada pelo próprio flex do botão.
- Mantém logo como ativo separado da marca para Meta/Google; o preview não força a logo dentro da imagem gerada, evitando distorção de marca pela IA.

### Ajuste de formatos v31
- O criativo escolhido passa a ser o master visual único.
- Horizontal (1,91:1) e vertical (9:16) são adaptados a partir da mesma imagem master, preservando a composição principal.
- Os três formatos reutilizam exatamente o mesmo arquivo master; somente a janela de enquadramento muda conforme a proporção, sem nova interpretação pela IA.
- Isso evita mudanças de objetos, cores, composição e identidade entre formatos e também evita custo adicional de geração de imagem para as adaptações.

### Adaptação de formatos v31
- O quadrado permanece como criativo master.
- Horizontal e vertical são gerados por edição do master com alta fidelidade e expansão generativa, evitando simples crop.
- O prompt exige preservação de cena, sujeito, cores, iluminação e elementos principais, completando apenas as novas áreas do canvas.

### Correção v31
- Remove o parâmetro `input_fidelity`, incompatível com a chamada de edição usando GPT-Image-2.
- Mantém a imagem escolhida como entrada da edição e preserva a expansão generativa para os formatos horizontal e vertical.

### Imagens próprias v31
- Cada opção de criativo permite enviar uma imagem master própria para adaptação automática.
- O cliente também pode enviar os três formatos finais (1:1 — 1080×1080px, 1,91:1 — 1200×628px e 9:16 — 1080×1920px); nesses casos os arquivos são preservados sem regeneração.
- Formatos manuais permanecem intactos ao escolher o anúncio e são identificados como imagem enviada pelo cliente.


## Meta Ads OAuth (v32)
Callback oficial: `https://anunciae-production.up.railway.app/api/integrations/meta/callback`

Variáveis no Railway (não colocar valores no código/GitHub):
- `META_APP_ID`
- `META_APP_SECRET`
- `PUBLIC_BASE_URL=https://anunciae-production.up.railway.app`
- `META_SCOPES` (opcional; padrão: `ads_management,ads_read,business_management,pages_show_list,pages_read_engagement`)

O token retornado pela Meta é armazenado cifrado com AES-256-GCM usando uma chave derivada do App Secret. A interface só marca a integração como conectada após troca real do código OAuth por um token.


## Meta Ads — validação segura v32
- Adiciona validação em tempo real da autorização, portfólio, conta de anúncios, Página e Instagram antes de criar qualquer objeto publicitário.
- A validação usa a Marketing API v26.0 e não cria campanha, conjunto, anúncio, cobrança ou publicação.
- O resultado fica registrado na integração apenas como último estado de validação.
- Esta etapa é deliberadamente anterior à criação da primeira campanha pausada, reduzindo o risco de criar objetos com ativos incorretos ou conta restrita.

## v37 — Refinamento visual multicanal
- Estrutura comum de canais publicitários: Meta Ads, Google Ads, TikTok Ads, LinkedIn Ads e X Ads.
- Conexões exibe os cinco canais de mídia sem simular autorização; somente Meta permanece funcional nesta etapa.
- Criar anúncio ganhou a etapa Canais e permite selecionar um ou mais destinos.
- A campanha salva os canais escolhidos como dados estruturados para os futuros adaptadores de publicação e métricas.
- WhatsApp e Pagamentos permanecem integrações auxiliares separadas dos canais de mídia.
- A validação Meta v26.0 da v32 foi preservada integralmente.


## Google Ads OAuth (v40)
- OAuth Web real com callback oficial `https://publicia.com.br/api/integrations/google/callback` quando `PUBLIC_BASE_URL=https://publicia.com.br`.
- Escopo `https://www.googleapis.com/auth/adwords`, acesso offline e refresh token criptografado em repouso.
- Variáveis: `GOOGLE_CLIENT_ID` e `GOOGLE_CLIENT_SECRET`.
- A consulta à Google Ads API usa o nível de acesso associado ao projeto Google Cloud/OAuth e não exige `GOOGLE_ADS_DEVELOPER_TOKEN`.
- Lista contas acessíveis pela Google Ads API v25, permite selecionar/salvar a conta e desconectar/revogar a autorização.
- Esta versão não cria nem publica campanhas no Google Ads.


## v40 — Google Ads API
- Remove a exigência legada de `GOOGLE_ADS_DEVELOPER_TOKEN`.
- Mantém o OAuth e os tokens já persistidos.
- Consulta contas acessíveis com Bearer OAuth e preserva a seleção de conta.
- Nenhuma campanha é criada ou publicada nesta versão.


## v40 — ajustes Google Ads e LinkedIn Ads
- Ícone do LinkedIn Ads passou a usar a marca vetorial limpa via Simple Icons, sem o contorno aplicado aos SVGs genéricos da interface.
- Nenhuma alteração funcional nas integrações Meta Ads ou Google Ads.


## v40 — UX Google Ads e ícone LinkedIn
- Ao salvar a seleção da conta Google Ads com sucesso, o modal fecha automaticamente e a tela de Conexões é atualizada.
- O ícone do LinkedIn Ads agora é um SVG inline/autossuficiente, sem dependência de CDN externa e protegido contra estilos globais de stroke.


## v41 — conexão oficial do X / X Ads
- Usa OAuth 2.0 com PKCE para que cada cliente autorize o X Ads MCP em modo somente leitura.
- Usa `X_CLIENT_ID` e `X_CLIENT_SECRET` somente no servidor; tokens OAuth 2.0 ficam criptografados no banco.
- Adiciona consulta e seleção de contas no X Ads API v12 quando o App tiver acesso ao produto Ads API.
- Se o OAuth comum estiver conectado mas o App ainda não tiver acesso ao X Ads API, a interface informa isso sem simular contas ou publicação.
- Nenhuma campanha é criada ou publicada nesta etapa.


### X Ads MCP
- Usa o endpoint remoto `https://ads-api.x.com/mcp`.
- OAuth 2.0 com PKCE e escopos `ads.read offline.access`.
- Requer `X_CLIENT_ID` e `X_CLIENT_SECRET` no Railway.
- A v44 não solicita `ads.write` e não cria/publica campanhas no X.


## Política de Privacidade
Página pública disponível em `/privacidade` e `/politica-de-privacidade`, incluindo seção de direitos e solicitação de exclusão de dados.


## Termos de Serviço
Página pública disponível em `/termos` e `/termos-de-servico`, com regras de uso, integrações, campanhas, investimento, IA, conteúdo, planos, disponibilidade, privacidade e responsabilidades.


## Exclusão de dados do usuário
Página pública disponível em `/exclusao-de-dados` e `/exclusao`, com instruções claras para solicitar a exclusão dos dados associados à conta PublicIA e às integrações autorizadas.


## v60 — validação segura de publicação Google Ads
- Adiciona validação real de permissão de escrita via Google Ads API v25 usando `validateOnly=true`.
- A validação não cria campanha, orçamento, anúncio ou cobrança.
- Mantém a conta selecionada e o OAuth existentes.


## v61 — primeira criação real no Google Ads, sempre pausada
- Após escolher o criativo, campanhas com Google Ads selecionado exibem **Criar no Google (pausado)**.
- Cria orçamento diário, campanha Search, grupo, anúncio responsivo e palavras-chave reais pela Google Ads API v25.
- Campanha, grupo, anúncio e palavras-chave são criados em **PAUSA**; nenhum gasto é iniciado.
- Persiste os resource names retornados pelo Google e bloqueia criação duplicada.
- Segmentação Brasil é aplicada quando a campanha/empresa indica atuação nacional; demais segmentações serão ampliadas na próxima etapa.


## v62 — publicação multicanal centralizada
- Substitui o botão específico “Criar no Google (pausado)” por um único **Publicar anúncio**.
- Depois da primeira publicação, o botão passa a **Gerenciar publicação**.
- Novo modal reúne em uma única experiência todos os canais selecionados no anúncio e seus status.
- Google Ads continua usando a criação real em pausa já validada na v61; canais ainda sem publicação automática aparecem de forma transparente como pendentes, sem criar botões separados.
- Mantém a proposta da PublicIA: o usuário cria e gerencia um anúncio, e a plataforma centraliza a distribuição multicanal.


## v63 — espaçamento do modal multicanal
- Adiciona respiro lateral e inferior consistente ao conteúdo do modal de publicação multicanal.
- Mantém a publicação real sem alterações: nenhum anúncio é disparado automaticamente.


## v64 — TikTok preparado + preflight multicanal
- Prepara OAuth do TikTok Marketing API sem simular conexão: callback, token cifrado, consulta e seleção de advertiser.
- A conexão TikTok só é habilitada quando `TIKTOK_APP_ID`, `TIKTOK_APP_SECRET` e a URL oficial de autorização `TIKTOK_AUTH_URL` estiverem configuradas após aprovação do app.
- Adiciona preflight central de publicação multicanal, sem escrita externa, para validar conexão/conta/adaptador por canal antes da futura publicação unificada.
- Mantém a criação Google em pausa já existente e não habilita publicação real nos demais canais.
- Mantém temporariamente o callback/fallback de produção já registrado em `anunciae-production.up.railway.app` e os sais criptográficos legados para não quebrar OAuth/tokens durante as análises externas. A migração para `publicia.com.br` será coordenada após as aprovações.


## v66 — X Ads Standard API + base de Resultados/Autopilot
- Migra o fluxo futuro do X Ads para o Standard Ads API aprovado, usando OAuth 1.0a de três etapas por anunciante, conforme a documentação oficial do X Ads API.
- Usa `X_CONSUMER_KEY` e `X_CONSUMER_SECRET` já mantidos no Railway; tokens do anunciante ficam cifrados em repouso.
- Mantém compatibilidade de leitura com conexões OAuth 2.0/MCP existentes apenas durante a migração. A interface pede uma única reconexão para ativar o Standard Ads API.
- Consulta contas por `https://ads-api.x.com/<versão>/accounts` após OAuth 1.0a e permite persistir a conta selecionada.
- O Standard Access fica marcado como pronto para leitura/gestão, porém `externalWritesEnabled=false`: nenhuma campanha X é criada, alterada, ativada ou publicada nesta versão.
- O preflight multicanal reconhece o X Standard como preparado, mas bloqueado até a homologação multicanal final.
- O painel deixa explícito que Resultados/Autopilot só exibem dados reais após campanhas publicadas e sincronizadas; não há métricas simuladas.
- Mantém o sal criptográfico legado `anunciae-x-mcp-token` para conseguir ler tokens já persistidos durante a migração. Não alterar esse valor sem migração de dados.


## v68
- LinkedIn Ads: OAuth `rw_ads` para homologação, criação segura de campanha em `DRAFT` e edição controlada do rascunho, sem ativação nem gasto.
- Fluxo visual em Conexões → LinkedIn Ads para o vídeo solicitado na análise do Standard Tier.

## v67 — Resultados unificados + Autopilot seguro + orquestração preparada
- Adiciona **Resultados** ao painel autenticado, consolidando somente registros reais de `campaign_results` por canal.
- Exibe investimento, impressões, cliques, contatos, vendas e receita apenas quando existirem métricas sincronizadas; sem dados, mostra estado vazio explícito.
- Adiciona estado do **Autopilot** baseado em campanhas efetivamente publicadas e métricas reais, mantendo `externalWritesEnabled=false`.
- Mantém o preflight multicanal como porta única de validação antes da futura publicação coordenada em Meta, Google, TikTok, LinkedIn e X.
- Nenhuma nova escrita externa é habilitada nesta versão; publicação e otimizações reais continuam bloqueadas até a homologação multicanal final.


## v69

- Migra o OAuth do LinkedIn Ads para o callback oficial `https://publicia.com.br/api/integrations/linkedin/callback`.
- O LinkedIn deixa de herdar `PUBLIC_BASE_URL` legado do Railway; opcionalmente pode ser sobrescrito por `LINKEDIN_PUBLIC_BASE_URL`.
- Preserva os callbacks legados das demais integrações enquanto suas URLs `publicia.com.br` não forem confirmadas nos respectivos portais, evitando quebrar Meta, Google, TikTok ou X.
- Preserva os sais criptográficos legados `anunciae-*` para manter compatibilidade com tokens já armazenados.


## v72
- Corrige a criação do rascunho de homologação do LinkedIn Ads adicionando `runSchedule` ao Campaign Group e à Campaign.
- Usa a mesma janela segura de 7 dias, iniciando no dia seguinte, nas duas estruturas.
- Mantém Campaign Group e Campaign em `DRAFT`, sem ativação ou veiculação.
- Mantém o callback oficial do LinkedIn em `https://publicia.com.br/api/integrations/linkedin/callback`.

## v71

- Corrige a persistência da autorização de gestão do LinkedIn: uma autorização OAuth concluída pelo fluxo que solicita `r_ads rw_ads` passa a registrar `rw_ads` mesmo quando o endpoint de token devolve apenas um subconjunto/omite scopes.
- Quando existe exatamente uma conta LinkedIn Ads acessível e nenhuma seleção salva, a PublicIA seleciona e persiste essa conta automaticamente.
- Mantém o callback oficial `https://publicia.com.br/api/integrations/linkedin/callback` e não publica nenhum anúncio automaticamente.


## v70
- Corrige a detecção de `rw_ads` após reautorização do LinkedIn quando o endpoint de token não devolve `scope`.
- Preserva a conta LinkedIn Ads selecionada durante a reautorização.


## v73
- Adiciona exclusão segura do rascunho de homologação do LinkedIn Ads.
- Exclui primeiro a Campaign em `DRAFT` e depois o Campaign Group em `DRAFT`, conforme a Marketing API, sem ativação ou gasto.
- Limpa o estado local somente após as exclusões retornarem sucesso, permitindo gravar novamente o fluxo criação → edição para a homologação.


## v74 — auditoria do fluxo + orquestração interna segura
- Auditoria confirmou que o fluxo de criação em 7 etapas, publicação multicanal centralizada, Resultados e base segura do Autopilot já existiam na v73; não foram reconstruídos.
- Adiciona plano interno de distribuição por canal, normalizando um único anúncio da PublicIA para as estruturas esperadas por Meta, Google, TikTok, LinkedIn e X, sem executar escrita externa.
- O modal central de publicação ganhou **Ver plano de distribuição**, mantendo `externalWrites=false`.
- **Meu painel** passa a consumir o mesmo resumo de métricas reais de Resultados, sem números simulados.
- Corrige os marcadores visíveis do assistente de criação para 7 etapas e o rodapé para v74.
- Nenhuma publicação real nova foi habilitada; o teste multicanal continua aguardando as aprovações externas.


## v77 — alinhamento das 7 etapas
- Mantém as 7 etapas do fluxo Criar anúncio lado a lado em telas desktop, corrigindo a quebra da etapa 7 Revisão.
- Preserva o comportamento responsivo já existente em telas menores.
- Nenhum fluxo de criação, publicação ou integração foi alterado.

## v77 — inteligência operacional unificada
- Resultados consolidados por período (7/30/90 dias), com comparação automática ao período anterior.
- KPIs derivados apenas de dados reais: CTR, CPC, CPM, custo por contato, custo por venda e ROAS.
- Detalhamento por canal e por campanha, sem simulação de métricas.
- Meta de negócio mensal em linguagem simples (contatos, vendas, receita ou visitas).
- Timeline de decisões e eventos operacionais da PublicIA.
- Contexto unificado da IA (`/api/ai/context`): empresa, marca, campanhas, concorrentes, conexões sanitizadas, plano de distribuição, métricas, metas e histórico. Tokens e segredos nunca entram no contexto.
- Análise global com IA (`/api/ai/analyze`) baseada somente nos dados reais disponíveis.
- Guardrail mantido: análise ampla não equivale a permissão irrestrita de escrita. Ações externas continuam submetidas aos fluxos, limites e autorizações da plataforma; `externalWrites=false` nesta fase.


## v78 — Planos e Entitlements
- Cria uma camada central de entitlements para Iniciante (R$79), Intermediário (R$149) e PRO (R$299).
- Limites reais no backend: até 2, 4 e 5 canais por anúncio, respectivamente.
- Autopilot: Iniciante sem automação, Intermediário em recomendação e PRO com modo automático dentro dos limites autorizados.
- Resultados respeitam o plano: histórico de 30 dias no Iniciante; comparação, detalhamento por campanha, metas e timeline a partir do Intermediário; PRO recebe o conjunto completo.
- Novas contas entram no Iniciante. Contas existentes são preservadas como PRO durante a migração para evitar regressão de funcionalidades já disponíveis antes da v78.
- Administração Geral passa a permitir alterar o plano comercial do usuário sem alterar OAuth, campanhas ou dados existentes.
- `/api/state` expõe assinatura e entitlements sanitizados; `/api/plans` expõe a matriz vigente.
- Corrige o versionamento interno para 78.0.0.
- Cobrança ainda não é simulada: `billingConnected=false` até a futura integração comercial.


## v80 — Meu perfil e gestão da conta
O menu Minha empresa, Manual da marca e Concorrentes foi agrupado em Meu perfil. O perfil exibe cadastro, plano e datas, permite alterar plano, trocar senha e excluir a própria conta com confirmação de senha. As regras de Entitlements da v78 foram preservadas.


## v80 — Data Hub
Camada central de sincronização e normalização de métricas multicanal. Sincronização é somente leitura (`externalWrites=false`). Google e Meta possuem coletores reais; TikTok, LinkedIn e X usam o mesmo contrato e retornam estado explícito enquanto a API/permissão de métricas não estiver homologada. Inclui `data_sync_runs`, idempotência por campanha/canal/data, freshness no contexto da IA e preservação do payload bruto.


## v81 — Conversion Hub + WhatsApp Business
- Conexões separadas em Publicidade e Conversões e atendimento. A cobrança da assinatura não aparece como conexão do cliente.
- WhatsApp Business/Cloud API preparado com OAuth real, seleção de WABA/número e webhook assinado.
- Conversion Hub normaliza eventos de conversa, lead, venda e receita sem armazenar conteúdo das mensagens.
- Eventos recebidos pelo WhatsApp são deduplicados por ID externo e isolados por cliente.
- O contexto global da IA recebe um resumo do Conversion Hub.
- Click-to-WhatsApp continua sendo campanha Meta Ads; WhatsApp é destino/conversão, não sexto canal de mídia.
- Variáveis: WHATSAPP_APP_ID, WHATSAPP_APP_SECRET, WHATSAPP_WEBHOOK_VERIFY_TOKEN. APP_ID/SECRET podem reutilizar META_APP_ID/META_APP_SECRET quando o mesmo app Meta possuir os produtos/permissões necessários.
- Callback: /api/integrations/whatsapp/callback. Webhook: /api/integrations/whatsapp/webhook.


## v82 — Dados e conversões
- Remove Cobrança/Pagamentos da tela Conexões: cobrança da assinatura é infraestrutura administrativa da PublicIA.
- Adiciona a área Dados e conversões com Google Analytics 4, CRM e E-commerce.
- Esses conectores aparecem como Em breve e não simulam autorização enquanto os adaptadores reais ainda não estiverem implementados.
- Mantém WhatsApp Business em Conversões e atendimento e as cinco Ads APIs em Publicidade.


## v83 — Alinhamento visual de Conexões
- Move os títulos Publicidade, Conversões e atendimento e Dados e conversões para cima dos respectivos cards.
- Mantém as caixas das integrações alinhadas na mesma grade e preserva o comportamento responsivo.


## v84 — Correção definitiva do alinhamento em Conexões
- Corrige a regressão visual em que os títulos dos grupos ainda podiam ocupar a coluna lateral por CSS em cache.
- Força cada título a ocupar uma linha completa acima dos cards.
- Adiciona versionamento de cache aos assets CSS/JS (`?v=84`) para garantir que o navegador carregue o layout novo após deploy.
- Nenhuma integração ou regra funcional foi alterada.


## v85 — Conversion Sources
- Google Analytics 4 real via OAuth Google, seleção de propriedade e sincronização com Analytics Data API.
- GA4 alimenta o Conversion Hub com key events e receita agregada, preservando origem/campaign ID quando disponível.
- CRM e E-commerce viram hubs de conectores com catálogo preparado para HubSpot, RD Station, Pipedrive, Salesforce, Shopify, WooCommerce e Nuvemshop.
- Adiciona Site / API PublicIA com chave própria para receber eventos de conversão server-side sem depender de terceiros.
- Conversion Hub passa a suportar quantidade agregada de eventos sem criar milhares de linhas artificiais.
- Nenhuma escrita em plataformas de anúncios é habilitada.


## v87 — GA4 auditado e preparado para produção
- Auditoria da v85 confirmou que o fluxo GA4 já estava implementado: OAuth somente leitura, seleção de propriedade, Analytics Admin API, Analytics Data API e sincronização para o Conversion Hub.
- Mantém o GA4 separado do Google Ads para não misturar permissões nem conexões de clientes.
- Diagnóstico `/api/health` agora informa `ga4OAuthConfigured` e `ga4CallbackUrl`.
- Teste dedicado valida OAuth GA4, escopo `analytics.readonly`, callback oficial e isolamento de estado.
- Para produção com `PUBLIC_BASE_URL=https://publicia.com.br`, o URI OAuth que deve estar autorizado no Google Cloud é `https://publicia.com.br/api/integrations/ga4/callback`.
- O callback do Google Ads continua sendo `https://publicia.com.br/api/integrations/google/callback`; os dois devem permanecer autorizados.
- Nenhuma escrita no Google Analytics foi habilitada.


## v90 — auditoria Conversion Hub
- Mantém Site/API, GA4 e WhatsApp como fontes normalizadas do Conversion Hub.
- Resultados passa a expor conversões rastreadas por fonte sem misturá-las silenciosamente às métricas de mídia.
- Meu painel usa conversões reais do Conversion Hub quando disponíveis, preservando investimento apenas do Data Hub.


## v90 — padronização de espaçamento dos modais
- Auditoria dos modais existentes.
- Corrigido espaçamento interno do modal Site / API PublicIA e dos hubs CRM/E-commerce.
- Mantido o espaçamento já existente nos demais modais para evitar regressões e padding duplicado.
- Responsividade preservada com padding reduzido no mobile.


## v91 — Site/API PublicIA
- Guia de implementação e teste interno não contaminante do Conversion Hub.


## v96 — Tag PublicIA e instalação simples
- Corrige a referência principal do README para v96.
- Dados do seu site passa a gerar uma identificação/tag única por cliente.
- Usuário escolhe eventos e plataforma antes da instalação.
- Site próprio recebe uma Tag PublicIA única para instalação inicial.
- API avançada permanece opcional e recolhida.
- Vendas e receita continuam recomendadas via backend/API para confirmação confiável.


## v103 — conversões confiáveis e privacidade por padrão
- A Tag PublicIA registra somente fatos observáveis no navegador (visitas e conversas observáveis) e envia imediatamente ao servidor.
- Removida a heurística de cadastro automático como fonte oficial de lead.
- Leads, vendas e receita passam a exigir fonte confiável: CRM, e-commerce ou sistema comercial; meios de pagamento ficam opcionais.
- A interface explica a origem/confiabilidade dos dados e a política de minimização: credenciais, senhas, cartão, saldo e extrato não são dados de análise da IA.
