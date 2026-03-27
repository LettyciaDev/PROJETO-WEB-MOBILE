"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Parse from 'parse';

const APP_ID = 'nacEQNOlY9wAtonJpl6RwipjP4llln00qLmVat4p';
const JS_KEY = 'jTtBnuRudxFDjYVfsDxpMYDdUNUvYvHuQempq0Po'; 
Parse.initialize(APP_ID, JS_KEY);
Parse.serverURL = 'https://parseapi.back4app.com/';

export default function Intro() {
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState("Usuário");
  const [email, setEmail] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  const [userData, setUserData] = useState({
    peso: "58.4kg",
    exercicio: "3x/semana",
    objetivo: "ganhar massa muscular"
  });

  useEffect(() => {
    async function checkUser() {
      try {
       
        const currentUser = await Parse.User.currentAsync();
        if (currentUser) {
          console.log("Usuário encontrado:", currentUser.get("username"));
          setUsername(currentUser.get("username"));
          setEmail(currentUser.get("email") || "E-mail não cadastrado");
        } else {
          console.log("Nenhum usuário logado no momento.");
        }
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    }

    checkUser();
  }, []);
  const handleLogout = async () => {
    try {
      await Parse.User.logOut(); 
      router.push('/cadastro');
    } catch (error) {
      console.error("Erro ao sair:", error);
      alert("Não foi possível deslogar.");
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="box-intro">
      <div className="intro-container">
        <div className="intro-description">
          <div className="intro-user" style={{ position: 'relative' }}>
            
            <button 
              onClick={() => setShowDropdown(!showDropdown)} 
              style={{ 
                background: 'none', 
                border: 'none', 
                padding: 0, 
                cursor: 'pointer' 
              }}
            >
              <div className="intro-img">
                <Image src="/user.png" alt="icone perfil" width={40} height={40} />
              </div>
            </button>

            
            {showDropdown && (
              <div className="user-dropdown-menu">
                <div className="dropdown-info">
                  <strong>{username}</strong>
                  <span>{email}</span>
                </div>
                <hr />
                <button onClick={handleLogout} className="btn-logout">
                  Sair da conta
                </button>
              </div>
            )}
            
            <h3><span>Bem vindo,</span> {username}</h3>
            
            <button onClick={() => setIsEditing(!isEditing)}>
              <Image 
                className="user-edit" 
                src="/edit-white.png" 
                alt="icone edit" 
                width={30} 
                height={30} 
              />
            </button>
          </div>

          <div className="intro-text">
            <div className="intro-text-details">
              
              <div className="text-details">
                <Image src="/peso.png" alt="icone peso" width={50} height={50} />
                {isEditing ? (
                  <input 
                    name="peso" 
                    value={userData.peso} 
                    onChange={handleInputChange} 
                    className="edit-input"
                  />
                ) : (
                  <p>Peso: {userData.peso}</p>
                )}
              </div>

              <div className="text-details">
                <Image src="/exercicio.png" alt="icone exercicio" width={50} height={50} />
                {isEditing ? (
                  <input 
                    name="exercicio" 
                    value={userData.exercicio} 
                    onChange={handleInputChange} 
                    className="edit-input"
                  />
                ) : (
                  <p>Exercício: {userData.exercicio}</p>
                )}
              </div>

              <div className="text-details">
                <Image src="/meta.png" alt="icone meta" width={50} height={50} />
                {isEditing ? (
                  <input 
                    name="objetivo" 
                    value={userData.objetivo} 
                    onChange={handleInputChange} 
                    className="edit-input"
                  />
                ) : (
                  <p>Objetivo: {userData.objetivo}</p>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}