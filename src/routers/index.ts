// src/routers/index.ts
import { Router } from 'express';
import userRouter from './userRouters.js';
import authRouter from './authRouters.js'

const routers = Router();

routers.use('/users', userRouter);
routers.use('/auth', authRouter);

export default routers;
