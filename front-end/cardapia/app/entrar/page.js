'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Parse from "parse";
import "./entrar.comite.css";

// Inicializa o Parse SDK
const APP_ID = "mmdgUUMfzBrInhwWfSDp3oFJW3gJGHyoXE4smW0Y";
const JS_KEY = "E5v7T9NIy5N7rFWxE82e3RFooyN8EG7HfIgXeR03";

Parse.initialize(APP_ID, JS_KEY);
Parse.serverURL = "https://parseapi.back4app.com/";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !senha) {
      alert("Preencha todos os campos!");
      return;
    }

    setLoading(true);

    try {
      // Login usando Parse SDK
      const user = await Parse.User.logIn(email, senha);

      // usuário logado com sessão salva automaticamente
      alert("Login realizado com sucesso!");
      console.log("Usuário logado:", user.get("username"));

      router.push("/principal");
    } catch (error) {
      console.error("Erro no login:", error);
      alert("Erro ao fazer login: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page-background">
      <div className="card">
        <div className="esquerda">
          <img
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
            <button onClick={handleLogin} className="btn-principal" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}