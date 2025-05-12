import * as OrderModel from '../models/Order.js';

// Create a new order
export const createOrder = async (req, res) => {
    const { customerId } = req.body;
    try {
        if (!customerId) {
            return res.status(400).json({ message: 'Customer ID is required' });
        }

        // Don't pass totalAmount. It starts with 0.00
        const result = await OrderModel.createOrder(customerId);

        res.status(201).json({ message: 'Order created successfully', result });
    } catch (error) {
        res.status(500).json({ message: 'Error creating order', error: error.message });
    }
};

// Get all orders for a customer
export const getOrdersByCustomer = async (req, res) => {
    const { customerId } = req.params;
    try {
        const orders = await OrderModel.getOrdersByCustomer(customerId);
        if (orders.length === 0) {
            return res.status(404).json({ message: 'No orders found for this customer' });
        }
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving orders', error: error.message });
    }
};

// Delete order by ID
export const deleteOrder = async (req, res) => {
    const { orderId } = req.params;
    try {
        const result = await OrderModel.deleteOrder(orderId);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({ message: 'Order deleted successfully', result });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting order', error: error.message });
    }
};
