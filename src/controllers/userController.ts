// src/controllers/userController.ts
import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import {
  userFindById,
  pumpingWithPatch,
  deleteUser,
} from '../services/userServices.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  userIdSchema,
  userUpdateSchema,
} from '../validation/userValidation.js';

export const getUserController = ctrlWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { error } = userIdSchema.validate(req.params);
    if (error) {
      return next(createHttpError(400, error.details[0].message));
    }

    const { userId } = req.params;
    const user = await userFindById(userId);

    if (!user) {
      return next(
        createHttpError(
          404,
          `User with id ${userId} not found or you do not have access to it`,
        ),
      );
    }

    res.status(200).send({
      status: 200,
      message: `User with id ${userId} found`,
      data: user,
    });
  },
);

export const patchUserController = ctrlWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { error: paramsError } = userIdSchema.validate(req.params);
    if (paramsError) {
      return next(createHttpError(400, paramsError.details[0].message));
    }

    const { error: bodyError } = userUpdateSchema.validate(req.body);
    if (bodyError) {
      return next(createHttpError(400, bodyError.details[0].message));
    }

    const { userId } = req.params;

    if (!req.user || !req.user._id) {
      return next(createHttpError(401, 'Unauthorized'));
    }

    const updatedUser = await pumpingWithPatch(
      userId,
      req.user._id.toString(),
      req.body,
    );

    if (!updatedUser) {
      return next(
        createHttpError(404, 'User not found or you do not have access to it'),
      );
    }
    res.send({
      status: 200,
      message: 'Successfully patched a user!',
      data: updatedUser,
    });
  },
);

export const deleteUserController = ctrlWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { error } = userIdSchema.validate(req.params);
    if (error) {
      return next(createHttpError(400, error.details[0].message));
    }

    const { userId } = req.params;

    if (!req.user || !req.user._id) {
      return next(createHttpError(401, 'Unauthorized'));
    }

    const deletedUser = await deleteUser(userId, req.user._id.toString());

    if (!deletedUser) {
      return next(
        createHttpError(
          404,
          'User not found or you do not have access to this function',
        ),
      );
    }

    res.status(204).send();
  },
);
