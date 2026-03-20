import Image from "next/image";
import Link from "next/link";
import styles from "./receita.module.css";
import Navbar from "../components/navbar";
import Intro from "../components/intro";
export default function Home() {
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
            <ul className="lista">
                <h1>ingredientes</h1>
                <li>macarrão</li>
                <li>uma panela cheia de agua</li>
                <li> carne moida</li>
                <li>molho de tomate</li>
                <li>sal</li>
                <li>tempero a gosto</li>
                <li> oleo</li>
            
                <h1> modo de preparo</h1>
            
                <li>deixar a agua ferver</li>
                <li> colocar sal na agua</li>
                <li>colocar o macarrão na agua e mecher para não grudar</li>
                <li>temperar a carne</li>
                <li>passar oleo em uma panela</li>
                <li>assar a carne e misturar com molho de tomate</li>
                <li>retirar o macarrão do fogo ainda Al dente</li>
                <li>misturar o macarrão com a carne moida</li>
                <h1>FIM</h1>
            </ul>

        </div>
      </div>

      <Navbar />
    </div>
  );
}
