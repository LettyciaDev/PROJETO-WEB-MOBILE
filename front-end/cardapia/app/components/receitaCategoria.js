"use client"
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchReceitasPorCategoria, excluirReceita, atualizarTituloReceita } from '@/app/components/api';
import Image from 'next/image';

export default function PaginaCategoria({ tipo }) {

  const queryClient = useQueryClient();
  const [receitaSelecionada, setReceitaSelecionada] = useState(null);
  const { data, isLoading, error } = useQuery({
    queryKey: ['receitas', tipo],
    queryFn: () => fetchReceitasPorCategoria(tipo),
  });

  // Mutação para Excluir
  const mutationExcluir = useMutation({
    mutationFn: excluirReceita,
    onSuccess: () => {
      queryClient.invalidateQueries(['receitas', tipo]);
      alert("Receita excluída!");
    },
  });

  // Mutação para Atualizar Título
  const mutationEditar = useMutation({
    mutationFn: atualizarTituloReceita,
    onSuccess: () => {
      queryClient.invalidateQueries(['receitas', tipo]);
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

  // Criamos uma variável auxiliar para facilitar a leitura
  // Se data existe, pegamos data.results. Se não, um array vazio.
  const listaDeReceitas = data || [];

  return (
 <div style={{display: 'flex', flexDirection:'column', alignContent:'center', padding: '20px' }}>
      <h2>Receitas: {tipo}</h2>
      
      <div style={{ display: 'grid', gap: '15px' }}>
        {listaDeReceitas.map((receita) => (
          <div key={receita.objectId} style={{width: '40vh', border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'space-between' }}>
              <h3>{receita.titulo}</h3>
              <div style={{display: 'flex', gap: '10px'}} >
                    <button onClick={() => handleEditar(receita.objectId, receita.titulo)} style={{ backgroundColor: 'None', border: 'None' }}>
                        <Image src="/edit-gray.png" alt='editar' width={20} height={20}/>
                    </button>
              
                    <button onClick={() => mutationExcluir.mutate(receita.objectId)} style={{ backgroundColor: 'None', border: 'None' }}>
                        <Image src="/delete.png" alt='deletar' width={20} height={20}/>
                    </button>
              </div>
           
            </div>
             <button onClick={() => setReceitaSelecionada(receita)}>Ver Receita</button>
          </div>
        ))}
      </div>

      {/* POP-UP (MODAL) */}
      {receitaSelecionada && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <h2>{receitaSelecionada.titulo}</h2>
            <hr />
            <p><strong>Ingredientes:</strong></p>
            <pre style={{ whiteSpace: 'pre-wrap' }}>{receitaSelecionada.ingredientes}</pre>
            <p><strong>Instruções:</strong></p>
            <pre style={{ whiteSpace: 'pre-wrap' }}>{receitaSelecionada.instrucao}</pre>
            <p><strong>Tempo:</strong> {receitaSelecionada.tempo_preparo}</p>
            <p><strong>Calorias:</strong> {receitaSelecionada.calorias} kcal</p>
            
            <button onClick={() => setReceitaSelecionada(null)} style={{ marginTop: '20px' }}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Estilos básicos para o Modal
const modalOverlayStyle = {
  position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
  backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
};

const modalContentStyle = {
  backgroundColor: 'white', padding: '30px', borderRadius: '12px',
  maxWidth: '500px', width: '90%', maxHeight: '80vh', overflowY: 'auto'
};