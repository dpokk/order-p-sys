import express from 'express';
import * as OrderController from '../controllers/orderController.js';

const router = express.Router();

// Create a new order
// Ensures that the request body contains 'customerId' and 'totalAmount'
router.post('/', async (req, res) => {
    await OrderController.createOrder(req, res);
});

// Get all orders for a specific customer
// Fetches all orders for the given 'customerId' parameter
router.get('/customer/:customerId', async (req, res) => {
    await OrderController.getOrdersByCustomer(req, res);
});

// Get a single order by order ID
router.get('/:orderId', async (req, res) => {
    await OrderController.getOrderById(req, res);
});

// Delete an order by ID
// Deletes the order record based on the 'orderId' parameter
router.delete('/:orderId', async (req, res) => {
    await OrderController.deleteOrder(req, res);
});

// Get all orders
router.get('/', async (req, res) => {
    await OrderController.getAllOrders(req, res);
});

export default router;
