import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';
import Product from '../interfaces/product.interface';

const schemaProduct = Joi.object({
  name: Joi.string().min(2).required().messages({
    'string.required': '"name" is required',
    'string.min': '"name" length must be at least 3 characters long',
    'string.base': '"name" must be a string',
  }),
  amount: Joi.string().min(2).required().messages({
    'string.required': '"amount" is required',
    'string.min': '"amount" length must be at least 3 characters long',
    'string.base': '"amount" must be a string',
  }),
});

function validationProduct(req: Request, res: Response, next: NextFunction) {
  const product: Product = req.body;

  const { error } = schemaProduct.validate(product);

  if (error) {
    const { message } = error.details[0];

    if (message.match('is required')) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message });
    }

    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ message });
  }

  next();
}

export default validationProduct;