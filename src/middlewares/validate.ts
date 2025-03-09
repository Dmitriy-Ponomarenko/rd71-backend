// src/middlewares/validate.ts
import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

export const validate = (schema: Schema) =>
  ctrlWrapper(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      await schema.validateAsync(req.body, {
        abortEarly: false,
      });
      next();
    },
  );
