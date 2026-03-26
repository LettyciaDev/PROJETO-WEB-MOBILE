"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Parse from 'parse';

const APP_ID = '';
const JS_KEY = ''; 
Parse.initialize(APP_ID, JS_KEY);
Parse.serverURL = 'https://parseapi.back4app.com/';

export default function Intro() {
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState("Usuário");
  const [userData, setUserData] = useState({
    peso: "58.4kg",
    exercicio: "3x/semana",
    objetivo: "ganhar massa muscular"
  });

  useEffect(() => {
    async function checkUser() {
      try {
        // O currentAsync é mais seguro para garantir que a sessão foi lida
        const currentUser = await Parse.User.currentAsync();
        if (currentUser) {
          console.log("Usuário encontrado:", currentUser.get("username"));
          setUsername(currentUser.get("username"));
        } else {
          console.log("Nenhum usuário logado no momento.");
        }
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    }

    checkUser();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="box-intro">
      <div className="intro-container">
        <div className="intro-description">
          <div className="intro-user">
            <div className="intro-img">
              <Image src="/user.png" alt="icone perfil" width={40} height={40} />
            </div>
            <h3><span>Bem vindo,</span> {username}</h3>
            
            <button onClick={() => setIsEditing(!isEditing)}>
              <Image 
                className="user-edit" 
                src={isEditing ? "/edit-white.png" : "/edit-white.png"} 
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