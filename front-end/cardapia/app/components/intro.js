import Image from "next/image";

export default function Intro() {
    return (
         <div className="box-intro">
                    <div className="intro-container">
                        <div className="intro-description">
                            <div className="intro-text">
                                <h3><span>Bem vindo,</span> Usuário</h3>
                                <div className="intro-text-details">
                                    <div className="text-details">
                                        <Image src="/peso.png" alt="icone peso" width={50} height={50}/>
                                        <p>Peso: 58.4kg</p>
                                    </div>
                                    <div className="text-details">
                                        <Image src="/exercicio.png" alt="icone peso" width={50} height={50}/>
                                        <p>Exercício: 3x/semana</p>
                                    </div>
                                    <div className="text-details">
                                        <Image src="/meta.png" alt="icone peso" width={50} height={50}/>
                                        <p>Objetivo: ganhar massa muscular</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="intro-img"><Image src="/user.png" alt="icone perfil" width={40} height={40}/></div>
                        </div>
                    </div>
                  </div>
    );
}