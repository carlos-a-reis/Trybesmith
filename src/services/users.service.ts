import connection from '../models/connection';
import UserModel from '../models/users.model';
import User from '../interfaces/user.interface';
import Token from '../interfaces/token.interface';

class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  public async create(user: User): Promise<Token> {
    const result = await this.model.create(user);
    return result;
  }
}

export default UserService;