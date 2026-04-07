const API = "/api/receitas";

export const salvarReceita = async (dados) => {
  const res = await fetch(API, {
    method: "POST",
    body: JSON.stringify(dados),
  });

  return res.json();
};

export const buscarReceitas = async (categoria) => {
  const res = await fetch(
    categoria ? `${API}?categoria=${categoria}` : API
  );

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