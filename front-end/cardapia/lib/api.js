const API = "/api/receitas";

export const salvarReceita = async (dados, userId) => {
  const res = await fetch(`${API}?userId=${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  });

  if (!res.ok) {
    const erro = await res.json();
    throw new Error(erro.error || "Erro ao salvar receita");
  }

  return res.json();
};

export const buscarReceitas = async (categoria, userId) => {
  if (!userId || userId === "undefined") {
    console.warn("Busca cancelada: userId não definido.");
    return []; 
  }

  const params = new URLSearchParams();
  if (categoria) params.append("categoria", categoria);
  params.append("userId", userId);

  const res = await fetch(`/api/receitas?${params.toString()}`);
  return res.json();
};

export const atualizarReceita = async (id, dados) => {
  const res = await fetch(`/api/receitas/${id}`, {
    method: "PUT",
    body: JSON.stringify(dados),
  });

  return res.json();
};

export const deletarReceita = async (id) => {
  await fetch(`/api/receitas/${id}`, {
    method: "DELETE",
  });
};