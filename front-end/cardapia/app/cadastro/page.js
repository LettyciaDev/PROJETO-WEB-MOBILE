"use client";
import Parse from "../../lib/parse";
import { useState } from "react";
import { useRouter } from "next/navigation";

import "./cadastro.compile.css";

const APP_ID = "mmdgUUMfzBrInhwWfSDp3oFJW3gJGHyoXE4smW0Y";
const JS_KEY = "E5v7T9NIy5N7rFWxE82e3RFooyN8EG7HfIgXeR03";

export default function CadastroPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    const user = new Parse.User();
    user.set("username", username);
    user.set("email", email);
    user.set("password", password);

    try {
      await user.signUp();
      alert("Cadastro realizado com sucesso!");

      setUsername("");
      setEmail("");
      setPassword("");

      router.push("/principal");
    } catch (error) {
      alert("Ops! Algo deu errado: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cadastro-container">
      <form className="cadastro-form" onSubmit={handleSignup}>
        <h2>Cardapia</h2>
        <p>O segredo de uma boa receita pode estar bem aí na sua despensa!</p>

        <input
          type="text"
          placeholder="Nome de usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Carregando..." : "Cadastrar"}
        </button>
      </form>
    </div>
  );
}
