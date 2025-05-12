import * as CustomerModel from '../models/Customer.js';

// Create a new customer
export const createCustomer = async (req, res) => {
    const { name, email, phone } = req.body;
    try {
        if (!name || !email || !phone) {
            return res.status(400).json({ message: 'Customer name, email, and phone are required' });
        }
        const result = await CustomerModel.createCustomer(name, email, phone);
        res.status(201).json({ message: 'Customer created successfully', result });
    } catch (error) {
        res.status(500).json({ message: 'Error creating customer', error: error.message });
    }
};

// Get customer by email
export const getCustomerByEmail = async (req, res) => {
    const { email } = req.params;
    try {
        const customer = await CustomerModel.getCustomerByEmail(email);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving customer', error: error.message });
    }
};

// Update customer details
export const updateCustomer = async (req, res) => {
    const { customerId } = req.params;
    const { name, email, phone } = req.body;
    try {
        if (!name || !email || !phone) {
            return res.status(400).json({ message: 'Customer name, email, and phone are required' });
        }
        const result = await CustomerModel.updateCustomer(customerId, name, email, phone);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json({ message: 'Customer updated successfully', result });
    } catch (error) {
        res.status(500).json({ message: 'Error updating customer', error: error.message });
    }
};

// Delete customer by ID
export const deleteCustomer = async (req, res) => {
    const { customerId } = req.params;
    try {
        const result = await CustomerModel.deleteCustomer(customerId);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json({ message: 'Customer deleted successfully', result });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting customer', error: error.message });
    }
};
