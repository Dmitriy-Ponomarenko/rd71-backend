// src/controllers/getUserController.ts

import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import { userFindById } from '../services/userFindById.js';
// import { env } from '../utils/env.js'

export const getUserController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { userId } = req.params;
    const user = await userFindById(userId);

    if(!user) {
        return next(createHttpError(404, `User with id ${userId} not found or you do not have acces to it`));
    }

    res.status(200).send({
        status: 200,
        message: `User with id ${userId} found`,
        data: user,
    })
}
