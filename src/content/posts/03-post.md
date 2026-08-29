---
title: "Fundamentos da imagem digital 02"
date: 2026-08-29
order: 3
tags: ["Aula 2"]
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

---
