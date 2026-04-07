"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { buscarReceitas, deletarReceita, atualizarReceita } from "@/lib/api";
import styles from "./receitaCategoria.module.css";

export default function ReceitaCategoria({ tipo }) {
  const queryClient = useQueryClient();
  
  // Estados Locais
  const [receitaSelecionada, setReceitaSelecionada] = useState(null);
  const [editandoId, setEditandoId] = useState(null);
  const [novoTitulo, setNovoTitulo] = useState("");

  // Queries (Busca de dados)
  const { data, isLoading, error } = useQuery({
    queryKey: ["receitas", tipo],
    queryFn: () => buscarReceitas(tipo),
  });

  // Mutações (Excluir)
  const mutationExcluir = useMutation({
    mutationFn: deletarReceita,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["receitas", tipo] }),
  });

  // Mutações (Editar)
  const mutationEditar = useMutation({
    mutationFn: ({ objectId, titulo }) => atualizarReceita(objectId, { titulo }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["receitas", tipo] });
      setEditandoId(null);
    },
  });

  // Lógica de manipulação
  const iniciarEdicao = (receita) => {
    setEditandoId(receita.objectId);
    setNovoTitulo(receita.titulo);
  };

  const confirmarEdicao = (objectId) => {
    if (novoTitulo.trim()) {
      mutationEditar.mutate({ objectId, titulo: novoTitulo.trim() });
    }
  };

  const lista = data || [];

  if (isLoading) return (
    <div className={styles.estado}>
      <div className={styles.spinner} />
      <p>Carregando receitas de {tipo}…</p>
    </div>
  );

  if (error) return (
    <div className={styles.estado}>
      <p className={styles.erro}>Erro ao carregar: {error.message}</p>
    </div>
  );

  return (
    <div className={styles.page}>
      {/* Seção Hero */}
      <header className={styles.hero}>
        <h1 className={styles.heroTitulo}>{tipo}</h1>
        <p className={styles.heroSub}>
          {lista.length} receita{lista.length !== 1 ? "s" : ""} salva{lista.length !== 1 ? "s" : ""}
        </p>
      </header>

      <main className={styles.content}>
        {lista.length === 0 ? (
          <div className={styles.vazio}>
            <p>Nenhuma receita de {tipo} ainda.</p>
            <p>Use o botão IA para gerar a primeira! 🌿</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {lista.map((receita) => (
              <div key={receita.objectId} className={styles.card}>
                
                <div className={styles.cardHeader}>
                  {editandoId === receita.objectId ? (
                    <input
                      className={styles.editInput}
                      value={novoTitulo}
                      onChange={(e) => setNovoTitulo(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") confirmarEdicao(receita.objectId);
                        if (e.key === "Escape") setEditandoId(null);
                      }}
                      autoFocus
                    />
                  ) : (
                    <h3 className={styles.cardTitulo}>{receita.titulo}</h3>
                  )}

                  <div className={styles.acoes}>
                    {editandoId === receita.objectId ? (
                      <>
                        <button
                          className={`${styles.acaoBtn} ${styles.confirmar}`}
                          onClick={() => confirmarEdicao(receita.objectId)}
                        >✓</button>
                        <button
                          className={`${styles.acaoBtn} ${styles.cancelar}`}
                          onClick={() => setEditandoId(null)}
                        >✕</button>
                      </>
                    ) : (
                      <>
                        <button
                          className={styles.acaoBtn}
                          onClick={() => iniciarEdicao(receita)}
                          title="Editar título"
                        >
                          <img src="/edit-gray.png" alt="editar" width="16" height="16" />
                        </button>
                        <button
                          className={`${styles.acaoBtn} ${styles.deletar}`}
                          onClick={() => mutationExcluir.mutate(receita.objectId)}
                          title="Excluir receita"
                          disabled={mutationExcluir.isPending}
                        >
                          <img src="/delete.png" alt="deletar" width="16" height="16" />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <div className={styles.meta}>
                  {receita.tempo_preparo && (
                    <span className={styles.pill}>{receita.tempo_preparo}</span>
                  )}
                  {receita.calorias && (
                    <span className={styles.pill}>{receita.calorias} kcal</span>
                  )}
                </div>

                <button
                  className={styles.verBtn}
                  onClick={() => setReceitaSelecionada(receita)}
                >
                  Ver receita
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      {receitaSelecionada && (
        <div className={styles.overlay} onClick={() => setReceitaSelecionada(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.fecharModal} onClick={() => setReceitaSelecionada(null)}>×</button>

            <h2 className={styles.modalTitulo}>{receitaSelecionada.titulo}</h2>

            <div className={styles.modalMeta}>
              {receitaSelecionada.tempo_preparo && (
                <span className={styles.pill}>{receitaSelecionada.tempo_preparo}</span>
              )}
              {receitaSelecionada.calorias && (
                <span className={styles.pill}>{receitaSelecionada.calorias} kcal</span>
              )}
            </div>

            <section className={styles.modalSecao}>
              <h4 className={styles.modalLabel}>Ingredientes</h4>
              <p className={styles.modalTexto}>{receitaSelecionada.ingredientes}</p>
            </section>

            <section className={styles.modalSecao}>
              <h4 className={styles.modalLabel}>Modo de preparo</h4>
              <p className={styles.modalTexto}>{receitaSelecionada.instrucao}</p>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}