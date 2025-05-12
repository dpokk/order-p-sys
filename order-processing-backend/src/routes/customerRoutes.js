import express from 'express';
import * as CustomerController from '../controllers/customerController.js';

const router = express.Router();

// Create a new customer
// Ensures that the request body contains the 'name', 'email', and 'phone' fields
router.post('/', async (req, res) => {
    await CustomerController.createCustomer(req, res);
});

// Get a customer by email
// Fetches customer details using the provided 'email' parameter
router.get('/:email', async (req, res) => {
    await CustomerController.getCustomerByEmail(req, res);
});

// Update customer details
// Updates customer information based on the provided 'customerId' parameter
router.put('/:customerId', async (req, res) => {
    await CustomerController.updateCustomer(req, res);
});

// Delete customer by ID
// Deletes a customer record based on the provided 'customerId' parameter
router.delete('/:customerId', async (req, res) => {
    await CustomerController.deleteCustomer(req, res);
});

export default router;
