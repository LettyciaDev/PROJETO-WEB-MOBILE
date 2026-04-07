"use client";

import { CardImage } from "../components/cards/cardImage";
import styles from "./dicas.module.css";

const TIPS = [
  {
    image: "/dica1.png",
    alt: "vegetais frescos",
    text: "Como saber se seus vegetais estão bons?",
    href: "https://g1.globo.com/economia/agronegocios/noticia/2022/07/26/saiba-como-identificar-verduras-e-frutas-estragadas.ghtml",
  },
  {
    image: "/dica2.png",
    alt: "frutas no mercado",
    text: "Como escolher frutas e verduras no mercado?",
    href: "https://oglobo.globo.com/saude/bem-estar/noticia/2026/03/22/como-escolher-frutas-e-verduras-no-mercado-guia-pratico-ajuda-a-evitar-desperdicios.ghtml",
  },
  {
    image: "/dica3.png",
    alt: "descarte de alimentos",
    text: "Como descartar restos de alimentos da melhor forma?",
    href: "https://www.tendaatacado.com.br/dicas/como-descartar-restos-de-comida-dicas-praticas-para-sua-rotina/",
  },
  {
    image: "/dica4.png",
    alt: "conservar alimentos",
    text: "Como conservar seus alimentos para que durem mais?",
    href: "https://www.deliway.com.br/blog/conservar-alimentos",
  },
];

export default function Dicas() {
  return (
    <div className="container">
      <header style={{ padding: 20 }}>
        <div>
          <h1 
            style={{
              fontSize: "clamp(1.6rem, 5vw, 2.2rem)",
              fontWeight: 600,
              color: '#1b5e20',
              marginBottom: 6,
            }}
          >
            Dicas 
          </h1>
          <p style={{ color: "#1b5e20", fontSize: 14 }}>
            Conteúdo curado sobre alimentação saudável
          </p>
        </div>
      </header>

      <main className="main" style={{ paddingTop: 28 }}>
        <p className="section-label">Artigos selecionados</p>
        
        <div className={styles.grid}>
          {TIPS.map((tip) => (
            <CardImage 
              key={tip.href} 
              image={tip.image}
              alt={tip.alt}
              text={tip.text}
              href={tip.href}
            />
          ))}
        </div>
      </main>
    </div>
  );
}