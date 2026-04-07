"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Parse from "parse";

const APP_ID = "nacEQNOlY9wAtonJpl6RwipjP4llln00qLmVat4p";
const JS_KEY = "jTtBnuRudxFDjYVfsDxpMYDdUNUvYvHuQempq0Po";

Parse.initialize(APP_ID, JS_KEY);
Parse.serverURL = "https://parseapi.back4app.com/";

const STATS = [
  { key: "peso", icon: "/peso.png", label: "Peso", alt: "peso" },
  { key: "exercicio", icon: "/exercicio.png", label: "Exercício", alt: "exercicio" },
  { key: "objetivo", icon: "/meta.png", label: "Objetivo", alt: "meta" },
];

export default function Intro() {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [username, setUsername] = useState("Usuário");
  const [email, setEmail] = useState("");
  
  const [userData, setUserData] = useState({
    peso: "58.4 kg",
    exercicio: "3× / semana",
    objetivo: "ganhar massa muscular",
  });

  useEffect(() => {
    async function fetchUser() {
      try {
        const currentUser = await Parse.User.currentAsync();
        if (currentUser) {
          setUsername(currentUser.get("username") || "Usuário");
          setEmail(currentUser.get("email") || "");
        }
      } catch (err) {
        console.error("Erro ao buscar usuário:", err);
      }
    }
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await Parse.User.logOut();
      router.push("/cadastro");
    } catch (error) {
      alert("Não foi possível deslogar.");
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleEdit = () => {
    if (isEditing) {
      console.log("Dados salvos:", userData);
    }
    setIsEditing(!isEditing);
  };

  return (
    <section className="hero-section">
      <div className="intro-container">
        <div className="intro-description">
          
          <div className="intro-user">
            <button
              className="user-avatar-btn"
              onClick={() => setShowDropdown(!showDropdown)}
              aria-label="Abrir menu do usuário"
            >
              <Image src="/user.png" alt="perfil" width={26} height={26} />
            </button>

            <h3>Olá, {username}</h3>

            <button
              className="btn-edit-toggle"
              onClick={toggleEdit}
              aria-label={isEditing ? "Salvar" : "Editar dados"}
            >
              <Image
                src={isEditing ? "/check.png" : "/edit-white.png"}
                alt="ícone de ação"
                width={16}
                height={16}
              />
            </button>

            {showDropdown && (
              <div className="user-dropdown-menu">
                <div className="dropdown-info">
                  <strong>{username}</strong>
                  <span>{email || "E-mail não cadastrado"}</span>
                </div>
                <hr className="dropdown-divider" />
                <button className="btn-logout" onClick={handleLogout}>
                  Sair da conta
                </button>
              </div>
            )}
          </div>

          <div className="intro-text">
            {STATS.map((stat) => (
              <div className="text-details" key={stat.key}>
                <Image src={stat.icon} alt={stat.alt} width={18} height={18} />
                
                {isEditing ? (
                  <input
                    name={stat.key}
                    value={userData[stat.key]}
                    onChange={handleChange}
                    className="edit-input"
                    placeholder={stat.label}
                  />
                ) : (
                  <p>
                    <span style={{ opacity: 0.7, marginRight: 4 }}>
                      {stat.label}:
                    </span>
                    {userData[stat.key]}
                  </p>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}