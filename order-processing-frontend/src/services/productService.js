// src/services/productService.js

import axios from "./api";

const apiUrl = "/api/products";

// Fetch all products
export const getProducts = async () => {
  return await axios.get(apiUrl);
};

// Create a new product
export const createProduct = async (productData) => {
  return await axios.post(apiUrl, productData);
};

// Update an existing product
export const updateProduct = async (productId, productData) => {
  return await axios.put(`${apiUrl}/${productId}`, productData);
};

// Delete a product
export const deleteProduct = async (productId) => {
  return await axios.delete(`${apiUrl}/${productId}`);
};
