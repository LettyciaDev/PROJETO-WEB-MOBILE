// lib/api.js
const API_URL = 'https://parseapi.back4app.com/classes/Receita';
const HEADERS = {
  'X-Parse-Application-Id': 'EIu3PnOecajB0V7MfEB2lEHqiIlVgtwdqo4VLYJj',
  'X-Parse-REST-API-Key': 'YgMS5AjIXUgVt3nqnZN7IO3f1xOlHqST4CBulT9A',
  'Content-Type': 'application/json',
};


export const fetchReceitasPorCategoria = async (categoria) => {
  let url = API_URL;

  if (categoria) {
    const query = JSON.stringify({ categoria });
    url += `?where=${encodeURIComponent(query)}`;
  }
  
  const response = await fetch(url, { headers: HEADERS });

  if (!response.ok) {
    throw new Error(`Erro: ${response.status}`);
  }

  const json = await response.json();
  return json.results;
};


export const excluirReceita = async (objectId) => {
  const response = await fetch(`${API_URL}/${objectId}`, {
    method: 'DELETE',
    headers: HEADERS,
  });
  if (!response.ok) throw new Error('Erro ao excluir');
  return true;
};

export const atualizarTituloReceita = async ({ objectId, novoTitulo }) => {
  const response = await fetch(`${API_URL}/${objectId}`, {
    method: 'PUT',
    headers: HEADERS,
    body: JSON.stringify({ titulo: novoTitulo }),
  });
  if (!response.ok) throw new Error('Erro ao atualizar');
  return response.json();
};

