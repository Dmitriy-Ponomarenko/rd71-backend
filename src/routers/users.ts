// src/routers/users.ts

import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getUserController } from '../controllers/getUserController.js';
import { authenticate } from '../middlewares/authenticate.js'

const userRouter = Router();

userRouter.use(ctrlWrapper(authenticate));

userRouter.get('/:userId', ctrlWrapper(getUserController));

export default userRouter;
