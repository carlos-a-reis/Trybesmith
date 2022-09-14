import { Router } from 'express';
import ProductController from '../controllers/products.controller';
import validationProduct from '../middlewares/products.middleware';

const router = Router();

const productController = new ProductController();

router.get('/products', productController.getAll);
router.post('/products', validationProduct, productController.create);

export default router;