import { salvarReceita } from "@/lib/api";

export async function prepararESalvarReceita(receitaOriginal, categoria, userId) {
  const receitaFormatada = {
    ...receitaOriginal,

    ingredientes: Array.isArray(receitaOriginal.ingredientes)
      ? receitaOriginal.ingredientes.join(", ")
      : receitaOriginal.ingredientes,

    instrucao: Array.isArray(receitaOriginal.instrucao)
      ? receitaOriginal.instrucao.join("\n")
      : receitaOriginal.instrucao,

    categoria,
  };

  return await salvarReceita(receitaFormatada, userId);
}