"use client"

import { useState } from "react";
import Button from "@/app/components/button";
import styles from './poupia.module.css';

export default function PopupIA() {
  const [mostrar, setMostrar] = useState(false);
  const [texto, setTexto] = useState("");

  const abrirCaixa = () => setMostrar(true);

  const enviar = async () => {

    try {
        const listaLimpa = texto
        .split("\n")
        .map(item => item.trim())
        .filter(item => item !== "")
        .join(", ");

        const prompt = `Aja como nutricionista. Crie uma receita saudável com: ${listaLimpa}. 
    Retorne EXCLUSIVAMENTE um JSON válido.
    NÃO inclua explicações, apenas o JSON puro:
    { "titulo": "string", "ingredientes": ["string"], "instrucao": ["string"], "tempo_preparo": "string", "calorias": number }`;

        console.log(prompt); 

        const response = await fetch("/api/gemini", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt })
        });

        const data = await response.json();
        console.log(data);

    } catch (error) {
        console.error("Erro:", error);
    }

    
    console.log("Mensagem enviada:", texto);
    setTexto("");
    setMostrar(false);
    
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
    </>
  );
}