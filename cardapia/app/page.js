import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="landing-container">
      <section className="hero">

        {/* Título */}
        <h1 className="logo">Cardapia</h1>

        {/* Imagem */}
        <div className="hero-image">
          <Image
            src="/comida.png"
            alt="Ilustração de receitas"
            width={300}
            height={300}
          />
        </div>

        {/* Texto */}
        <div className="hero-text">
          <h2>Sua despensa pode ser o ponto de partida para receitas incríveis!</h2>
          <p>Faça seu login ou cadastre-se e aproveite a experiência.</p>
        </div>

        {/* Botões que redirecionam */}
        <div className="actions">
          <Link href="/login" className="btn-login">
            Entrar
          </Link>

          <Link href="/cadastro" className="btn-register">
            Cadastrar
          </Link>
        </div>

      </section>
    </main>
  );
}