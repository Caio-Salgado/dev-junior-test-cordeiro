const express = require('express');
const db = require('../db');

const router = express.Router();

// ============================================================================
// TODO 0: GET /products
//
// Return a paginated list of products. The route already works with pagination,
// but you need to add support for an optional query parameter ?type= to filter
// products by type.
//
// Valid types: "inverter", "module", "cable", "connector"
//
// Query parameters:
//   ?type=inverter  → filter by product type
//   ?page=1         → page number (default: 1)
//   ?pageSize=25    → items per page (default: 25)
//
// Examples:
//   GET /products                        → returns first 25 products
//   GET /products?type=inverter          → returns first 25 inverters
//   GET /products?page=2&pageSize=10     → returns products 11-20
//
// Expected response (200): an object with data and pagination metadata
//   {
//     "data": [{ "id": 1, "name": "Inversor Growatt 3000W MIN", ... }, ...],
//     "meta": {
//       "page": 1,
//       "pageSize": 25,
//       "total": 100,
//       "totalPages": 4
//     }
//   }
//
// Hint: Use req.query.type to access the query parameter.
//       Knex has .where('column', value) to add a WHERE clause.
//       You can conditionally add .where() only when the param is present.
// ============================================================================
router.get('/', async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const pageSize = Math.max(1, parseInt(req.query.pageSize) || 25);

    const query = db('products');

    // TODO 0: If req.query.type exists, filter products by type.
    //       Use query.where('type', req.query.type) to add the filter.
    if (req.query.type) {
      query.where('type', req.query.type);
    }

    const countResult = await query.clone().count('* as total').first();
    const total = countResult.total;

    const products = await query
      .select('*')
      .limit(pageSize)
      .offset((page - 1) * pageSize);

    res.json({
      data: products,
      meta: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// ============================================================================
// TODO 1: GET /products/random
//
// Return a single random product from the database.
//
// Expected response (200): a single product object (not an array)
//   { "id": 42, "name": "Inversor Growatt 5000W", ... }
//
// Hint: Think about how to pick a random row from a SQL table.
//       Knex has .orderByRaw() that can help with this.
// ============================================================================
// router.get('/random', async (req, res) => {
//   // Your code here
// });

// ============================================================================
// TODO 2: GET /products/stats
//
// Return the count of products grouped by type.
//
// Expected response (200):
//   [
//     { "type": "inverter", "count": 25 },
//     { "type": "module", "count": 25 },
//     { "type": "cable", "count": 25 },
//     { "type": "connector", "count": 25 }
//   ]
//
// Hint: Knex has .groupBy() and .count() methods.
//       Use .count('* as count') to name the count column.
// ============================================================================
// router.get('/stats', async (req, res) => {
//   // Your code here
// });

// ============================================================================
// TODO 3: GET /products/:id
//
// Return a single product by its ID.
// If the product does not exist, return a 404 with an error message.
//
// Expected response (200): a single product object
//   { "id": 1, "name": "Inversor Growatt 3000W", ... }
//
// Expected response (404):
//   { "error": "Product not found" }
//
// Hint: Use .where('id', id).first() to get a single row.
// ============================================================================
// router.get('/:id', async (req, res) => {
//   // Your code here
// });

// ============================================================================
// TODO 4: POST /products
//
// Create a new product. The request body contains the product fields.
// Validate that the required fields are present: name, code, type.
// If any required field is missing, return 400 with an error message.
//
// Expected request body:
//   { "name": "New Product", "code": "NP-001", "type": "module", ... }
//
// Expected response (201): the created product object
//   { "id": 101, "name": "New Product", ... }
//
// Expected response (400) when missing required fields:
//   { "error": "Missing required fields: name, code, type" }
//
// Hint: Use db('products').insert(data) to insert.
//       Use .returning('*') or re-query the inserted row to return it.
//       With SQLite + Knex, insert returns [id], so you can query by that id.
// ============================================================================
// router.post('/', async (req, res) => {
//   // Your code here
// });

// ============================================================================
// TODO 5: PUT /products/:id
//
// Update an existing product by its ID.
// If the product does not exist, return 404.
//
// Expected request body (partial update — only fields sent are updated):
//   { "name": "Updated Name", "stock_quantity": 50 }
//
// Expected response (200): the updated product object
//   { "id": 1, "name": "Updated Name", ... }
//
// Expected response (404):
//   { "error": "Product not found" }
//
// Hint: Use .where('id', id).update(data) to update.
//       Then query the product again to return the updated version.
// ============================================================================
// router.put('/:id', async (req, res) => {
//   // Your code here
// });

// ============================================================================
// TODO 6: DELETE /products/:id
//
// Delete a product by its ID.
// If the product does not exist, return 404.
//
// Expected response (200):
//   { "message": "Product deleted successfully" }
//
// Expected response (404):
//   { "error": "Product not found" }
//
// Hint: Use .where('id', id).del() to delete.
//       .del() returns the number of rows deleted (0 or 1).
// ============================================================================
// router.delete('/:id', async (req, res) => {
//   // Your code here
// });

module.exports = router;
