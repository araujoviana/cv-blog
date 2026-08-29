---
title: "Transformações de Intensidade"
date: 2026-08-29
order: 4
tags: ["Aula 3"]
---

## Sobre realce de contraste

Usar diferentes níveis de contraste e saturação pra extrair detalhes é uma das técnicas mais absurdas (aparentemente) que existem. A intuição diz que uma imagem é exatamente aquilo que está sendo mostrado, então mexer nela e conseguir mais informação do que antes é algo que me pega.
Isso me lembrou de 2014-2015, quando o jogo de terror FNAF ficou muito famoso. O criador costumava colocar teasers dos próximos jogos no site dele, mas também escondia segredos nas imagens que só apareciam depois de alguma alteração, tipo aumentar o contraste. Ver essa mesma ideia sendo usada de propósito, e decifrada por crianças, foi legal.

## CRTs

Depois de pesquisar mais sobre o gráfico das funções básicas de transformação de intensidade, descobri que as TVs CRT tinham um gamma que vinha da própria física do tubo.

A voltagem no canhão de elétrons não virava luz de forma linear no fósforo, seguia uma curva de "n-ésima potência" que escurecia os tons claros. Pra compensar, o sinal já saía da câmera pré-corrigido com o gamma inverso (a curva de "n-ésima raiz", que expande sombra e comprime claro), aplicado antes da transmissão. Aí a não-linearidade do tubo cancelava essa pré-correção na hora de converter voltagem em luz, e a resposta final acabava linear :smiley:.

---

![A mesma foto subaquática processada com cinco valores de gamma diferentes](/cv-blog/images/gamma-correction-demo.jpg)

*A mesma imagem com gamma 2, 1, 1/2, 1/3 e 1/4. X-romix, Rubybrian / Wikimedia Commons, CC BY-SA 3.0.*
