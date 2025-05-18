// src/services/customerService.js

import axios from "./api";

const apiUrl = "/api/customers";

// Fetch all customers
export const getCustomers = async () => {
  return await axios.get(apiUrl);
};

// Create a new customer
export const createCustomer = async (customerData) => {
  return await axios.post(apiUrl, customerData);
};

// Update an existing customer
export const updateCustomer = async (customerId, customerData) => {
  return await axios.put(`${apiUrl}/${customerId}`, customerData);
};

// Delete a customer
export const deleteCustomer = async (customerId) => {
  return await axios.delete(`${apiUrl}/${customerId}`);
};
