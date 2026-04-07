"use client";

import React, { useState } from "react";
import { prepararESalvarReceita } from "@/lib/utils/formatarReceita";
import styles from "./poupia.module.css";

export default function PopupIA({ tipo }) {
  const [mostrar, setMostrar] = useState(false);
  const [texto, setTexto] = useState("");
  const [receita, setReceita] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [salvando, setSalvando] = useState(false);

  const enviar = async () => {
    const listaLimpa = texto
      .split("\n")
      .map((i) => i.trim())
      .filter(Boolean)
      .join(", ");

    if (!listaLimpa) return;

    try {
      setCarregando(true);
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredientes: listaLimpa }),
      });
      
      const data = await res.json();
      setReceita(data);
      setMostrar(false); 
      setTexto("");      
    } catch (err) {
      console.error("Erro ao gerar receita:", err);
    } finally {
      setCarregando(false);
    }
  };

  const salvar = async () => {
    try {
      setSalvando(true);
      await prepararESalvarReceita(receita, tipo);
      setReceita(null); // Fecha o resultado após salvar
    } catch (err) {
      console.error("Erro ao salvar:", err);
    } finally {
      setSalvando(false);
    }
  };

  return (
    <>
      <button 
        className={styles.fab} 
        onClick={() => setMostrar(true)} 
        aria-label="Gerar receita com IA"
      >
        <span className={styles.fabIcon}>✦</span>
        <span className={styles.fabLabel}>IA</span>
      </button>

      {mostrar && (
        <div className={styles.overlay} onClick={() => setMostrar(false)}>
          <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
            <button className={styles.fechar} onClick={() => setMostrar(false)}>×</button>

            <div className={styles.popupHeader}>
              <span className={styles.badge}>✦ IA</span>
              <h3 className={styles.popupTitulo}>Quais ingredientes você tem?</h3>
              <p className={styles.popupSub}>Um por linha ou separados por vírgula</p>
            </div>

            <textarea
              className={styles.textarea}
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              placeholder="Ex: tomate, ovos, queijo..."
              rows={5}
            />

            <button
              className={styles.btnGerar}
              onClick={enviar}
              disabled={carregando || !texto.trim()}
            >
              {carregando ? <span className={styles.loadDot} /> : "Gerar receita →"}
            </button>
          </div>
        </div>
      )}

      {receita && (
        <div className={styles.overlay} onClick={() => setReceita(null)}>
          <div className={styles.resultado} onClick={(e) => e.stopPropagation()}>
            <button className={styles.fechar} onClick={() => setReceita(null)}>×</button>

            <span className={styles.badge}>✦ Receita gerada</span>
            <h2 className={styles.receitaTitulo}>{receita.titulo}</h2>

            <div className={styles.metaRow}>
              {receita.tempo_preparo && (
                <span className={styles.pill}>{receita.tempo_preparo}</span>
              )}
              {receita.calorias && (
                <span className={styles.pill}>{receita.calorias} kcal</span>
              )}
            </div>

            <div className={styles.secao}>
              <h4 className={styles.secaoLabel}>Ingredientes</h4>
              <ul className={styles.lista}>
                {receita.ingredientes.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div className={styles.secao}>
              <h4 className={styles.secaoLabel}>Modo de preparo</h4>
              <ol className={styles.lista}>
                {receita.instrucao.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ol>
            </div>

            <div className={styles.botoes}>
              <button className={styles.btnCancelar} onClick={() => setReceita(null)}>
                Descartar
              </button>
              <button 
                className={styles.btnSalvar} 
                onClick={salvar} 
                disabled={salvando}
              >
                {salvando ? "Salvando…" : "Salvar receita"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}