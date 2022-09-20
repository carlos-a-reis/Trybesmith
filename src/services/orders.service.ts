import connection from '../models/connection';
import OrderModel from '../models/orders.model';
import Order from '../interfaces/order.interface';
import NewOrder from '../interfaces/newOrder.interface';

class OrderService {
  public model: OrderModel;

  constructor() {
    this.model = new OrderModel(connection);
  }

  public async getAll(): Promise<Order[]> {
    const result = await this.model.getAll();
    return result;
  }

  public async create(userId: number, productsIds: number[]): Promise<NewOrder> {
    const result = await this.model.create(userId, productsIds);
    return result;
  }
}

export default OrderService;
