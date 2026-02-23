# Dev Junior Test - Cordeiro

Exercicio pratico fullstack para gerenciamento de produtos de energia solar. O projeto consiste em uma API REST no backend e uma interface web no frontend, ambos com TODOs para o candidato implementar.

## Repositorio

https://github.com/lucas-issayama/dev-junior-test-cordeiro

```bash
git clone https://github.com/lucas-issayama/dev-junior-test-cordeiro.git
cd dev-junior-test-cordeiro
```

## Objetivo do exercicio

Voce recebera um projeto fullstack parcialmente implementado. A estrutura ja esta pronta — servidor, banco de dados, componentes visuais — mas diversas funcionalidades estao incompletas, marcadas com **TODOs** no codigo.

Seu objetivo e completar esses TODOs para fazer a aplicacao funcionar por completo:

- **Backend (7 TODOs):** Implementar endpoints da API REST — filtro por tipo, CRUD de produtos e estatisticas
- **Frontend (6 TODOs):** Conectar os componentes de filtro e paginacao com a API, gerenciar estados do React

Cada TODO no codigo contem instrucoes detalhadas, exemplos e dicas. Leia com atencao antes de implementar.

## Como entregar

1. Faca um **fork** deste repositorio para sua conta do GitHub
2. Clone o fork e trabalhe localmente
3. **Faca commits conforme avanca** — queremos ver seu progresso, nao apenas o resultado final. Exemplo:
   - `feat(backend): implement type filter on GET /products`
   - `feat(frontend): add selectedType and currentPage states`
   - `feat(frontend): connect pagination with API`
4. Ao finalizar, envie o link do seu fork

> **Dica:** Commits pequenos e frequentes mostram seu raciocinio e organizacao. Nao acumule tudo em um unico commit.

## Stack

| Camada | Tecnologia |
|--------|------------|
| **Frontend** | Next.js 14, React 18, Tailwind CSS 3, shadcn/ui, Radix UI |
| **Backend** | Node.js, Express, Knex (query builder), SQLite (better-sqlite3) |
| **UI Components** | Card, Badge, Button, Select (shadcn/ui + Radix primitives) |
| **Utilitarios** | clsx, tailwind-merge, class-variance-authority, lucide-react |

## Estrutura de pastas

```
.
├── README.md
├── backend/                           # API backend (Node.js + Express)
│   ├── src/
│   │   ├── index.js                   # Entry point — Express na porta 3020
│   │   ├── db.js                      # Conexao com o banco (Knex + SQLite)
│   │   └── routes/
│   │       └── products.js            # Rotas da API de produtos (TODOs 0-6)
│   ├── migrations/
│   │   └── 001_create_products.js     # Migration da tabela "products"
│   ├── seeds/
│   │   └── 001_products.js            # Seed com 100 produtos
│   ├── knexfile.js                    # Configuracao do Knex
│   └── package.json
│
└── frontend/                          # App frontend (Next.js + shadcn/ui)
    ├── src/
    │   ├── app/
    │   │   ├── layout.js              # Root layout (font Inter)
    │   │   ├── page.js                # Pagina principal (TODOs 0-5)
    │   │   ├── globals.css            # Tailwind directives + CSS variables shadcn
    │   │   └── components/
    │   │       ├── ProductCard.jsx    # Card de produto (shadcn Card + Badge)
    │   │       ├── TypeFilter.jsx     # Filtro por tipo (shadcn Select)
    │   │       └── Pagination.jsx     # Paginacao (shadcn Button)
    │   ├── components/
    │   │   └── ui/                    # Componentes shadcn/ui
    │   │       ├── badge.jsx
    │   │       ├── button.jsx
    │   │       ├── card.jsx
    │   │       └── select.jsx
    │   └── lib/
    │       └── utils.js               # Funcao cn() (clsx + tailwind-merge)
    ├── tailwind.config.js             # Configuracao do Tailwind CSS
    ├── postcss.config.js              # Configuracao do PostCSS
    ├── components.json                # Configuracao do shadcn/ui
    ├── jsconfig.json                  # Alias @/ → ./src/
    ├── next.config.mjs                # Proxy /api → backend:3020
    └── package.json
```

## Como comecar

### Backend

```bash
cd backend
npm install
npm run setup   # cria o banco e popula com dados
npm start       # inicia o servidor em http://localhost:3020
```

### Frontend

```bash
cd frontend
npm install
npm run dev     # inicia o servidor em http://localhost:3010
```

> **Importante:** O backend precisa estar rodando para o frontend funcionar.

## TODOs do Backend (`backend/src/routes/products.js`)

| TODO | Endpoint | Descricao |
|------|----------|-----------|
| 0 | `GET /products` | Adicionar filtro por tipo via query param `?type=` |
| 1 | `GET /products/random` | Retornar um produto aleatorio |
| 2 | `GET /products/stats` | Retornar contagem de produtos agrupados por tipo |
| 3 | `GET /products/:id` | Retornar um produto pelo ID |
| 4 | `POST /products` | Criar um novo produto |
| 5 | `PUT /products/:id` | Atualizar um produto existente |
| 6 | `DELETE /products/:id` | Deletar um produto |

## TODOs do Frontend (`frontend/src/app/page.js`)

Os TODOs do frontend estao concentrados em `page.js` e devem ser feitos **em ordem**:

### TODO 0 — Criar state `selectedType`

Criar um estado para armazenar o tipo de produto selecionado no filtro.

```js
const [selectedType, setSelectedType] = useState('');
```

### TODO 1 — Criar state `currentPage`

Criar um estado para armazenar a pagina atual da paginacao.

```js
const [currentPage, setCurrentPage] = useState(1);
```

### TODO 2 — Montar a URL com query params

Substituir a URL fixa `/api/products` por uma URL dinamica com os parametros de paginacao e filtro.

```js
const params = new URLSearchParams({
  page: currentPage,
  pageSize: PAGE_SIZE,
});
if (selectedType) params.set('type', selectedType);
const url = `/api/products?${params}`;
```

### TODO 3 — Extrair dados e metadata da resposta

A API retorna `{ data: [...], meta: { page, pageSize, total, totalPages } }`. Atualizar os estados com os valores corretos:

```js
setProducts(result.data);
setTotalPages(result.meta.totalPages);
setTotal(result.meta.total);
```

Tambem adicionar `currentPage` e `selectedType` como dependencias do `useEffect`.

### TODO 4 — Conectar o filtro de tipo (Select)

O componente `TypeFilter` ja esta renderizado, mas com valores fixos. Conectar com os states reais:

1. Criar a funcao `handleTypeChange` que atualiza o tipo e reseta a pagina para 1
2. Passar `selectedType={selectedType}` e `onTypeChange={handleTypeChange}` como props
3. Atualizar o contador para usar `{total}` em vez de `{products.length}`

```js
const handleTypeChange = (type) => {
  setSelectedType(type);
  setCurrentPage(1);
};
```

### TODO 5 — Conectar a paginacao

O componente `Pagination` ja esta renderizado, mas com valores fixos. Substituir pelos states reais:

```jsx
<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
/>
```

## Estrutura do banco de dados

A tabela `products` possui os seguintes campos:

| Campo | Tipo | Descricao |
|-------|------|-----------|
| `id` | integer | Chave primaria (auto-incremento) |
| `name` | string | Nome do produto |
| `code` | string | Codigo do produto |
| `type` | string | Tipo: `inverter`, `module`, `cable`, `connector` |
| `default_price_in_cents` | integer | Preco padrao em centavos |
| `stock_quantity` | integer | Quantidade em estoque |
| `weight` | float | Peso em kg |
| `manufacturer_name` | string | Nome do fabricante |
| `ac_power` | float | Potencia AC (inversores) |
| `dc_power` | float | Potencia DC (modulos) |
| `enabled` | boolean | Produto ativo/inativo |

O seed popula o banco com **100 produtos** (25 de cada tipo).

## Bonus (opcional)

Terminou todos os TODOs? Implemente funcionalidades extras para se destacar. Algumas ideias:

- Barra de busca por nome de produto
- Ordenacao por preco, nome ou estoque
- Dark mode
- Modal com detalhes do produto ao clicar no card
- Indicadores visuais de estoque (baixo, medio, alto)
- Tela de estatisticas consumindo `GET /products/stats`
- Formulario para criar/editar produto consumindo `POST` e `PUT`
- Qualquer outra melhoria que voce considere relevante

Nao ha limite — use a criatividade e mostre o que sabe fazer.
