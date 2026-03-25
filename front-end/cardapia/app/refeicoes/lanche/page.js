// app/categorias/[tipo]/page.js
import PaginaCategoria from '@/app/components/receitaCategoria'

// O Next.js injeta o 'params' aqui automaticamente em Server Components
export default function Page({ params }) {
  // Pegamos o 'tipo' que vem da URL (ex: /categorias/lanche -> tipo: 'lanche')
  const { tipo } = params;

  return (
    <>
      <PaginaCategoria tipo="lanche" />
    </>
  );
}