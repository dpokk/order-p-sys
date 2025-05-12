import connection from '../config/database.js';

// Create a new product
export const createProduct = (name, price) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO products (name, price) VALUES (?, ?)';
        connection.query(query, [name, price], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

// Get all products
export const getAllProducts = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM products';
        connection.query(query, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

// Get a single product by ID
export const getProductById = (productId) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM products WHERE product_id = ?';
        connection.query(query, [productId], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results[0]); // Assuming there's only one product with the given ID
        });
    });
};

// Update product details
export const updateProduct = (productId, name, price) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE products SET name = ?, price = ? WHERE product_id = ?';
        connection.query(query, [name, price, productId], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

// Delete product by ID
export const deleteProduct = (productId) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM products WHERE product_id = ?';
        connection.query(query, [productId], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};
