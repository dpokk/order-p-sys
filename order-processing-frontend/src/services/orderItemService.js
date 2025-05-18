// src/services/orderItemService.js

import axios from "./api";

const apiUrl = "/api/order-items";

// Fetch all order items for a specific order
export const getOrderItems = async (orderId) => {
  return await axios.get(`${apiUrl}/order/${orderId}`);
};

// Add an item to an order
export const addOrderItem = async (orderId, orderItemData) => {
  return await axios.post(`${apiUrl}/order/${orderId}`, orderItemData);
};

// Delete an order item
export const deleteOrderItem = async (orderItemId) => {
  return await axios.delete(`${apiUrl}/${orderItemId}`);
};
