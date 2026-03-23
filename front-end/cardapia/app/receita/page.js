"use client"

import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/navbar";
import Intro from "../components/intro";
import { useState } from "react";

export default function Home() {
  const [receita, setReceita] = useState(null);

  return (
    <div className="container">
      <Intro />

      <div className="main">

        <div className="navbar-desk">
          <ul>
            <li className="menu">
              <a href="/principal" className="main-box">
                MENU
              </a>
            </li>
            <li>
              <a href="/refeicoes/cafe" className="main-box">
                DICAS
              </a>
            </li>
          </ul>
        </div>
        <div className="lista_div">
            <h1 className="h1unic">
              {receita?.titulo || "Carregando receita ..."}
            </h1>
            <h1>Ingredientes</h1>
            <ul className="lista">
              {receita?.ingredientes.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <h1>Modo de preparo</h1>
            <ul className="lista">
              {receita?.modoPreparo.map((passo, index) => (
                <li key={index}>{passo}</li>
              ))}
            </ul>
        </div>
      </div>

      <Navbar />
    </div>
  );
}
