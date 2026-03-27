"use client"; // necessário no Next.js (App Router)

import { useState } from "react";
import Image from "next/image";
import "./entrar.comite.css";

export default function Home() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handleLogin() {
    // 🔹 Validação simples
    if (!email || !senha) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      const response = await fetch("URL_DO_ENDPOINT_AQUI", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          senha: senha,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login realizado com sucesso!");
        console.log(data);

        // redirecionar se quiser
        window.location.href = "/principal";
      } else {
        alert(data.message || "Erro ao fazer login");
      }
    } catch (error) {
      console.error(error);
      alert("Erro na requisição");
    }
  }

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

          <div className="inputs">
            <input
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          <div className="actions">
            <button onClick={handleLogin} className="btn-principal">
              Entrar
            </button>
          </div>
          <div>
            
            </div>
        </div>
      </div>
    </main>
  );
}