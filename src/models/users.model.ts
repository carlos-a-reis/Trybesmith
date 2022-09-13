import { Pool, ResultSetHeader } from 'mysql2/promise';
import jwt from 'jsonwebtoken';
import User from '../interfaces/user.interface';
import Token from '../interfaces/token.interface';

class UserModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async create(user: User): Promise<Token> {
    const { username, classe, level, password } = user;
    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?, ?, ?, ?)',
      [username, classe, level, password],
    );

    const [dataInserted] = result;
    const { insertId } = dataInserted;

    const token = jwt.sign({ id: insertId, username }, 'secret', { expiresIn: '1D' });
  
    return { token };
  }
}

export default UserModel;