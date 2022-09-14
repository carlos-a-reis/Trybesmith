import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import jwt from 'jsonwebtoken';
import User from '../interfaces/user.interface';
import Login from '../interfaces/login.interface';
import Token from '../interfaces/token.interface';

const secret = 'secretKey';

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

    const token = jwt.sign({ id: insertId, username }, secret, { expiresIn: '1D' });
  
    return { token };
  }

  public async login(login: Login): Promise<Token | null> {
    const { username, password } = login;
    const result = await this.connection.execute(
      `SELECT * FROM Trybesmith.Users
      WHERE username = ? AND password = ?;`,
      [username, password],
    );

    const [row] = result;

    if (!(row as RowDataPacket[])[0]) return null;

    const { id } = (row as RowDataPacket[])[0];

    const token = jwt.sign({ id, username }, secret, { expiresIn: '1D' });
    return { token };
  }
}

export default UserModel;