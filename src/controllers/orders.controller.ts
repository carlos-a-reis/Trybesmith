import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import OrderService from '../services/orders.service';

class OrderController {
  constructor(private orderService = new OrderService()) { }

  public getAll = async (req: Request, res: Response) => {
    const orders = await this.orderService.getAll();

    res.status(StatusCodes.OK).json(orders);
  };

  public create = async (req: Request, res: Response) => {
    const { productsIds, userId } = req.body;
    
    const orderCreated = await this.orderService.create(userId, productsIds);
    
    res.status(StatusCodes.CREATED).json(orderCreated);
  };
}

export default OrderController;