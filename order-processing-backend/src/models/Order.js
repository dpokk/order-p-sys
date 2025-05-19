import connection from '../config/database.js';

export const createOrder = (customerId, items) => {
    return new Promise((resolve, reject) => {
        // Calculate initial total_amount from items
        const totalAmount = items.reduce((sum, item) => 
            sum + (parseFloat(item.price) * parseInt(item.quantity)), 0);

        const query = 'INSERT INTO orders (customer_id, total_amount) VALUES (?, ?)';
        connection.query(query, [customerId, totalAmount], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

// Get all orders by customer ID
export const getOrdersByCustomer = (customerId) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM orders WHERE customer_id = ?';
        connection.query(query, [customerId], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

// Delete an order by ID
export const deleteOrder = (orderId) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM orders WHERE order_id = ?';
        connection.query(query, [orderId], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

// Get a single order by order ID, including customer and items
export const getOrderById = (orderId) => {
    return new Promise((resolve, reject) => {        const orderQuery = `
            SELECT o.order_id, o.customer_id, o.total_amount, o.order_date, o.status,
                   c.name AS customer_name, c.email AS customer_email, c.phone AS customer_phone
            FROM orders o
            JOIN customers c ON o.customer_id = c.customer_id
            WHERE o.order_id = ?
        `;
        connection.query(orderQuery, [orderId], (err, orderResults) => {
            if (err) return reject(err);
            if (orderResults.length === 0) return resolve(null);
            const order = orderResults[0];
            // Get order items
            const itemsQuery = `
                SELECT oi.order_item_id, oi.product_id, p.name AS product_name, oi.quantity, oi.price, (oi.quantity * oi.price) AS item_total
                FROM order_items oi
                JOIN products p ON oi.product_id = p.product_id
                WHERE oi.order_id = ?
            `;
            connection.query(itemsQuery, [orderId], (err, itemResults) => {
                if (err) return reject(err);
                order.items = itemResults;
                resolve(order);
            });
        });
    });
};

// Get all orders with customer details
export const getAllOrders = () => {
    return new Promise((resolve, reject) => {        const query = `
            SELECT o.order_id, o.customer_id, o.order_date, o.total_amount, o.status,
                   c.name as customer_name
            FROM orders o
            JOIN customers c ON o.customer_id = c.customer_id
            ORDER BY o.order_date DESC
        `;
        connection.query(query, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

export const cancelOrder = (orderId) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE orders SET status = "cancelled" WHERE order_id = ?';
        connection.query(query, [orderId], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

export const getCustomerOrderSummary = (customerId) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
                o.order_id,
                o.order_date,
                o.total_amount,
                o.status,
                COUNT(oi.order_item_id) as total_items,
                c.name as customer_name
            FROM orders o
            LEFT JOIN order_items oi ON o.order_id = oi.order_id
            JOIN customers c ON o.customer_id = c.customer_id
            WHERE o.customer_id = ?
            GROUP BY o.order_id
            ORDER BY o.order_date DESC
        `;
        connection.query(query, [customerId], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

export const getTotalOrdersCost = () => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
                SUM(CASE WHEN status = 'placed' THEN total_amount ELSE 0 END) as active_orders_total,
                SUM(CASE WHEN status = 'cancelled' THEN total_amount ELSE 0 END) as cancelled_orders_total,
                COUNT(CASE WHEN status = 'placed' THEN 1 END) as active_orders_count,
                COUNT(CASE WHEN status = 'cancelled' THEN 1 END) as cancelled_orders_count,
                SUM(total_amount) as total_cost
            FROM orders
        `;
        connection.query(query, (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
    });
};
