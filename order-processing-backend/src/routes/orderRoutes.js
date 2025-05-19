import express from 'express';
import * as OrderController from '../controllers/orderController.js';

const router = express.Router();

// Get total cost of all orders
router.get('/totals', async (req, res) => {
    await OrderController.getOrdersTotalCost(req, res);
});

// Get all orders for a specific customer
router.get('/customer/:customerId', async (req, res) => {
    await OrderController.getOrdersByCustomer(req, res);
});

// Get customer order summary
router.get('/customer/:customerId/summary', async (req, res) => {
    await OrderController.getCustomerOrderSummary(req, res);
});

// Get all orders
router.get('/', async (req, res) => {
    await OrderController.getAllOrders(req, res);
});

// Create a new order
router.post('/', async (req, res) => {
    await OrderController.createOrder(req, res);
});

// Cancel an order
router.put('/:orderId/cancel', async (req, res) => {
    await OrderController.cancelOrder(req, res);
});

// Get a single order by order ID
router.get('/:orderId', async (req, res) => {
    await OrderController.getOrderById(req, res);
});

// Delete an order
router.delete('/:orderId', async (req, res) => {
    await OrderController.deleteOrder(req, res);
});

export default router;
