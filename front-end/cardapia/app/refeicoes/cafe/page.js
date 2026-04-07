// app/categorias/[tipo]/page.js
import PaginaCategoria from '@/app/components/receitaCategoria'
import PopupIA from "@/app/components/poupIa";
// O Next.js injeta o 'params' aqui automaticamente em Server Components
export default function Page({ params }) {
  // Pegamos o 'tipo' que vem da URL (ex: /categorias/lanche -> tipo: 'lanche')
  const { tipo } = params;

  return (
    <>
      <PaginaCategoria tipo="cafe" />
      <PopupIA tipo="cafe" />
    </>
  );
}