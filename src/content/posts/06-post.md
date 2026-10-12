---
title: "Camera bending e arte do glitch"
date: 2026-10-12
order: 6
---

Navegando pelo Reddit recentemente e acabei encontrando a comunidade do r/camerabending e achei a ideia interessante.

A maioria dos filtros e efeitos que vimos até agora são feitos via software. O *camera bending* vai pelo caminho contrário: em vez de alterar a imagem depois que ela já existe na memória, a alteração é feita direto no hardware enquanto a foto está sendo tirada.

## Como funciona?

O conceito vem do *circuit bending*, que é a prática de abrir aparelhos eletrônicos antigos e criar curtos-circuitos propositais na placa pra ver que sons estranhos eles produzem.

Nas câmeras digitais, o alvo costuma ser câmeras baratas ou brinquedos infantis antigos. Dentro delas, existe um sensor de imagem conectado à placa principal por um cabo flat, que transmite os dados de cada pixel pro processador da câmera.

![Placa de circuito sendo modificada com fios soldados para circuit bending](/cv-blog/images/circuit-bending-hardware.jpg)

*Exemplo de circuito eletrônico aberto com pontos de solda adicionais para provocar interferências no sinal. Holotone, CC BY-SA 2.5.*

Quem faz esse tipo de modificação geralmente intercepta os pinos desse cabo flat e solda fios conectados a chaves ou potenciômetros. Quando você gira o botão ou aperta uma chave, causa uma pequena interferência ou curto controlado entre as linhas de dados do sensor.

## Os efeitos visuais

O processador da câmera não sabe que a placa foi modificada; ele só tenta ler os dados que chegam e salvar o arquivo. Como os sinais elétricos chegam corrompidos, o resultado são falhas visuais interessantes:

- Inversão e distorção de cores: se os bits que representam os canais RGB forem trocados ou aterrados, regiões claras viram tons fluorescentes e sombras mudam de cor.
- Rasgos na imagem: se a interferência atingir as linhas de sincronização vertical ou horizontal, a câmera perde o alinhamento das linhas de pixels, fazendo faixas inteiras da foto deslizarem para os lados.
- Padrões geométricos repetidos: quando o processador tenta interpolar os pixels vizinhos a partir de dados corrompidos, acabam surgindo blocos e texturas que parecem uma pintura abstrata.

![Exemplo de imagem com artefatos de glitch e corrupção de dados](/cv-blog/images/camerabending-glitch-sample.jpg)

*Fotografia com artefatos de corrupção digital, mostrando desalinhamento de linhas e saturação extrema de cores. Nesnad, CC0.*

O que achei mais legal nisso é perceber como a imagem digital é frágil no nível físico. Nos acostumamos a pensar em imagens como matrizes matemáticas perfeitas de números de 0 a 255, mas no fundo tudo depende de pulsos elétricos passando por fios microscópicos na hora certa. Quando um único fio falha, o erro se transforma em arte :thumbsup:
