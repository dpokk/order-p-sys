import connection from '../config/database.js';

// Create a new customer
export const createCustomer = (name, email, phone) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO customers (name, email, phone) VALUES (?, ?, ?)';
        connection.query(query, [name, email, phone], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

// Get customer by email
export const getCustomerByEmail = (email) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM customers WHERE email = ?';
        connection.query(query, [email], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results[0]); // Assuming one customer per email
        });
    });
};

// Update customer details by ID
export const updateCustomer = (customerId, name, email, phone) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE customers SET name = ?, email = ?, phone = ? WHERE customer_id = ?';
        connection.query(query, [name, email, phone, customerId], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

// Delete customer by ID
export const deleteCustomer = (customerId) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM customers WHERE customer_id = ?';
        connection.query(query, [customerId], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

// Get all customers
export const getAllCustomers = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM customers';
        connection.query(query, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};
