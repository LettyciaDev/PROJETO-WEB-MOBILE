import { API_URL, HEADERS } from "../back4app";

export async function criarReceita(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function listarReceitas(categoria) {
  let url = API_URL;

  if (categoria) {
    const query = JSON.stringify({ categoria });
    url += `?where=${encodeURIComponent(query)}`;
  }

  const res = await fetch(url, { headers: HEADERS });
  const data = await res.json();

  return data.results;
}

export async function atualizarReceita(id, dados) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: HEADERS,
    body: JSON.stringify(dados),
  });

  return res.json();
}

export async function deletarReceita(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: HEADERS,
  });
}