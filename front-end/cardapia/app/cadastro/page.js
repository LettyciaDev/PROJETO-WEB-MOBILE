'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Parse from 'parse';
import './cadastro.compile.css'; 

const APP_ID = 'nacEQNOlY9wAtonJpl6RwipjP4llln00qLmVat4p';
const JS_KEY = 'jTtBnuRudxFDjYVfsDxpMYDdUNUvYvHuQempq0Po'; 

Parse.initialize(APP_ID, JS_KEY);
Parse.serverURL = 'https://parseapi.back4app.com/';

export default function CadastroPage() {
  const router = useRouter(); 

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
      alert('Cadastro realizado com sucesso!');
      
      setUsername('');
      setEmail('');
      setPassword('');

      router.push('/principal'); 
      
    } catch (error) {
      alert('Ops! Algo deu errado: ' + error.message);
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
          {loading ? 'Carregando...' : 'Cadastrar'}
        </button>
      </form>
    </div>
  );
}