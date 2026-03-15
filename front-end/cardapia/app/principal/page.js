import Image from "next/image";
import Link from "next/link";
import styles from "./principal.comite.css"

export default function Home(){
    return (
        <div className="container">
          <div className="hero">
            <div className="hero-container">
                <div className="hero-description">
                    <div className="hero-text">
                        <p>Bem vindo, <span>Usuário</span></p>
                        <p>Peso Atual: 58.4kg</p>
                    </div>
                    <div className="hero-img"><Image src="/user.png" alt="icone perfil" width={50} height={50}/></div>
                </div>
            </div>
          </div>

                <div className="main">
                    <div className="main-container">
                        <div className="main-box">
                            <div className="trapezio"><Image/></div>
                            <h1>LANCHES</h1>
                        </div>
                        <div className="main-box">
                            <div><Image/></div>
                            <h1>CAFÉ DA MANHÃ</h1>
                        </div>
                        <div className="main-box">
                            <div><Image/></div>
                            <h1>ALMOÇO</h1>
                        </div>
                        <div className="main-box">
                            <div><Image/></div>
                            <h1>JANTA</h1>
                        </div>
                    </div>
                </div>

                <div className="navbar">
                    <div className="navbar-container">
                        <Image src="/home.png" alt="home" width={40} height={40}/>
                        <p>MENU</p>              
                    </div>
                    <div  className="navbar-container">
                        <Image src="/tip.png" alt="tip" width={40} height={40}/>
                        <p>DICAS</p>
                    </div>
                </div>            
       
        </div>
    );
}