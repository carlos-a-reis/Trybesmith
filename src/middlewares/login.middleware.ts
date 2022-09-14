import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Login from '../interfaces/login.interface';

const properties = ['username', 'password'];

function validateProperties(login: Login): [boolean, string | null] {
  for (let i = 0; i < properties.length; i += 1) {
    if (!Object.prototype.hasOwnProperty.call(login, properties[i])) {
      return [false, properties[i]];
    }
  }
  return [true, null];
}

function validationLogin(req: Request, res: Response, next: NextFunction) {
  const login: Login = req.body;

  const [valid, property] = validateProperties(login);

  if (!valid) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: `"${property}" is required` });
  }

  next();
}

export default validationLogin;