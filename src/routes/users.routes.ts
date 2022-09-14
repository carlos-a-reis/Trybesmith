import { Router } from 'express';
import UserController from '../controllers/users.controller';
import validationLogin from '../middlewares/login.middleware';

const router = Router();

const userController = new UserController();

router.post('/users', userController.create);
router.post('/login', validationLogin, userController.login);

export default router;