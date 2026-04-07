const API_URL ='https://parseapi.back4app.com/classes/Receita';

const HEADERS = {
  "X-Parse-Application-Id": 'mmdgUUMfzBrInhwWfSDp3oFJW3gJGHyoXE4smW0Y',
  "X-Parse-REST-API-Key": 'CLayZpzMzjswYZ7ry3vgMriGBsDhtTmNxkWMsxWQ',
  "Content-Type": "application/json",
};

export async function criarReceita(data, userId) {
  const payload = {
    ...data,
    usuario: {
      "__type": "Pointer",
      "className": "_User",
      "objectId": userId
    }
  };

  const res = await fetch(API_URL, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify(payload),
  });

  return res.json();
}

export async function listarReceitas(categoria, userId) {
  let url = API_URL;

  const queryObj = {
    usuario: {
      "__type": "Pointer",
      "className": "_User",
      "objectId": userId
    }
  };

  if (categoria) {
    queryObj.categoria = categoria;
  }

  const query = JSON.stringify(queryObj);
  url += `?where=${encodeURIComponent(query)}`;

  const res = await fetch(url, { headers: HEADERS });
  const data = await res.json();

  return data.results || [];
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