import { criarReceita, listarReceitas } from "@/lib/services/receitasService";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const categoria = searchParams.get("categoria");

  const data = await listarReceitas(categoria);
  return Response.json(data);
}

export async function POST(req) {
  const body = await req.json();
  const data = await criarReceita(body);

  return Response.json(data);
}