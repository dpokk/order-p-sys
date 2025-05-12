import connection from '../config/database.js';

// Add Order Item (fetch price from products table)
export const addOrderItem = (orderId, productId, quantity) => {
    return new Promise((resolve, reject) => {
        // Step 1: Get product price
        const getProductPriceQuery = 'SELECT price FROM products WHERE product_id = ?';
        connection.query(getProductPriceQuery, [productId], (err, productResults) => {
            if (err) {
                return reject(err);
            }
            if (productResults.length === 0) {
                return reject(new Error('Product not found'));
            }

            const price = productResults[0].price;

            // Step 2: Insert into order_items with fetched price
            const insertOrderItemQuery = `
                INSERT INTO order_items (order_id, product_id, quantity, price)
                VALUES (?, ?, ?, ?)
            `;
            connection.query(insertOrderItemQuery, [orderId, productId, quantity, price], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    });
};

// Get all order items for a specific order
export const getOrderItemsByOrderId = (orderId) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT oi.order_item_id, oi.order_id, oi.product_id, p.name AS product_name,
                   oi.quantity, oi.price, (oi.quantity * oi.price) AS item_total
            FROM order_items oi
            JOIN products p ON oi.product_id = p.product_id
            WHERE oi.order_id = ?
        `;
        connection.query(query, [orderId], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

// Update quantity of an order item (fetch latest product price)
export const updateOrderItem = (orderItemId, quantity) => {
    return new Promise((resolve, reject) => {
        // Get product_id of the order item
        const getProductIdQuery = 'SELECT product_id FROM order_items WHERE order_item_id = ?';
        connection.query(getProductIdQuery, [orderItemId], (err, orderItemResults) => {
            if (err) {
                return reject(err);
            }
            if (orderItemResults.length === 0) {
                return reject(new Error('Order item not found'));
            }

            const productId = orderItemResults[0].product_id;

            // Get latest price of the product
            const getProductPriceQuery = 'SELECT price FROM products WHERE product_id = ?';
            connection.query(getProductPriceQuery, [productId], (err, productResults) => {
                if (err) {
                    return reject(err);
                }
                if (productResults.length === 0) {
                    return reject(new Error('Product not found'));
                }

                const latestPrice = productResults[0].price;

                // Update order item with new quantity and updated price
                const updateOrderItemQuery = `
                    UPDATE order_items SET quantity = ?, price = ? WHERE order_item_id = ?
                `;
                connection.query(updateOrderItemQuery, [quantity, latestPrice, orderItemId], (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(result);
                });
            });
        });
    });
};

// Delete an order item by ID
export const deleteOrderItem = (orderItemId) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM order_items WHERE order_item_id = ?';
        connection.query(query, [orderItemId], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

// Recalculate and update total amount for an order
export const updateOrderTotal = (orderId) => {
    return new Promise((resolve, reject) => {
        const sumQuery = `
            SELECT SUM(quantity * price) AS total
            FROM order_items
            WHERE order_id = ?
        `;
        connection.query(sumQuery, [orderId], (err, results) => {
            if (err) {
                return reject(err);
            }
            const totalAmount = results[0].total || 0.00;

            const updateOrderQuery = `
                UPDATE orders SET total_amount = ? WHERE order_id = ?
            `;
            connection.query(updateOrderQuery, [totalAmount, orderId], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    });
};

