"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./principal.module.css";
import Navbar from "../components/navbar";
import Intro from "../components/intro";

export default function Home() {
  return (
    <div className={styles.container}>
      <Intro />

      <div className={styles.main}>
        <div className={styles.title}>
          <div className={styles.line}></div>
          <h2>HOME</h2>
          <div className={styles.line}></div>
        </div>

        <div className={styles["navbar-desk"]}>
          <ul>
            <li className={styles.menu}>
              <Link href="/principal" className={styles["main-box"]}>
                MENU
              </Link>
            </li>
            <li>
              <Link href="/dicas" className={styles["main-box"]}>
                DICAS
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles["main-container"]}>
          <Link href="/refeicoes/lanche" className={styles["main-box"]}>
            <Image src="/lanche.png" alt="lanche" width={90} height={90} />
            <div className={styles["box-text"]}>
              <h1>LANCHES</h1>
              <p>ver receitas</p>
            </div>
            <Image src="/setadir.png" alt="seta direita" width={30} height={30} />
          </Link>

          <Link href="/refeicoes/cafe" className={styles["main-box"]}>
            <Image src="/cafe.png" alt="cafe da manhã" width={90} height={90} />
            <div className={styles["box-text"]}>
              <h1>Café da manhã</h1>
              <p>ver receitas</p>
            </div>
            <Image src="/setadir.png" alt="seta direita" width={30} height={30} />
          </Link>

          <Link href="/refeicoes/almoco" className={styles["main-box"]}>
            <Image src="/almoco.png" alt="almoço" width={90} height={90} />
            <div className={styles["box-text"]}>
              <h1>Almoço</h1>
              <p>ver receitas</p>
            </div>
            <Image src="/setadir.png" alt="seta direita" width={30} height={30} />
          </Link>

          <Link href="/refeicoes/janta" className={styles["main-box"]}>
            <Image src="/janta.png" alt="janta" width={90} height={90} />
            <div className={styles["box-text"]}>
              <h1>Janta</h1>
              <p>ver receitas</p>
            </div>
            <Image src="/setadir.png" alt="seta direita" width={30} height={30} />
          </Link>
        </div>
      </div>

      <Navbar />
    </div>
  );
}