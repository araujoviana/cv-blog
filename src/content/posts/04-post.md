---
title: "Transformações práticas no Colab"
date: 2026-09-13
order: 4
---

Suponho que todos os outros colegas fizeram textos explicando a teoria de cada tipo de transformação, então hoje farei algumas demonstrações práticas das principais técnicas de transformação que podem ser feitas em uma imagem, com algumas observações.

Todas as demos foram feitas no Google Colab rodando em uma GPU T4, agora que eu tenho o plano Pro do Google eu tenho que usar senão não compensa... :snail:

---

## Imagem original

![Imagem original usada em todas as demonstrações: uma pilha de patinhos de borracha amarelos](/cv-blog/images/duck1.png)

Imagem sem alterações :ice:

## Blur

Basicamente, cada pixel vira a média dos pixels ao redor dele, dentro de uma janela (kernel) de tamanho fixo. Quanto maior o kernel (ou mais vezes ele é aplicado), mais borrada a imagem fica.

Aqui segue um exemplo de box blur aplicado 100x em uma imagem, porque 1 vez fica quase imperceptível pra uma imagem desse tamanho

![Imagem borrada com box blur 3x3 aplicado 100 vezes na GPU](/cv-blog/images/duck2.png)

## Detecção de bordas

Esse aqui ficou mais assustador, ele usa o operador de Sobel pra detectar as bordas na imagem. O Sobel aplica dois kernels, um pra variação horizontal e outro pra vertical, que juntos aproximam o gradiente da imagem: onde a intensidade muda bruscamente (uma borda) o gradiente fica alto, onde é uniforme fica baixo. O resultado acaba sendo só as bordas destacadas sobre um fundo preto.

![Bordas detectadas na imagem original usando o operador de Sobel](/cv-blog/images/duck3.png)

## Sharpening

Essa eu apliquei via unsharp masking: pega a diferença entre a imagem original e uma versão borrada dela (que é justamente onde as bordas estão) e soma essa diferença de volta na imagem original, multiplicada por um fator de intensidade. Com intensidade 10 o efeito fica exagerado de propósito, só pra ficar bem visível.

![Imagem com sharpening aplicado, intensidade 10](/cv-blog/images/duck4.png)

## Alargamento de Contraste

Essa técnica define dois pontos de controle, (r1, s1) e (r2, s2), e monta uma função linear por partes que expande o intervalo de intensidades entre eles. Aqui usei r1=70, s1=20 e r2=180, s2=240: tons abaixo de 70 ficam ainda mais escuros, acima de 180 ficam ainda mais claros, e a faixa do meio (onde mora a maior parte do detalhe) se espalha por quase toda a escala de cinza.

![Imagem em tons de cinza original ao lado da mesma imagem após o alargamento de contraste](/cv-blog/images/duck5.png)

Aqui segue a curva de alargamento plotada da imagem acima no matplotlib

![Curva de alargamento de contraste, mostrando a função de transformação s = T(r) com os pontos de controle marcados](/cv-blog/images/duckplot.png)

Esse tipo de transformação pode ser muito útil pra realçar detalhes em imagens com pouco contraste, tipo radiografias, fotos subexpostas ou imagens de satélite, onde a informação relevante fica espremida numa faixa estreita de tons.

## Equalização de Histograma

Diferente do alargamento de contraste, aqui eu não escolho pontos de controle na mão: o histograma da imagem original é redistribuído automaticamente usando a função cumulativa de distribuição (CDF) das intensidades. Isso empurra os valores mais concentrados (a "corcova" no meio do histograma original) pra ocupar toda a faixa de 0 a 255, o que tende a realçar detalhes em regiões que antes estavam meio espremidas.

![Imagem original em tons de cinza ao lado do seu histograma normalizado](/cv-blog/images/duck6.png)

![Imagem após a equalização de histograma ao lado do histograma equalizado e da função de transformação (CDF) usada](/cv-blog/images/duck7.png)

Dá pra ver que o histograma equalizado fica bem mais espalhado que o original, e a imagem ganha mais contraste sem eu precisar escolher nenhum parâmetro na mão, ao contrário do alargamento.
