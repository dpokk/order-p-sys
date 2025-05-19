import * as OrderModel from '../models/Order.js';
import * as OrderItemModel from '../models/OrderItem.js';

// Create a new order
export const createOrder = async (req, res) => {
    const { customerId, items } = req.body;
    
    try {
        // Validate required fields
        if (!customerId) {
            return res.status(400).json({ message: 'Customer ID is required' });
        }
        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: 'Order items are required' });
        }

        // Create the order with initial total amount
        const result = await OrderModel.createOrder(customerId, items);
        const orderId = result.insertId;

        // Add each item to the order
        const itemPromises = items.map(item => 
            OrderItemModel.addOrderItem(orderId, item.product_id, item.quantity)
        );
        await Promise.all(itemPromises);        res.status(201).json({
            message: 'Order created successfully',
            orderId
        });
    } catch (error) {
        console.error('Error in createOrder:', error);
        res.status(500).json({ 
            message: 'Error creating order', 
            error: error.message 
        });
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

// Get a single order by order ID, including customer and items
export const getOrderById = async (req, res) => {
    const { orderId } = req.params;
    try {
        const order = await OrderModel.getOrderById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving order', error: error.message });
    }
};

// Get all orders
export const getAllOrders = async (req, res) => {
    try {
        const orders = await OrderModel.getAllOrders();
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
