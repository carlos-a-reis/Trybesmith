import { Router } from 'express';
import OrderController from '../controllers/orders.controller';
import authentication from '../middlewares/auth.middleware';
import validationOrder from '../middlewares/orders.middleware';

const router = Router();

const orderController = new OrderController();

router.get('/orders', orderController.getAll);
router.post('/orders', authentication, validationOrder, orderController.create);

export default router;