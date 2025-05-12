import express from 'express';
import * as orderItemController from '../controllers/orderItemController.js';

const router = express.Router();

router.post('/', orderItemController.addOrderItem);
router.get('/order/:orderId', orderItemController.getOrderItemsByOrderId);
router.put('/:orderItemId', orderItemController.updateOrderItem);
router.delete('/:orderItemId', orderItemController.deleteOrderItem);

export default router;
