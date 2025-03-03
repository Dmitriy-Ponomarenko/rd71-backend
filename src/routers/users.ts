// src/routers/users.ts

import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getUserController } from '../controllers/getUserController.js';

const userRouter = Router();

userRouter.get('/:userId', ctrlWrapper(getUserController));

export default userRouter;
