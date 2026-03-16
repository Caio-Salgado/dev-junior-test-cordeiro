'use client';

import { useState, useEffect } from 'react';
import ProductCard from './components/ProductCard';
import TypeFilter from './components/TypeFilter';
import Pagination from './components/Pagination';

const PAGE_SIZE = 12;

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  // ==========================================================================
  // TODO 0: Criar state para o tipo selecionado no filtro
  //
  // Crie um estado chamado "selectedType" com valor inicial "" (string vazia,
  // que representa "todos os tipos").
  //
  // Dica: Use o useState do React.
  //       const [selectedType, setSelectedType] = useState('');
  // ==========================================================================

  const [selectedType, setSelectedType] = useState('');

  // ==========================================================================
  // TODO 1: Criar state para a pagina atual
  //
  // Crie um estado chamado "currentPage" com valor inicial 1.
  //
  // Dica: const [currentPage, setCurrentPage] = useState(1);
  // ==========================================================================

const [currentPage, setCurrentPage] = useState(1);

  // --------------------------------------------------------------------------
  // Fetch dos produtos (ja implementado)
  //
  // A API retorna um objeto com:
  //   { data: [...produtos], meta: { page, pageSize, total, totalPages } }
  //
  // O fetch usa os query params ?page=&pageSize=&type= para paginacao e filtro.
  // --------------------------------------------------------------------------
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        // ====================================================================
        // TODO 2: Montar a URL com os query params de paginacao e filtro
        //
        // A URL base e '/api/products'. Voce precisa adicionar os query params:
        //   - page: a pagina atual (currentPage)
        //   - pageSize: PAGE_SIZE (definido acima como 12)
        //   - type: o tipo selecionado (apenas se nao for vazio)
        //
        // Dica: Use URLSearchParams para montar os query params:
        //   const params = new URLSearchParams({
        //     page: currentPage,
        //     pageSize: PAGE_SIZE,
        //   });
        //   if (selectedType) params.set('type', selectedType);
        //   const url = `/api/products?${params}`;
        //
        // Substitua a URL fixa abaixo pela URL montada dinamicamente.
        // ====================================================================
        const url = '/api/products';

        const response = await fetch(url);
        if (!response.ok) throw new Error('Erro ao buscar produtos');
        const result = await response.json();

        // ====================================================================
        // TODO 3: Extrair os dados e metadata da resposta
        //
        // A API retorna { data: [...], meta: { page, pageSize, total, totalPages } }.
        // Atualize os estados com os valores corretos:
        //
        //   setProducts(result.data);
        //   setTotalPages(result.meta.totalPages);
        //   setTotal(result.meta.total);
        //
        // Substitua o setProducts abaixo pela logica correta.
        // ====================================================================
        setProducts(result.data || result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []); // TODO: Adicione currentPage e selectedType como dependencias do useEffect
  //       para que o fetch seja refeito quando a pagina ou o tipo mudar.
  //       Exemplo: }, [currentPage, selectedType]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-muted-foreground text-lg">
        Carregando produtos...
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen text-destructive text-lg">
        Erro: {error}
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Produtos Solar
        </h1>
        <p className="text-muted-foreground mt-1">
          Catalogo de produtos para energia solar
        </p>
      </header>

      {/* ====================================================================
          TODO 4: Renderizar a toolbar com o filtro e o contador de produtos

          Descomente o bloco abaixo e passe as props corretas para o TypeFilter.

          O <TypeFilter> precisa de:
            - selectedType: o estado do tipo selecionado
            - onTypeChange: a funcao para atualizar o tipo selecionado

          Dica: Quando o tipo muda, a pagina deve voltar para 1.
                Crie uma funcao:
                const handleTypeChange = (type) => {
                  setSelectedType(type);
                  setCurrentPage(1);
                };
          ==================================================================== */}
      {/* ====================================================================
          TODO 4: Conectar o filtro de tipo com os dados reais

          O componente TypeFilter ja esta renderizado abaixo, mas com valores
          fixos (selectedType="", onTypeChange vazio).

          Depois de criar o state selectedType (TODO 0), substitua:
            - selectedType={selectedType}
            - onTypeChange={handleTypeChange}

          Crie a funcao handleTypeChange que atualiza o tipo e reseta a pagina:
            const handleTypeChange = (type) => {
              setSelectedType(type);
              setCurrentPage(1);
            };

          Tambem atualize o contador para usar {total} em vez de
          {products.length}, para mostrar o total real da API.
          ==================================================================== */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <TypeFilter
          selectedType=""
          onTypeChange={() => {}}
        />
        <span className="text-sm text-muted-foreground">
          {products.length} produto(s) encontrado(s)
        </span>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground text-lg">
          Nenhum produto encontrado.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* ====================================================================
          TODO 5: Conectar a paginacao com os dados reais

          O componente Pagination ja esta renderizado abaixo, mas com valores
          fixos (currentPage=1, totalPages=1, onPageChange vazio).

          Depois de criar os states (TODO 0 e 1) e extrair a metadata da API
          (TODO 3), substitua os valores fixos pelas variaveis corretas:
            - currentPage={currentPage}      ← state da pagina atual
            - totalPages={totalPages}        ← state do total de paginas
            - onPageChange={setCurrentPage}  ← setter para mudar de pagina

          Lembre-se tambem de adicionar currentPage como dependencia do
          useEffect (TODO no useEffect) para que o fetch seja refeito ao
          mudar de pagina.
          ==================================================================== */}
      <Pagination
        currentPage={1}
        totalPages={1}
        onPageChange={() => {}}
      />
    </div>
  );
}