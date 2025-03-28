// src/types/express/index.d.ts
import { IUser } from '../../db/models/user.ts';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
