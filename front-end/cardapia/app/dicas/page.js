"use client";

import { CardImage } from "../components/cards/cardImage";

export default function DICAS() {
  return (
    <main className="flex items-center gap-[20px] w-full">
      <div className="title">
        <div className="line"></div>
        <h2>DICAS</h2>
        <div className="line"></div>
      </div>

      <CardImage
        image="/dica1.png"
        alt="imagem dica 1"
        text="Como saber se seus vegetais estão bons?"
        href="https://g1.globo.com/economia/agronegocios/noticia/2022/07/26/saiba-como-identificar-verduras-e-frutas-estragadas.ghtml"
      />

      <CardImage
        image="/dica2.png"
        alt="imagem dica 1"
        text="Como escolher frutas e verduras no mercado?"
        href="https://oglobo.globo.com/saude/bem-estar/noticia/2026/03/22/como-escolher-frutas-e-verduras-no-mercado-guia-pratico-ajuda-a-evitar-desperdicios.ghtml"
      />

      <CardImage
        image="/dica3.png"
        alt="imagem dica 1"
        text="Como descartar restos de alimentos da melhor forma?"
        href="https://www.tendaatacado.com.br/dicas/como-descartar-restos-de-comida-dicas-praticas-para-sua-rotina/?srsltid=AfmBOoqMMEKlACa_I29OAYmGxNNbXPN0d9WigR-iJqpTtHfulDN7_NtE"
      />

      <CardImage
        image="/dica4.png"
        alt="imagem dica 1"
        text="Como conservar seus alimentos para que durem mais?"
        href="https://www.deliway.com.br/blog/conservar-alimentos"
      />
    </main>
  );
}
