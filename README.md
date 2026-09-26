# Anunciaê! v23

## Item 3 — IA de criação de campanhas

A v23 adiciona preparação real de campanhas com IA. Em **Meus anúncios**, cada rascunho pode ser enviado para a IA, que usa o contexto de **Minha empresa**, **Manual da marca** e os dados específicos do anúncio para criar estratégia, sugestão de público, CTA, texto principal, título e três variações para teste. O resultado fica salvo no PostgreSQL e pode ser visualizado em modal ou regenerado. Nada é publicado em plataformas de mídia nesta etapa.

### Variáveis novas no Railway

- `OPENAI_API_KEY` — obrigatória para a geração por IA.
- `OPENAI_MODEL` — opcional; padrão: `gpt-5.6-luna`.

As variáveis existentes (`DATABASE_URL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `NODE_ENV`) continuam iguais.

### Segurança e comportamento

A chave da IA fica apenas no servidor e nunca é enviada ao navegador. A geração não inventa publicação, não altera orçamento e não publica mídia. Cada campanha permanece isolada por usuário.

### Testes

Execute `npm test`. O teste valida autenticação, onboarding, Manual da marca, CRUD, isolamento, proteção administrativa e o bloqueio seguro da IA quando a chave não está configurada.


## v23
- Corrige o flash da Home no refresh: a interface só é revelada depois de restaurar sessão e tela.
- Refina a IA para gerar três ângulos publicitários realmente diferentes.
- Gera previews visuais com imagens via OpenAI Images API quando a campanha usa “Criar com IA”.
- Exige Responses → Write e Images → Request na chave OpenAI.
- Atualiza todos os marcadores de versão para v23.

### Aprovação de criativos
- Três previews publicitários priorizados no modal.
- Seleção persistente do criativo aprovado, sem publicar mídia.
- Edição individual de título e texto.
- Regeneração individual da imagem.
- Estratégia, público e observações em área recolhível.
- Manual da marca aceita até 3 imagens reais de referência, além da logo; quando disponíveis, a geração visual usa essas imagens como referência.

### Refinamentos v23
- Corrige o preenchimento do botão “Visualizar IA” e padroniza “Gerar três novas opções” como ação principal.
- “Gerar outra imagem” agora mostra estado de processamento e erro explícito, e atualiza somente o criativo escolhido.
- Ao escolher um anúncio, a plataforma prepara também masters horizontal e vertical, além do quadrado, para futura adaptação aos posicionamentos de Meta e Google.
- Mantém imagem, texto, título, CTA e destino como recursos separados, preservando a estrutura necessária às integrações reais.
- Corrige novamente o alinhamento da seta de “Criar anúncio”.

## Ajustes v23
- Remove a caixa introdutória redundante “Campanha preparada” do modal de criativos.
- Reforça o clique de “Gerar outra imagem” com delegação de eventos no modal, estado visível de processamento e tratamento de erro.
- Substitui o caractere textual da seta de “Criar anúncio” por uma seta CSS geométrica, alinhada pelo próprio flex do botão.
- Mantém logo como ativo separado da marca para Meta/Google; o preview não força a logo dentro da imagem gerada, evitando distorção de marca pela IA.

### Ajuste de formatos v23
- O criativo escolhido passa a ser o master visual único.
- Horizontal (1,91:1) e vertical (9:16) são adaptados a partir da mesma imagem master, preservando a composição principal.
- Os três formatos reutilizam exatamente o mesmo arquivo master; somente a janela de enquadramento muda conforme a proporção, sem nova interpretação pela IA.
- Isso evita mudanças de objetos, cores, composição e identidade entre formatos e também evita custo adicional de geração de imagem para as adaptações.

### Adaptação de formatos v23
- O quadrado permanece como criativo master.
- Horizontal e vertical são gerados por edição do master com alta fidelidade e expansão generativa, evitando simples crop.
- O prompt exige preservação de cena, sujeito, cores, iluminação e elementos principais, completando apenas as novas áreas do canvas.

### Correção v23
- Remove o parâmetro `input_fidelity`, incompatível com a chamada de edição usando GPT-Image-2.
- Mantém a imagem escolhida como entrada da edição e preserva a expansão generativa para os formatos horizontal e vertical.

### Imagens próprias v23
- Cada opção de criativo permite enviar uma imagem master própria para adaptação automática.
- O cliente também pode enviar os três formatos finais (1:1 — 1080×1080px, 1,91:1 — 1200×628px e 9:16 — 1080×1920px); nesses casos os arquivos são preservados sem regeneração.
- Formatos manuais permanecem intactos ao escolher o anúncio e são identificados como imagem enviada pelo cliente.


## Meta Ads OAuth (v23)
Callback oficial: `https://anunciae-production.up.railway.app/api/integrations/meta/callback`

Variáveis no Railway (não colocar valores no código/GitHub):
- `META_APP_ID`
- `META_APP_SECRET`
- `PUBLIC_BASE_URL=https://anunciae-production.up.railway.app`
- `META_SCOPES` (opcional; padrão: `ads_management,ads_read,business_management,pages_show_list,pages_read_engagement`)

O token retornado pela Meta é armazenado cifrado com AES-256-GCM usando uma chave derivada do App Secret. A interface só marca a integração como conectada após troca real do código OAuth por um token.
