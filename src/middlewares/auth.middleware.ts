import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';

const secret = 'secretKey';

function authentication(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
 
  if (!authorization) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token not found' });
  }

  try {
    const dataToken = jwt.verify(authorization, secret) as JwtPayload;
    const { id } = dataToken;
    
    req.body.userId = id;
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid token' });
  }

  next();
}

export default authentication;