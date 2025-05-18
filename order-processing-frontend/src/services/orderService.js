// src/services/orderService.js

import axios from "./api";

const apiUrl = "/api/orders";

// Fetch all orders
export const getOrders = async () => {
  return await axios.get(apiUrl);
};

// Fetch a specific order's details
export const getOrderDetails = async (orderId) => {
  return await axios.get(`${apiUrl}/${orderId}`);
};

// Create a new order
export const createOrder = async (orderData) => {
  return await axios.post(apiUrl, orderData);
};

// Delete an order
export const deleteOrder = async (orderId) => {
  return await axios.delete(`${apiUrl}/${orderId}`);
};
