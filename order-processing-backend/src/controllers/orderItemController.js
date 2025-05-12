import * as OrderItemModel from '../models/OrderItem.js';

// Add order item
export const addOrderItem = async (req, res) => {
    const { orderId, productId, quantity } = req.body;
    try {
        if (!orderId || !productId || !quantity) {
            return res.status(400).json({ message: 'orderId, productId, and quantity are required' });
        }

        const result = await OrderItemModel.addOrderItem(orderId, productId, quantity);

        // ✅ Update order total after adding item
        await OrderItemModel.updateOrderTotal(orderId);

        res.status(201).json({ message: 'Order item added successfully', result });
    } catch (error) {
        res.status(500).json({ message: 'Error adding order item', error: error.message });
    }
};

// Get order items by order ID
export const getOrderItemsByOrderId = async (req, res) => {
    const { orderId } = req.params;
    try {
        const items = await OrderItemModel.getOrderItemsByOrderId(orderId);
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving order items', error: error.message });
    }
};

// Update order item quantity
export const updateOrderItem = async (req, res) => {
    const { orderItemId } = req.params;
    const { quantity } = req.body;
    try {
        if (!quantity) {
            return res.status(400).json({ message: 'Quantity is required' });
        }

        const result = await OrderItemModel.updateOrderItem(orderItemId, quantity);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Order item not found' });
        }

        // ✅ Get order_id to update order total
        const orderItem = await OrderItemModel.getOrderItemById(orderItemId);
        await OrderItemModel.updateOrderTotal(orderItem.order_id);

        res.status(200).json({ message: 'Order item updated successfully', result });
    } catch (error) {
        res.status(500).json({ message: 'Error updating order item', error: error.message });
    }
};

// Delete order item
export const deleteOrderItem = async (req, res) => {
    const { orderItemId } = req.params;
    try {
        // ✅ Get order_id before deleting
        const orderItem = await OrderItemModel.getOrderItemById(orderItemId);

        if (!orderItem) {
            return res.status(404).json({ message: 'Order item not found' });
        }

        // Delete the item
        const result = await OrderItemModel.deleteOrderItem(orderItemId);

        // ✅ Update order total after deletion
        await OrderItemModel.updateOrderTotal(orderItem.order_id);

        res.status(200).json({ message: 'Order item deleted successfully', result });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting order item', error: error.message });
    }
};
