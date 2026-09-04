# Imagens do site — o que falta

Nenhuma foto real foi colocada aqui ainda. Enquanto o arquivo não existir,
o site mostra um retângulo em `--paper-deep` com o nome do arquivo escrito
no centro — o layout não quebra e não há salto de altura, porque cada
imagem já tem `width` e `height` no HTML.

**Como usar:** salve o arquivo com exatamente o nome da tabela, nesta pasta.
Não precisa mexer no código.

## Formato
- Todas em **WebP** (exceto `og-image.jpg`).
- Preto e branco não é necessário no arquivo: o CSS já aplica
  `grayscale(1) contrast(1.04)` em todas as fotos.
- Não usar foto de banco de imagens nem imagem das referências.

## Lista

| Arquivo | Uso | Dimensão sugerida |
|---|---|---|
| `hero-eloize.webp` | retrato da Eloize, vertical (aparece em arco no topo) | 1200×1600 |
| `sobre-estudio.webp` | ambiente do estúdio | 1000×1250 |
| `estilo-fineline.webp` | exemplo de fine line | 800×1100 |
| `estilo-floral.webp` | exemplo de floral | 800×1100 |
| `estilo-autoral.webp` | exemplo de arte autoral | 800×1100 |
| `galeria-01.webp` … `galeria-12.webp` | portfólio (12 fotos) | mínimo 1000px no lado maior |
| `arte-01.webp` … `arte-08.webp` | desenhos disponíveis, fundo claro | 900×900 |
| `cta-estudio.webp` | fachada ou detalhe do espaço, vertical | 1000×1400 |
| `hero-fundo.mp4` | ✅ **já feito** — vídeo de fundo da seção do hero | 592×1206 |
| `hero-fundo.webp` | ✅ **já feito** — poster do vídeo, tirado dele mesmo | 592×1206 |
| `og-image.jpg` | imagem de compartilhamento (WhatsApp, Instagram) | 1200×630 |
| `favicon.svg` | ✅ já feito (monograma EB) | — |

## Categorias da galeria

Cada foto do portfólio tem uma categoria no HTML (`data-cat`), que alimenta
os filtros. A distribuição atual é:

| Arquivo | Categoria |
|---|---|
| galeria-01, 04, 08, 12 | `florais` |
| galeria-02, 06, 10 | `fineline` |
| galeria-03, 07, 11 | `autorais` |
| galeria-05, 09 | `cicatrizadas` |

Se a foto que você tiver for de outra categoria, é só trocar o `data-cat`
no `index.html`. O texto do `alt` também precisa ser reescrito para
descrever a tatuagem de verdade (desenho + local do corpo).


---

## Vídeo de fundo do hero — `hero-fundo.mp4` ✅ pronto

O hero tem duas camadas de imagem, e elas são coisas diferentes:

- **Fundo da seção inteira:** o vídeo do decalque (`hero-fundo.mp4`),
  em preto e branco, sob um véu escuro que segura a leitura do título.
- **Arco por cima:** o **retrato da Eloize** (`hero-eloize.webp`), que
  ainda não chegou — hoje aparece o placeholder.

O vídeo veio de um `.mov` de 8,3 MB gravado no iPhone (HEVC, 6,1 s, 60 fps,
com áudio) e foi convertido aqui para:

| | |
|---|---|
| **Codec** | H.264 Main, `yuv420p` — toca em todo navegador |
| **Tamanho** | **717 KB** (era 8,3 MB) |
| **Resolução** | 592×1206 (cortadas 74 px de barra preta no rodapé) |
| **Taxa** | 30 fps, sem áudio |
| **Extra** | `faststart` — começa a tocar antes de baixar o arquivo inteiro |

O `hero-fundo.webp` é um frame desse mesmo vídeo, usado como poster (o que
aparece antes de o vídeo carregar) e como fallback se o vídeo não tocar.

**Sobre o contraste:** o véu sobre o vídeo e o tom do texto de apoio no hero
foram medidos, não chutados. O `--muted` normal dava 2,4:1 sobre o frame
mais claro do vídeo — reprovado. Dentro do hero ele vira `#C4C0BA`, que dá
6,3:1. Se você trocar o vídeo por um mais claro, vale remedir.

**Para trocar o vídeo depois:** é só substituir `hero-fundo.mp4` e
`hero-fundo.webp`. Se o vídeo não existir, fica o poster; se ele também não
existir, fica o fundo escuro liso. Nada quebra.

O vídeo toca mudo, em loop, só enquanto está visível na tela, e fica parado
para quem usa "reduzir movimento" no sistema.

### Como exportar, se for trocar

| | |
|---|---|
| **Codec** | **H.264** (não HEVC/H.265) |
| **Container** | **`.mp4`** (não `.mov`) |
| **Duração** | 4 a 8 segundos |
| **Tamanho** | até 3–5 MB |
| **Resolução** | 720×960 vertical basta — o arco é pequeno na tela |
| **Áudio** | remover (o site toca mudo) |

**Por que não pode ser o `.mov` do iPhone:** o iPhone grava em HEVC dentro de
um `.mov`. Esse formato só toca no Safari — no Chrome, no Firefox e na maioria
dos Android o vídeo simplesmente não aparece. Precisa ser H.264 em `.mp4`.

**Como converter, sem instalar nada:** no iPhone, em *Ajustes › Câmera ›
Formatos*, escolher **"Mais Compatível"** faz a câmera gravar direto em H.264.
Para um vídeo já gravado, o caminho mais simples é passar por um editor
(CapCut, InShot, o próprio app Fotos) e exportar em 720p — a exportação já
converte para H.264/MP4.

### Se preferir mandar o arquivo pesado mesmo

Dá para servir dois formatos (um `.mp4` para todo mundo e o `.mov` original
só para o Safari), mas isso não resolve o peso: 25 MB no hero derruba o
carregamento no 4G, que é como a maioria das clientes vai abrir o site.
Melhor exportar leve.


---

## Rabiscos de marcador — `rabisco-NN.png`

As marcas à mão do site (elipse, seta, rasura, estrelas) saíram da folha de
rabiscos que você mandou. Cada forma foi recortada individualmente da imagem
e isolada do vizinho, e entra no site como **máscara CSS**, não como imagem:

```css
.rab{ background: currentColor;
      mask: var(--rab) center/contain no-repeat; }
```

Por isso o rabisco é pintado com a cor da seção — taupe sobre o fundo escuro,
tinta sobre o claro — em vez de ser um PNG preto colado por cima.

### Onde cada um está

| Arquivo | Onde | Por quê |
|---|---|---|
| `rabisco-18` (elipse) | em volta de "só seu", no Sobre | marca a ideia central do texto |
| `rabisco-18` (elipse) | em volta do "1" nos números | destaca "1 atendimento por vez" |
| `rabisco-20` (seta) | entre a etapa 03 e a 04 | mostra a sequência |
| `rabisco-10` (rasura) | sob "Chamar no WhatsApp" | sublinha o botão principal |
| `rabisco-10` (rasura) | sobre "Arte 07" e "Arte 08" | riscado = já reservada |
| `rabisco-13` (ziguezague) | sob "Trabalhos" | sublinha o título da galeria |
| `rabisco-17` (estrela) | separadores da faixa rolante | substitui o asterisco tipográfico |
| `rabisco-09` (estrela riscada) | ao lado de "flash" | acento na seção de artes |
| `rabisco-27` (rabisco solto) | junto do @ no rodapé | assinatura |

**Ficaram de fora 15 formas** da folha original (bolas emaranhadas, blocos
preenchidos, setas grossas). Estão guardadas e é rápido trocar qualquer uma:
o arquivo entra em `assets/img/` e a classe `.rab-NN` no CSS aponta para ele.

**Licença:** a folha de origem trazia marca de "free_font" e um QR code, o que
indica que veio de um pacote de assets. Vale conferir os termos de uso antes
de publicar comercialmente.


---

## Stickers — `olho-*.png`, `onda-1.png`, `brilho-1.png`

Colados por cima do site, com giro e tamanho próprios: 4 olhos em meio-tom,
uma onda marmorizada e um trio de brilhos. Saíram das três imagens que você
subiu em `assets/img/originais/`, recortados com o fundo branco removido por
preenchimento a partir da borda (não por "clarear o que é claro" — senão o
creme do globo do olho sumia junto).

Cada um foi isolado do vizinho antes do recorte, e quantizado: **777 KB de
recorte bruto viraram 121 KB**.

Diferente dos rabiscos, estes **não** são máscara CSS: a textura de meio-tom
e o creme do globo são o desenho. Pintar de uma cor só destruiria a peça.

### Onde estão

| Sticker | Seção | Tamanho no desktop |
|---|---|---|
| `brilho-1` | hero, à esquerda sobre o vídeo | 132 px |
| `olho-1` | Sobre, embaixo à esquerda | 244 px |
| `olho-3` | Estilos, no vão da diagonal | 208 px |
| `brilho-1` | Galeria, perto dos filtros | 108 px |
| `onda-1` | Artes, saindo pela direita | 172 px |
| `onda-1` | Depoimentos, margem esquerda | 232 px |
| `olho-2` | FAQ, no vazio à direita | 268 px |
| `olho-4` | CTA, embaixo à esquerda | 226 px |

No celular três somem (hero, galeria e artes) e os outros encolhem: coluna
estreita com sticker grande vira sujeira em cima do conteúdo.

### As três regras que eles obedecem

1. **`pointer-events: none`** — nunca roubam clique de botão ou link.
2. **`z-index: 0`, com o conteúdo em `z-index: 1`** — ficam acima do fundo da
   seção e abaixo do texto. Não cobrem palavra nenhuma.
3. **A seção recorta no próprio limite** (`overflow: hidden`) — sticker girado
   passa da borda e, sem isso, empurra a largura do documento e cria scroll
   lateral. Recortado, ainda parece sair pela beirada.

Verificado em 1440, 768 e 360 px: nenhum captura clique, nenhum bloqueia
botão, nenhum fica acima do texto, e a largura do documento bate exatamente
com a da tela nos três.

**Para trocar:** suba a imagem nova em `assets/img/originais/` pelo GitHub e
me avise — é assim que estas chegaram, já que o anexo pelo chat não estava
funcionando nesta sessão.


---

## Selos e faixa — `lirio.png`, `boca.png`, `flores.png`, `liquido.jpg`

Segunda leva de arte, somada aos stickers (não substitui nenhum).

| Arquivo | Onde | Tipo |
|---|---|---|
| `lirio.png` | Estilos, junto do bloco "Florais" | máscara, 300 px |
| `boca.png` | Como funciona, margem direita | máscara, 254 px |
| `flores.png` | Segurança e cuidados, margem esquerda | máscara, 236 px |
| `liquido.jpg` | faixa cheia entre o FAQ e o CTA | imagem de fundo |

**Por que máscara e não imagem:** as três primeiras são preto puro sobre
branco, então funcionam como os rabiscos — pintadas com `currentColor` e
acompanhando a cor da seção. A textura líquida não: ela é foto de borda a
borda, sem contorno para recortar, e virou faixa de transição do claro de
volta ao escuro do CTA. Foi girada 90° para ficar horizontal.

**Peso:** as máscaras foram reduzidas para 440 px de largura e o canal alfa
posterizado em 4 níveis. Como a arte é meio-tom (quase binária), isso não
muda a aparência e derruba muito o arquivo: **83 KB viraram 14 KB por peça**.
As quatro somam 112 KB.

Elas passam por trás do texto, não por cima — o texto continua legível
mesmo onde a arte cruza a coluna.


---

## Fotos da galeria — as 5 primeiras

Chegaram cinco fotos reais de trabalhos da Eloize, convertidas de JPEG de
3024×4032 para WebP de 900×1200 (288 KB no total). Elas ficam nos topos das
três colunas do masonry, então a primeira coisa que se vê na galeria é
trabalho de verdade, não placeholder.

| Vaga | Foto | Categoria |
|---|---|---|
| `galeria-01` | lírios no ombro e braço | florais |
| `galeria-02` | ramo de folhas fine line, com peônia e libélula | fine line |
| `galeria-05` | peônias e borboletas no ombro | florais |
| `galeria-06` | flores miúdas e peônias na clavícula | florais |
| `galeria-09` | libélula sobre a palavra "Hope" | autorais |

Cada uma tem `alt` descrevendo o desenho e o local do corpo, como o
briefing pede.

**Os JPEG originais não foram versionados** — são ~3 MB cada e ficariam no
histórico do Git para sempre. Se precisar deles de novo, peça à cliente.

**Ainda não há nenhuma foto de "cicatrizadas".** Duas vagas estão marcadas
com essa categoria esperando foto de trabalho já curado — não dá para usar
foto de tatuagem recém-feita ali, seria informação errada para quem filtra.
