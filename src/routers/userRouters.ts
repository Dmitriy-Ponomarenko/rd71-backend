// src/routers/users.ts
import { Router } from 'express';
import {
  getUserController,
  patchUserController,
  deleteUserController,
} from '../controllers/userController.js';
import { authenticate } from '../middlewares/authenticate.js';
import { isValidId } from '../middlewares/isValidId.js';

const userRouter = Router();

userRouter.use(authenticate);

userRouter.get('/:userId', isValidId, getUserController);

userRouter.patch('/:userId', isValidId, patchUserController);

userRouter.delete('/:userId', isValidId, deleteUserController);

export default userRouter;
