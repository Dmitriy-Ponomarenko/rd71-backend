// src/routers/authRouters.ts
import { Router } from 'express';
import {
  registerUserController,
  loginUserController,
  refreshSessionController,
  getSessionController,
  logoutUserController,
} from '../controllers/authController.js';

const authRouter = Router();

authRouter.post('/register', registerUserController);

authRouter.post('/login', loginUserController);

authRouter.post('/refresh', refreshSessionController);

authRouter.get('/session', getSessionController);

authRouter.post('/logout', logoutUserController);

export default authRouter;
