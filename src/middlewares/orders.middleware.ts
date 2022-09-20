import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';
import Order from '../interfaces/order.interface';

const schemaOrder = Joi.object({
  productsIds: Joi.array().min(1).required().messages({
    'array.required': '"productsIds" is required',
    'array.min': '"productsIds" must include only numbers',
    'array.base': '"productsIds" must be an array',
  }),
  userId: Joi.number().required(),
});

function validationOrder(req: Request, res: Response, next: NextFunction) {
  const order: Order = req.body;

  const { error } = schemaOrder.validate(order);

  if (error) {
    const { message } = error.details[0];

    if (message.match('is required')) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message });
    }

    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ message });
  }

  next();
}

export default validationOrder;