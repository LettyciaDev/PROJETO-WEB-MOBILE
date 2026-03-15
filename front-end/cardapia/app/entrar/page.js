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
          <h1>Faça seu login</h1>
          <div className="hero-text">
           
          </div>

          <div className="actions">
            <Link href="/principal" className="btn-principal">
              Entrar
            </Link>
          </div>

        </div>

      </div>

    </main>
  );
}