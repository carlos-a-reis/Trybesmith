import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserService from '../services/users.service';

class UserController {
  constructor(private userService = new UserService()) { }

  public create = async (req: Request, res: Response) => {
    const user = req.body;
    
    const userCreated = await this.userService.create(user);

    res.status(StatusCodes.CREATED).json(userCreated);
  };

  public login = async (req: Request, res: Response) => {
    const login = req.body;

    const loginCompleted = await this.userService.login(login);

    if (!loginCompleted) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Username or password invalid' });
    }

    res.status(StatusCodes.OK).json(loginCompleted);
  };
}

export default UserController;