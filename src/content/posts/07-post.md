---
title: "MRI e o k-space: quando a imagem é uma transformada"
date: 2026-10-26
order: 7
---

Eu sempre imaginei que um aparelho de ressonância magnética (MRI) funcionasse mais ou menos como uma câmera: você deita no tubo, ele "tira uma foto" com algum tipo de raio X e sai dali uma fatia de uma imagem pronta. Fiquei meio chocado quando descobri que internamente, ele não mede a intensidade de pixel nenhum. O que ele mede é frequência :skull:

## O que o aparelho realmente grava

Quando os dados crus de um MRI saem do aparelho eles vivem num domínio chamado **k-space**, que é só o espaço das frequências espaciais da imagem, que é o mesmo domínio da FFT que vimos na aula. Em vez de responder "quanta luz tem neste pixel", cada medida do aparelho responde "quanta dessa frequência espacial existe naquele objeto".

O truque físico é mais ou menos assim: os núcleos de hidrogênio do corpo se alinham com um campo magnético forte e, quando excitados por um pulso de radiofrequência, devolvem sinal numa frequência que depende do campo em volta deles (ressonância de Larmor). As bobinas de gradiente fazem esse campo variar um pouco ao longo do espaço, então cada posição do corpo passa a "falar" numa frequência ligeiramente diferente. O sinal que a antena capta é a soma de todas essas oscilações. E somar ondas de frequências diferentes é exatamente montar uma transformada de Fourier.

A imagem só aparece depois: o computador pega esses dados de k-space e aplica a transformada inversa pra reconstruir a foto que a gente vê.

## O que é o k-space

Cada ponto do k-space corresponde a uma única onda plana que atravessa a imagem inteira numa certa direção e frequência. O centro guarda as baixas frequências (contraste, brilho geral, o formato das coisas) e as bordas guardam as altas (arestas, texturas, detalhe fino). Dá pra ver isso aplicando a FFT numa foto que eu usei em um post anterior:

![Fotografia de patinhos de borracha ao lado do espectro de magnitude da sua FFT, com a energia concentrada no centro](/cv-blog/images/mri-kspace-duck.png)

*Imagem no domínio espacial (esquerda) e o mesmo conteúdo no domínio das frequências / k-space (direita). O brilho no centro são as baixas frequências; as bordas que parecem ruído são o detalhe fino.*

## Por que isso é legal

Como a transformada é reversível, dá pra brincar de jogar frequência fora. Se eu preencher só a região central do k-space, ou seja as baixas frequências, eu recupero uma imagem borrada, mas ainda reconhecível. Conforme vou adicionando as bordas, o detalhe volta:

![Montagem da reconstrução progressiva a partir de porcentagens cada vez maiores do k-space, do topo esquerdo bem borrado até o canto inferior direito nítido](/cv-blog/images/mri-kspace-progressive.png)

*Reconstrução usando só o centro do k-space e depois progressivamente adicionando as bordas. Truncar o k-space é literalmente aplicar um filtro passa-baixa, o mesmo efeito do box blur que usei no Colab anteriormente.*

E é disso que o MRI se aproveita pra ser mais rápido. Em vez de amostrar o k-space inteiro ponto por ponto (cada ponto é uma aquisição, então o exame demora minutos), os aparelhos medem menos pontos: técnicas tipo *partial Fourier* e *compressed sensing*, e mais recentemente reconstrução com IA, que "adivinha" as frequências que faltaram.

O preço disso aparece quando o paciente se mexe: a transformada assume que nada muda entre as medidas, então qualquer movimento mistura as frequências e o resultado são aqueles fantasmas e borrões dos exames :catstare:
