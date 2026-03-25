import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
console.log("API KEY:", process.env.GEMINI_API_KEY);
export async function POST(req) {
  try {
    const body = await req.json();
    const prompt = body.prompt;

    if (!prompt) {
      return NextResponse.json({ erro: "Prompt vazio" });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash"
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    console.log("RESPOSTA GEMINI:", text); // 👈 DEBUG

    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let json;

    try {
      json = JSON.parse(text);
    } catch (err) {
      return NextResponse.json({
        erro: "JSON inválido",
        resposta: text
      });
    }

    return NextResponse.json(json);

  } catch (error) {
    console.error("ERRO REAL:", error); // 👈 AQUI ESTÁ A VERDADE

    return NextResponse.json(
      { erro: error.message || "Erro desconhecido" },
      { status: 500 }
    );
  }
}