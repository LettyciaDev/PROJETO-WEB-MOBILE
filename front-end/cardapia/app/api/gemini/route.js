import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { ingredientes } = await req.json();

    if (!ingredientes) {
      return NextResponse.json(
        { erro: "Ingredientes não fornecidos" },
        { status: 400 }
      );
    }

    const prompt = `Aja como nutricionista. Crie uma receita saudável com: ${ingredientes}.
    Retorne EXCLUSIVAMENTE um JSON válido. NÃO inclua explicações.
    Formato:
    {
      "titulo": "string",
      "ingredientes": ["string"],
      "instrucao": ["string"],
      "tempo_preparo": "string",
      "calorias": 0
    }`;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": "", 
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    console.log("RESPOSTA BRUTA:", JSON.stringify(data, null, 2));
    if (data.error) {
      console.error("ERRO DA GOOGLE API:", data.error);
      return NextResponse.json(
        { erro: data.error.message },
        { status: 500 }
      );
    }

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    try {
      const json = JSON.parse(text);
      return NextResponse.json(json);
    } catch {
      return NextResponse.json(
        {
          erro: "Resposta não veio em JSON",
          resposta: text,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("ERRO:", error);

    return NextResponse.json(
      { erro: error.message },
      { status: 500 }
    );
  }
}