import connection from '../config/database.js';

export const createOrder = async (customerId) => {
    const [result] = await db.execute(
        'INSERT INTO orders (customer_id, total_amount) VALUES (?, 0.00)',
        [customerId]
    );
    return result;
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
