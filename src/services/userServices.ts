// src/services/userService.ts
import { UserCollection } from '../db/models/user.js';
import { IUser } from '../db/models/user.js';

export const userFindById = async (id: string): Promise<IUser | null> => {
  return UserCollection.findOne({ _id: id });
};

export const pumpingWithPatch = async (
  id: string,
  userId: string,
  payload: Partial<IUser>,
  options: { new: boolean } = { new: true },
): Promise<IUser | null> => {
  return UserCollection.findByIdAndUpdate(
    { _id: id, userId },
    { ...payload },
    options,
  );
};

export const deleteUser = async (
  userId: string,
  id: string,
): Promise<IUser | null> => {
  return UserCollection.findOneAndDelete({ _id: id, userId });
};
