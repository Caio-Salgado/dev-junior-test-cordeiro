'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// ============================================================================
// TODO 4: Implementar o componente TypeFilter
//
// Este componente deve renderizar um <select> que permite ao usuario
// filtrar os produtos por tipo.
//
// Props recebidas:
//   - selectedType: string → o tipo atualmente selecionado ("" = todos)
//   - onTypeChange: function(type) → callback chamado quando o usuario muda o select
//
// Opcoes do select:
//   - "" (vazio)    → "Todos os tipos"
//   - "inverter"    → "Inversores"
//   - "module"      → "Modulos"
//   - "cable"       → "Cabos"
//   - "connector"   → "Conectores"
//
// Dica: Use o evento onChange do <select> para chamar onTypeChange
//       com o valor selecionado (e.target.value).
//
// Exemplo de como o componente sera usado:
//   <TypeFilter selectedType={selectedType} onTypeChange={setSelectedType} />
// ============================================================================

export default function TypeFilter({ selectedType, onTypeChange }) {
  return (
    <div className="flex items-center gap-2">
      {/* TODO: Implementar onTypeChange para filtrar produtos por tipo via GraphQL */}
      <Select
        value={selectedType || "all"}
        onValueChange={(value) => onTypeChange(value === "all" ? "" : value)}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Todos os tipos" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos os tipos</SelectItem>
          <SelectItem value="inverter">Inversores</SelectItem>
          <SelectItem value="module">Modulos</SelectItem>
          <SelectItem value="cable">Cabos</SelectItem>
          <SelectItem value="connector">Conectores</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
