import { Router } from 'express';
import userRouter from './users.js';

const routers = Router();

routers.use('/users', userRouter);

export default routers;
