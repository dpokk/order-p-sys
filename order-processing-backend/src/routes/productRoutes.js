import express from 'express';
import * as ProductController from '../controllers/productController.js';

const router = express.Router();

// Create a new product
// Ensure that the request body contains the 'name' and 'price' fields
router.post('/', async (req, res) => {
    await ProductController.createProduct(req, res);
});

// Get all products
// Fetches all products in the database
router.get('/', async (req, res) => {
    await ProductController.getAllProducts(req, res);
});

// Get a single product by ID
// Returns product information based on the provided 'productId' parameter
router.get('/:productId', async (req, res) => {
    await ProductController.getProductById(req, res);
});

// Update a product by ID
// Updates the product information based on the provided 'productId' parameter
router.put('/:productId', async (req, res) => {
    await ProductController.updateProduct(req, res);
});

// Delete a product by ID
// Deletes the product from the database based on the provided 'productId' parameter
router.delete('/:productId', async (req, res) => {
    await ProductController.deleteProduct(req, res);
});

export default router;
