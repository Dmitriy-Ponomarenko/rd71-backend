// src/services/userService.ts

import { UserCollection } from '../db/models/user.js';
import { IUser } from '../db/models/user.js';

export const userFindById = async (id: string): Promise<IUser | null> => {
    return UserCollection.findOne({ _id: id });
}
