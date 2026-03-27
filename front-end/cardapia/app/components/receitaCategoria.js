"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  buscarReceitas,
  deletarReceita,
  atualizarReceita,
} from "@/lib/api";
import Image from "next/image";
import styles from "@/app/principal/principal.module.css"

export default function PaginaCategoria({ tipo }) {
  const queryClient = useQueryClient();
  const [receitaSelecionada, setReceitaSelecionada] = useState(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["receitas", tipo],
    queryFn: () => buscarReceitas(tipo),
  });

  const mutationExcluir = useMutation({
    mutationFn: deletarReceita,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["receitas", tipo] });
      alert("Receita excluída!");
    },
  });

  const mutationEditar = useMutation({
    mutationFn: ({ objectId, novoTitulo }) =>
      atualizarReceita(objectId, { titulo: novoTitulo }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["receitas", tipo] });
      alert("Título atualizado!");
    },
  });

  const handleEditar = (objectId, tituloAtual) => {
    const novoTitulo = prompt("Digite o novo título:", tituloAtual);
    if (novoTitulo && novoTitulo !== tituloAtual) {
      mutationEditar.mutate({ objectId, novoTitulo });
    }
  };

  if (isLoading) return <p>Carregando receitas de {tipo}...</p>;
  if (error) return <p>Erro: {error.message}</p>;

  const listaDeReceitas = data || [];



  return (
    <div style={{ display: "flex", flexDirection: "column", padding: "20px" }}>
      <div
        style={{
          margin: "5% 0",
          color: "#575656",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          gap: "5%",
        }}
      >
        <div
          style={{
            width: "40%",
            height: "2px",
            backgroundColor: "#575656",
          }}
        ></div>

        <h2>{tipo}</h2>

        <div
          style={{
            width: "40%",
            height: "2px",
            backgroundColor: "#575656",
          }}
        ></div>
      </div>
      
      <div style={{ display: "grid", gap: "15px" }}>
        {listaDeReceitas.map((receita) => (
          <div
            key={receita.objectId}
            style={{
              width: "40vh",
              border: "1px solid #ccc",
              padding: "15px",
              borderRadius: "8px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>{receita.titulo}</h3>

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={() =>
                    handleEditar(receita.objectId, receita.titulo)
                  }
                  style={{ background: "none", border: "none" }}
                >
                  <Image src="/edit-gray.png" alt="editar" width={20} height={20} />
                </button>

                <button
                  onClick={() =>
                    mutationExcluir.mutate(receita.objectId)
                  }
                  style={{ background: "none", border: "none" }}
                >
                  <Image src="/delete.png" alt="deletar" width={20} height={20} />
                </button>
              </div>
            </div>

            <button
              onClick={() => setReceitaSelecionada(receita)}
              style={{
                marginTop: "10px",
                padding: "10px 16px",
                borderRadius: "8px",
                border: "none",
                background: "linear-gradient(135deg, #00e67b, #059150)",
                color: "white",
                fontWeight: "600",
                cursor: "pointer",
                transition: "0.3s",
              }}
              onMouseOver={(e) => (e.target.style.opacity = "0.85")}
              onMouseOut={(e) => (e.target.style.opacity = "1")}
            >
              Ver Receita
            </button>
          </div>
        ))}
      </div>

      {receitaSelecionada && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <h2>{receitaSelecionada.titulo}</h2>
            <hr />

            <p><strong>Ingredientes:</strong></p>
            <pre style={{ whiteSpace: "pre-wrap" }}>
              {receitaSelecionada.ingredientes}
            </pre>

            <p><strong>Instruções:</strong></p>
            <pre style={{ whiteSpace: "pre-wrap" }}>
              {receitaSelecionada.instrucao}
            </pre>

            <p><strong>Tempo:</strong> {receitaSelecionada.tempo_preparo}</p>
            <p><strong>Calorias:</strong> {receitaSelecionada.calorias} kcal</p>

            <button onClick={() => setReceitaSelecionada(null)}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const modalOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.7)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalContentStyle = {
  backgroundColor: "white",
  padding: "30px",
  borderRadius: "12px",
  maxWidth: "500px",
  width: "90%",
  maxHeight: "80vh",
  overflowY: "auto",
};