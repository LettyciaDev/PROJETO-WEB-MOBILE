import { criarReceita, listarReceitas } from "@/lib/services/receitasService";

export async function GET(req) {
 
  const { searchParams } = new URL(req.url);
  const categoria = searchParams.get("categoria");
  const userId = searchParams.get("userId");

  if (!userId) {
    return Response.json({ error: "O parâmetro userId é obrigatório na URL" }, { status: 400 });
  }

  const data = await listarReceitas(categoria, userId);
  return Response.json(data);
}

export async function POST(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return Response.json({ error: "O parâmetro userId é obrigatório na URL para salvar" }, { status: 400 });
  }

  const body = await req.json();
  const data = await criarReceita(body, userId);

  return Response.json(data);
}