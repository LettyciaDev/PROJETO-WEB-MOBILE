import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="page-background">
      <div className="card">
        <div className="esquerda">
          <Image
            src="/imagens/cardapialogo.jpeg"
            alt="Ilustração de receitas"
            width={350}
            height={350}
          />
        </div>
        <div className="direita">
          <h1>Cardapia</h1>
          <div className="hero-text">
            <h2>
              Sua despensa pode ser o ponto de partida para receitas incríveis!
            </h2>
            <p>
              Faça seu login ou cadastre-se e aproveite a experiência.
            </p>
          </div>

          <div className="actions">
            <Link href="/entrar" className="btn-login">
              Entrar
            </Link>

            <Link href="/cadastro" className="btn-registro">
              Cadastrar
            </Link>
          </div>

        </div>

      </div>

    </main>
  );
}