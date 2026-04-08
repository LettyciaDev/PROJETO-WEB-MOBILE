import { salvarReceita } from "@/lib/api";
import Parse from "parse";

export async function prepararESalvarReceita(receitaOriginal, categoria) {
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

  const currentUser = Parse.User.current();
  if (!currentUser) throw new Error("Usuário não logado");

  return salvarReceita(receitaFormatada, currentUser); // passa o usuário logado
}