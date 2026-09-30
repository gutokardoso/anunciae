# Public.IA v52

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
- OAuth Web real com callback `https://anunciae-production.up.railway.app/api/integrations/google/callback`.
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
