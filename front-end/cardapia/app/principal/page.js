"use client";

import Image from "next/image";
import Link from "next/link";
import Intro from "../components/intro";
import styles from "../principal/principal.module.css";

// Configuração das categorias de refeição
const MEALS = [
  { href: "/refeicoes/cafe",   src: "/cafe.png",   alt: "café da manhã", label: "Café da manhã", accent: true  },
  { href: "/refeicoes/lanche", src: "/lanche.png", alt: "lanches",       label: "Lanches",       accent: false },
  { href: "/refeicoes/almoco", src: "/almoco.png", alt: "almoço",        label: "Almoço",        accent: false },
  { href: "/refeicoes/janta",  src: "/janta.png",  alt: "janta",         label: "Janta",         accent: true  },
];

export default function Home() {
  return (
    <div className="container">
      {/* Componente de Introdução do Usuário */}
      <Intro />

      <main className="main">
        {/* Navegação Superior (Desktop) */}
        <nav className={styles.navbarDesk}>
          <ul>
            <li>
              <Link href="/principal">Menu</Link>
            </li>
            <li>
              <Link href="/dicas">Dicas</Link>
            </li>
          </ul>
        </nav>

        {/* Rótulo da Seção */}
        <p className="section-label">Refeições</p>

        {/* Grid de Cards de Refeições */}
        <div className={styles.mainContainer}>
          {MEALS.map((meal) => (
            <Link
              key={meal.href}
              href={meal.href}
              className={styles.mainBox}
              style={meal.accent ? { background: "var(--surface-muted, #eef6ee)" } : null}
            >
              <Image 
                src={meal.src} 
                alt={meal.alt} 
                width={52} 
                height={52} 
              />
              
              <div className={styles.boxText}>
                <h2>{meal.label}</h2>
                <p>ver receitas</p>
              </div>

              <div className={styles.arrowCircle}>→</div>
            </Link>
          ))}
        </div>

        {/* Atalho para Dicas de Nutrição */}
        <Link href="/dicas" className={styles.tipsBanner}>
          <span style={{ fontSize: 28 }}>💡</span>
          <div className={styles.tipsText}>
            <h3>Dicas de nutrição</h3>
            <p>Conteúdo curado para você</p>
          </div>
          <span style={{ color: "#7cb342", fontSize: 18 }}>→</span>
        </Link>
      </main>

      {/* Navegação Inferior (Mobile Fixa) */}
      <nav className={styles.navbar}>
        <div className={styles.navbarContainer}>
          <Link href="/principal">
            <Image src="/home.png" alt="home" width={24} height={24} />
            <span>Menu</span>
          </Link>
        </div>
        
        <div className={styles.navbarContainer}>
          <Link href="/dicas">
            <Image src="/tip.png" alt="dicas" width={24} height={24} />
            <span>Dicas</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}