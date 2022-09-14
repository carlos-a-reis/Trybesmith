import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';
import Login from '../interfaces/login.interface';

const schemaLogin = Joi.object({
  username: Joi.string().min(2).required().messages({
    'string.required': '"username" is required',
  }),
  password: Joi.string().min(2).required().messages({
    'string.required': '"password" is required',
  }),
});

function validationLogin(req: Request, res: Response, next: NextFunction) {
  const login: Login = req.body;

  const { error } = schemaLogin.validate(login);

  if (error) {
    const { message } = error.details[0];

    return res.status(StatusCodes.BAD_REQUEST).json({ message });
  }

  next();
}

export default validationLogin;