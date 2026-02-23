'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// ============================================================================
// TODO 5: Implementar o componente Pagination
//
// Este componente deve renderizar botoes de paginacao para navegar
// entre as paginas de produtos.
//
// Props recebidas:
//   - currentPage: number → pagina atual (comecando em 1)
//   - totalPages: number → total de paginas
//   - onPageChange: function(page) → callback chamado quando o usuario clica em uma pagina
//
// O componente deve mostrar:
//   1. Botao "Anterior" (desabilitado se estiver na primeira pagina)
//   2. Numeros das paginas (ex: 1 2 3 4 5) com a pagina atual destacada
//   3. Botao "Proximo" (desabilitado se estiver na ultima pagina)
//
// Dica: Para gerar um array de numeros de 1 a totalPages, use:
//       Array.from({ length: totalPages }, (_, i) => i + 1)
//
// Dica: Use a prop `disabled` em <button> para desabilitar botoes.
//       Use className para aplicar o estilo styles.active na pagina atual.
//
// Exemplo de como o componente sera usado:
//   <Pagination
//     currentPage={currentPage}
//     totalPages={totalPages}
//     onPageChange={setCurrentPage}
//   />
// ============================================================================

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-1 py-4">
      {/* TODO: Renderize os botoes de paginacao aqui */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
        Anterior
      </Button>

      {pages.map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? 'default' : 'outline'}
          size="sm"
          onClick={() => onPageChange(page)}
          className="min-w-[2.5rem]"
        >
          {page}
        </Button>
      ))}

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Proximo
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
