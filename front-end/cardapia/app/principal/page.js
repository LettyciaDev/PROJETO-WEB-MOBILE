import Image from "next/image";
import Link from "next/link";
import styles from "./principal.comite.css"
import Navbar  from "../components/navbar";
import Intro  from "../components/intro"
export default function Home(){
    return (
        <div className="container">

                <Intro/>

                <div className="main">
                    <div className="title">
                            <div className="line"></div>
                            <h2>HOME</h2>
                            <div className="line"></div>
                    </div>
                    <div className="navbar-desk">
                        <ul>
                            <li className="menu">
                                <a href="/principal" className="main-box">MENU</a>
                            </li>
                            <li>
                                <a href="/refeicoes/cafe" className="main-box">DICAS</a>
                            </li>
                        </ul>

                    </div>            
                    <div className="main-container">
                        <a href="/refeicoes/lanche" className="main-box">
                                 <Image src="/lanche.png" alt="lanche" width={90} height={90}/>
                                 <div className="box-text">
                                     <h1>LANCHES</h1>
                                    <p>ver receitas</p>
                                 </div>
                                 <Image src="/setadir.png" alt="seta direita" width={30} height={30}/>       
                        </a>
                        <a href="/refeicoes/cafe" className="main-box">
                            <Image src="/cafe.png" alt="cafe da manhã" width={90} height={90}/>
                            <div className="box-text">
                                <h1>Café da manhã</h1>
                                <p>ver receitas</p>
                            </div>
                            <Image src="/setadir.png" alt="seta direita" width={30} height={30}/>
                        </a>
                        <a href="/refeicoes/almoco" className="main-box">
                           <Image src="/almoco.png" alt="almoço" width={90} height={90}/>
                           <div className="box-text">
                                <h1>Almoço</h1>
                                <p>ver receitas</p>
                           </div>
                          <Image src="/setadir.png" alt="seta direita" width={30} height={30}/>
                        </a>
                        <a href="/refeicoes/janta" className="main-box">
                           <Image src="/janta.png" alt="janta" width={90} height={90}/>
                           <div className="box-text">
                               <h1>Janta</h1>
                                <p>ver receitas</p>
                           </div>
                           <Image src="/setadir.png" alt="seta direita" width={30} height={30}/>
                        </a>
                    </div>
                </div>

                <Navbar />
       
        </div>
    );
}