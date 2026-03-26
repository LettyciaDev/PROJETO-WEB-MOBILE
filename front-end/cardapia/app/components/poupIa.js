"use client"

import { useState } from "react";
import Button from "@/app/components/button";
import styles from './poupia.module.css';
import { salvarReceita } from "./api";

export default function PopupIA({ tipo }) {
  const [mostrar, setMostrar] = useState(false);
  const [texto, setTexto] = useState("");
  const [receita, setReceita] = useState(null);

  const abrirCaixa = () => setMostrar(true);

  const enviar = async () => {

    try {
        const listaLimpa = texto
        .split("\n")
        .map(item => item.trim())
        .filter(item => item !== "")
        .join(", ");

     

        const response = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
          ingredientes: listaLimpa 
        }),
      });

      const data = await response.json();

      console.log("RESPOSTA BRUTA:", data);
  
      setMostrar(false)
      setReceita(data);
      setTexto("");
    
  } catch (error) {
    console.error("Erro:", error);
  }
 };

  return (
    <>
      <Button onClick={abrirCaixa}>IA</Button>

      {mostrar && (
        <div className={styles.popup1}>
          <button 
            className={styles.botaoFechar} 
            onClick={() => setMostrar(false)}
          >
            &times;
          </button>

          <h3>Quais ingredientes você tem?</h3>

          <textarea
            className={styles.input1}
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.shiftKey) {
                e.target.style.height = "auto";
                const maxHeight = 200;
                e.target.style.height = Math.min(e.target.scrollHeight, maxHeight) + "px";
              }
            }}
            rows={1}
          />
          <button  className={styles.botaoEnviar} onClick={enviar}>Gerar</button>
        </div>
      )}

      {receita && (
        <div className={styles.popupResultado}>
          
          <h2>{receita.titulo}</h2>

          <h4>Ingredientes:</h4>
          <ul>
            {receita.ingredientes.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <h4>Modo de preparo:</h4>
          <ol>
            {receita.instrucao.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ol>

          <p><strong>Tempo:</strong> {receita.tempo_preparo}</p>
          <p><strong>Calorias:</strong> {receita.calorias}</p>

          <div className={styles.botoes}>
            <button onClick={() => salvarReceita(receita, tipo)}>
               Salvar
            </button>

            <button onClick={() => setReceita(null)}>
              Cancelar
            </button>
          </div>

        </div>
      )}
    </>
  );
}