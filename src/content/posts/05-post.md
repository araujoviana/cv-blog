---
title: "Interpolação e o upscaling movido a IA"
date: 2026-09-26
order: 5
---

## Vizinho mais próximo

O método mais simples de todos: pra cada pixel novo, pega o valor do pixel mais próximo na imagem original e copia. Rápido, mas o resultado é serrilhado quando amplia bastante, porque vários pixels novos acabam virando cópia idêntica de um só pixel antigo (dá pra ver os "blocos" se formando).

## Interpolação bilinear

Aqui já dá mais trabalho: em vez de copiar o vizinho mais próximo, pega os 4 vizinhos mais próximos e faz uma média ponderada pela distância. Na prática são duas interpolações lineares (`lerp`) na horizontal seguidas de uma na vertical, entre os quatro pontos que cercam a posição de destino. O resultado é bem mais suave que o vizinho mais próximo, mas ainda meio "borradinho" perto de bordas.

## Bicúbica

Passo além: usa 16 vizinhos (uma vizinhança 4x4) e ajusta um polinômio cúbico em vez de uma reta. Isso preserva bordas e detalhe bem melhor que a bilinear, ao custo de mais processamento. É basicamente o motivo de "bicubic" ser a opção padrão de qualidade em qualquer editor de imagem ou softwares de redimensionamento de vídeo :thumbsup:

![Comparação entre diferentes algoritmos de upscaling aplicados a pixel art: vizinho mais próximo, bilinear, bicúbica e outros métodos especializados lado a lado](/cv-blog/images/interpolation-pixelart-scaling.png)

*Pixel art ampliada com diferentes algoritmos de escala. Note como o vizinho mais próximo preserva os blocos originais enquanto os outros métodos suavizam (às vezes destruindo) o estilo pixelado. Drummyfish / Wikimedia Commons, CC0.*

---

## DLSS: upscaling com IA

Todos os métodos acima têm uma coisa em comum: aplicam uma fórmula fixa, sem saber nada sobre o conteúdo da imagem. Um kernel bicúbico trata a borda de um personagem do mesmo jeito que trata o céu de fundo.

![Imagem ampliada com escala de vizinho mais próximo à esquerda comparada com o algoritmo especializado 2xSaI à direita, que suaviza bordas preservando contornos nítidos](/cv-blog/images/nearest-neighbor-vs-2xsai.png)

*Vizinho mais próximo (esquerda) vs. 2×SaI (direita), um algoritmo de escala especializado. Wikimedia Commons.*

O DLSS (Deep Learning Super Sampling) da Nvidia, usado em jogos, leva essa ideia bem além. A ideia central é: em vez de uma fórmula matemática fixa, um modelo neural treinado aprende a "adivinhar" os pixels que faltam, olhando pra imagem atual em baixa resolução, **os vetores de movimento** da cena (pra onde cada objeto está se mexendo) e os frames anteriores já renderizados. O jogo roda a renderização pesada numa resolução bem menor (o que já economiza bastante GPU) e o modelo reconstrói uma imagem em alta resolução, quadro a quadro, usando essa informação temporal acumulada. Esse acúmulo de frames anteriores é meio parecido, na ideia, com como a equalização de histograma usa toda a distribuição da imagem em vez de olhar só pixel a pixel: ambos usam mais contexto do que a abordagem ingênua consideraria.

O detalhe interessante é que isso quebra a suposição de que upscaling tem que ser "sem perdas" de informação nova: o modelo literalmente inventa detalhe que não existia na imagem original, baseado em padrões que ele viu durante o treinamento. E funciona bem na maior parte do tempo, mas o preço aparece quando a cena tem muito grão, muita transparência (fumaça, partículas, cabelo) ou quando a câmera se move rápido demais: aí dá pra ver ghosting (um rastro fantasma atrás de objetos em movimento), tremulação (grades ou fios finos "chiando" entre frames) ou aquele efeito meio borrado que a comunidade de jogos apelidou de "vaseline effect", em vez de nitidez de verdade :evilcat:

Achei bem irônico que o "estado da arte" de upscaling hoje em dia seja, no fundo, o mesmo problema da aula (estimar valores que não foram amostrados), só que resolvido trocando o kernel fixo por um modelo de IA generativa disfarçado de filtro de imagem.
