import {
  atualizarReceita,
  deletarReceita,
} from "@/lib/services/receitasService";

export async function PUT(req, { params }) {
  const { id } = await params;

  if (!id) {
    return Response.json(
      { erro: "ID não fornecido" },
      { status: 400 }
    );
  }
  
  const body = await req.json();
  const data = await atualizarReceita(id, body);

  return Response.json(data);
}

export async function DELETE(req, { params }) {
  const { id } = await params;

  if (!id) {
    return Response.json(
      { erro: "ID não fornecido" },
      { status: 400 }
    );
  }

  await deletarReceita(id);

  return Response.json({ sucesso: true });
}