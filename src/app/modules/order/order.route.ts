import { Router } from 'express';
import { orderController } from './order.controller';

const orderRouter = Router();

orderRouter.post('/', orderController.createOrder);
orderRouter.get('/', orderController.getAllOrder);
orderRouter.get('/:orderId', orderController.getAOrder);
orderRouter.patch('/:orderId', orderController.updateAOrder);
orderRouter.get('/revenue', orderController.calculateRevenue);

export default orderRouter;
