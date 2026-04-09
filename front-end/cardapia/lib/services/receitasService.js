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
  if (!userId) return [];

  // 1. Montamos o objeto de busca (Query)
  const queryObj = {
    usuario: {
      "__type": "Pointer",
      "className": "_User",
      "objectId": userId
    }
  };

  // 2. Se houver categoria, adicionamos ao filtro
  if (categoria) {
    queryObj.categoria = categoria;
  }

  // 3. Transformamos o objeto em string e codificamos para a URL
  const where = encodeURIComponent(JSON.stringify(queryObj));
  
  // 4. Adicionamos o parâmetro 'where' e ordenação (opcional: -createdAt traz as novas primeiro)
  const finalUrl = `${API_URL}?where=${where}&order=-createdAt`;

  try {
    const res = await fetch(finalUrl, { 
      method: "GET",
      headers: HEADERS 
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Erro no Back4app:", errorText);
      return [];
    }

    const data = await res.json();
    
    // O Back4app sempre retorna uma lista dentro da chave 'results'
    return data.results || [];
  } catch (error) {
    console.error("Erro na requisição listarReceitas:", error);
    return [];
  }
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