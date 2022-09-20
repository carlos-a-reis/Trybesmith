import { Pool, ResultSetHeader } from 'mysql2/promise';
import Order from '../interfaces/order.interface';
import NewOrder from '../interfaces/newOrder.interface';

class OrderModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<Order[]> {
    const result = await this.connection.execute(
      `SELECT o.*, JSON_ARRAYAGG(p.id) AS productsIds
      FROM Trybesmith.Orders AS o
      INNER JOIN Trybesmith.Products AS p
      ON o.id = p.orderId
      GROUP BY o.id
      ORDER BY o.userId;`,
    );
    
    const [rows] = result;
    return rows as Order[]; 
  }

  public async create(userId: number, productsIds: number[]): Promise<NewOrder> {
    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Orders (userId) VALUES (?)',
      [userId],
    );
    
    const [dataInserted] = result;
    const { insertId } = dataInserted;

    await this.connection.query(
      `UPDATE Trybesmith.Products
        SET orderId = ?
        WHERE id IN (?);`,
      [insertId, productsIds],
    );
    
    return { userId, productsIds };
  }
}

export default OrderModel;