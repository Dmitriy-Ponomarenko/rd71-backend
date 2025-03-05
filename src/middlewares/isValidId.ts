// src/middlewares/isValidId.js
import { Request, Response, NextFunction } from 'express';
import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidId = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  const { userId } = req.params;

  if (!isValidObjectId(userId)) {
    throw createHttpError(400, 'Bad Request (Invalid Id)');
  }

  next();
};
