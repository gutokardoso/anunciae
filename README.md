# Anunciaê! v16

## Item 3 — IA de criação de campanhas

A v16 adiciona preparação real de campanhas com IA. Em **Meus anúncios**, cada rascunho pode ser enviado para a IA, que usa o contexto de **Minha empresa**, **Manual da marca** e os dados específicos do anúncio para criar estratégia, sugestão de público, CTA, texto principal, título e três variações para teste. O resultado fica salvo no PostgreSQL e pode ser visualizado em modal ou regenerado. Nada é publicado em plataformas de mídia nesta etapa.

### Variáveis novas no Railway

- `OPENAI_API_KEY` — obrigatória para a geração por IA.
- `OPENAI_MODEL` — opcional; padrão: `gpt-5.6-luna`.

As variáveis existentes (`DATABASE_URL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `NODE_ENV`) continuam iguais.

### Segurança e comportamento

A chave da IA fica apenas no servidor e nunca é enviada ao navegador. A geração não inventa publicação, não altera orçamento e não publica mídia. Cada campanha permanece isolada por usuário.

### Testes

Execute `npm test`. O teste valida autenticação, onboarding, Manual da marca, CRUD, isolamento, proteção administrativa e o bloqueio seguro da IA quando a chave não está configurada.


## v16
- Corrige o flash da Home no refresh: a interface só é revelada depois de restaurar sessão e tela.
- Refina a IA para gerar três ângulos publicitários realmente diferentes.
- Gera previews visuais com imagens via OpenAI Images API quando a campanha usa “Criar com IA”.
- Exige Responses → Write e Images → Request na chave OpenAI.
- Atualiza todos os marcadores de versão para v16.

### Aprovação de criativos
- Três previews publicitários priorizados no modal.
- Seleção persistente do criativo aprovado, sem publicar mídia.
- Edição individual de título e texto.
- Regeneração individual da imagem.
- Estratégia, público e observações em área recolhível.
- Manual da marca aceita até 3 imagens reais de referência, além da logo; quando disponíveis, a geração visual usa essas imagens como referência.

### Refinamentos v16
- Corrige o preenchimento do botão “Visualizar IA” e padroniza “Gerar três novas opções” como ação principal.
- “Gerar outra imagem” agora mostra estado de processamento e erro explícito, e atualiza somente o criativo escolhido.
- Ao escolher um anúncio, a plataforma prepara também masters horizontal e vertical, além do quadrado, para futura adaptação aos posicionamentos de Meta e Google.
- Mantém imagem, texto, título, CTA e destino como recursos separados, preservando a estrutura necessária às integrações reais.
- Corrige novamente o alinhamento da seta de “Criar anúncio”.

## Ajustes v16
- Remove a caixa introdutória redundante “Campanha preparada” do modal de criativos.
- Reforça o clique de “Gerar outra imagem” com delegação de eventos no modal, estado visível de processamento e tratamento de erro.
- Substitui o caractere textual da seta de “Criar anúncio” por uma seta CSS geométrica, alinhada pelo próprio flex do botão.
- Mantém logo como ativo separado da marca para Meta/Google; o preview não força a logo dentro da imagem gerada, evitando distorção de marca pela IA.

### Ajuste de formatos v16
- O criativo escolhido passa a ser o master visual único.
- Horizontal (1,91:1) e vertical (9:16) são derivados deterministicamente da mesma imagem, sem nova geração por IA.
- Os três formatos reutilizam exatamente o mesmo arquivo master; somente a janela de enquadramento muda conforme a proporção, sem nova interpretação pela IA.
- Isso evita mudanças de objetos, cores, composição e identidade entre formatos e também evita custo adicional de geração de imagem para as adaptações.
