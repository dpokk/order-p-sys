import * as ProductModel from '../models/Product.js';

// Create a new product
export const createProduct = async (req, res) => {
    const { name, price } = req.body;
    try {
        if (!name || !price) {
            return res.status(400).json({ message: 'Product name and price are required' });
        }
        const result = await ProductModel.createProduct(name, price);
        res.status(201).json({ message: 'Product created successfully', result });
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error: error.message });
    }
};

// Get all products
export const getAllProducts = async (req, res) => {
    try {
        const products = await ProductModel.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving products', error: error.message });
    }
};

// Get a single product by ID
export const getProductById = async (req, res) => {
    const { productId } = req.params;
    try {
        const product = await ProductModel.getProductById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving product', error: error.message });
    }
};

// Update product details
export const updateProduct = async (req, res) => {
    const { productId } = req.params;
    const { name, price } = req.body;
    try {
        if (!name || !price) {
            return res.status(400).json({ message: 'Product name and price are required' });
        }
        const result = await ProductModel.updateProduct(productId, name, price);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product updated successfully', result });
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }
};

// Delete product by ID
export const deleteProduct = async (req, res) => {
    const { productId } = req.params;
    try {
        const result = await ProductModel.deleteProduct(productId);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully', result });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
};
