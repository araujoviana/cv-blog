---
title: "Fundamentos da imagem digital 02"
date: 2026-08-29
order: 3
tags: ["Aula 2", "Aula 3"]
---

## Filtros em BMPs

O conteúdo dessa aula me agregou bastante. Eu já tinha estudado antes como as imagens são representadas internamente (bitmaps, pelo menos), mas entender como os filtros e efeitos são calculados é outra coisa, e achei bem interessante.

Em 2023 eu fiz um exercício do CS50x, curso de introdução à computação de Harvard, que ensinava manipulação de imagens em C: https://cs50.harvard.edu/x/2023/psets/4/filter/more/
A proposta era aplicar os efeitos de grayscale, reflection, blur e edges (os dois últimos eram de longe os mais difíceis :evilcat:). No fim eu consegui fazer, ainda na época em que a IA não tinha decolado de verdade...

## Quantização

Esse termo era familiar pra mim pela área de IA, até eu perceber que faz sentido: tanto processamento de imagens quanto LLMs trabalham com matrizes (ou tensores, no caso) e são tarefas otimizadas pra rodar em GPU.
A diferença principal parece ser o que exatamente é quantizado. Na imagem, é a quantidade de bits (de 8 pra 4 bits, por exemplo). Numa LLM, dá pra quantizar os parâmetros do modelo: pesos que normalmente vivem em float32 (FP32) são reduzidos pra int8, o que corta o consumo de memória, mas o modelo perde qualidade de saída em tarefas de reasoning. Achei o paralelo bem interessante.

![Imagem reduzida a uma paleta de 16 cores, com a paleta mostrada ao lado](/cv-blog/images/quantization-16color-palette.png)

*Quantização de cor: a mesma imagem restrita a 16 cores. Dcoetzee / Wikimedia Commons, CC BY-SA 3.0.*

## Uso de Grayscale

Um dos usos mais comuns de grayscale que eu via era justamente em computação visual (tipo a do OpenCV): classificação de objetos, feature matching e, principalmente, OCR. Reduzir a imagem a grayscale exige bem menos processamento, porque a gente diminui a dimensionalidade sem perder a informação que costuma importar, 1 canal < 3 canais :thumbsup:
Mas nem sempre a técnica serve, como em diagnósticos médicos ou segmentação de tons de pele, onde a cor é parte da informação.

## RGBA

Uma parte que eu não vi mencionada na aula, pelo que me lembro, é o uso de um quarto valor no pixel: o Alpha, que é a transparência. Ele aumenta o tamanho total da imagem, mas é muito útil, e aparece em PNGs (e em outros formatos pensados pra HD, tipo HEIC). Pra edição de imagem, faz bastante diferença.

## Sobre realce de contraste

Ainda no assunto de mexer nos valores dos pixels: usar diferentes níveis de contraste e saturação pra extrair detalhes é uma das técnicas mais absurdas (aparentemente) que existem. A intuição diz que uma imagem é exatamente aquilo que está sendo mostrado, então mexer nela e conseguir mais informação do que antes é algo que me pega.
Isso me lembrou de 2014-2015, quando o jogo de terror FNAF ficou muito famoso. O criador costumava colocar teasers dos próximos jogos no site dele, mas também escondia segredos nas imagens que só apareciam depois de alguma alteração, tipo aumentar o contraste. Ver essa mesma ideia sendo usada de propósito, e decifrada por crianças, foi legal.

## CRTs

Depois de pesquisar mais sobre o gráfico das funções básicas de transformação de intensidade, descobri que as TVs CRT tinham um gamma que vinha da própria física do tubo.

A voltagem no canhão de elétrons não virava luz de forma linear no fósforo, seguia uma curva de "n-ésima potência" que escurecia os tons claros. Pra compensar, o sinal já saía da câmera pré-corrigido com o gamma inverso (a curva de "n-ésima raiz", que expande sombra e comprime claro), aplicado antes da transmissão. Aí a não-linearidade do tubo cancelava essa pré-correção na hora de converter voltagem em luz, e a resposta final acabava linear :smiley:.

---

![A mesma foto subaquática processada com cinco valores de gamma diferentes](/cv-blog/images/gamma-correction-demo.jpg)

*A mesma imagem com gamma 2, 1, 1/2, 1/3 e 1/4. X-romix, Rubybrian / Wikimedia Commons, CC BY-SA 3.0.*
