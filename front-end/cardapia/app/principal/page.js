"use client";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/navbar";
import Intro from "../components/intro";
import styles from "../principal/principal.module.css"
export default function Home() {
  return (
    <div className="container">
      <Intro />

      <div className="main">
        <div className="title">
          <div className="line"></div>
          <h2>HOME</h2>
          <div className="line"></div>
        </div>

        <div className={styles["navbar-desk"]}>
          <ul>
            <li className={styles["menu"]}>
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

      <div className={styles["navbar"]}>
          <div className={styles["navbar-container"]}>
                  <Image src="/home.png" alt="home" width={40} height={40}/>
                  <p>MENU</p>              
          </div>
          <div  className={styles["navbar-container"]}>
                  <Image src="/tip.png" alt="tip" width={40} height={40}/>
                  <p>DICAS</p>
          </div>
      </div>            
    </div>
  );
}