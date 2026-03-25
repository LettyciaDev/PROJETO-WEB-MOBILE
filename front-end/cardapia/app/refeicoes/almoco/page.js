"use client"

import Button from "@/app/components/button";
import styles from './almoco.module.css';
import { useState } from "react";


export default function Home() {
  const [mostrar, setMostrar] = useState(false);
  const [texto, setTexto] = useState("");
  

  function abrirCaixa() {
    setMostrar(true);
  }

function enviar() {
    console.log("Mensagem enviada:", texto);
    setTexto("");
    setMostrar(false);
  }

  return (
    <div>
        <Button onClick={abrirCaixa}>IA</Button>

      
        {mostrar && (
        <div className={styles.popup1} id="caixa">
            <h1> quais ingredientes voce tem? <br/> O que voce gostaria de comer?</h1>
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
            
            <button onClick={enviar}>Enviar</button>
        </div>
        )}
    </div>
  );
}

