import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';
import User from '../interfaces/user.interface';

const schemaUser = Joi.object({
  username: Joi.string().min(3).required().messages({
    'string.required': '"username" is required',
    'string.min': '"username" length must be at least 3 characters long',
    'string.base': '"username" must be a string',
  }),
  classe: Joi.string().min(3).required().messages({
    'string.required': '"classe" is required',
    'string.min': '"classe" length must be at least 3 characters long',
    'string.base': '"classe" must be a string',
  }),
  level: Joi.number().min(1).required().messages({
    'number.required': '"level" is required',
    'number.min': '"level" must be greater than or equal to 1',
    'number.base': '"level" must be a number',
  }),
  password: Joi.string().min(8).required().messages({
    'string.required': '"password" is required',
    'string.min': '"password" length must be at least 8 characters long',
    'string.base': '"password" must be a string',
  }),
});

function validationUser(req: Request, res: Response, next: NextFunction) {
  const user: User = req.body;

  const { error } = schemaUser.validate(user);

  if (error) {
    const { message } = error.details[0];

    if (message.match('is required')) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message });
    }

    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ message });
  }

  next();
}

export default validationUser;