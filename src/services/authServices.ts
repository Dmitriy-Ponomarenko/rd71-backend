// src/services/authServices.ts

import { IUser, UserCollection } from '../db/models/user.js';
import createHttpError from 'http-errors';
import bcrypt from 'bcryptjs';
import { SessionCollection } from '../db/models/session.js';
import { THIRTY_DAYS, FIFTEEN_MINUTES } from '../constants/index.js';
import { randomBytes } from 'crypto';

interface AuthPayload {
  email: string;
  password: string;
}

interface RefreshSessionPayload {
  sessionId: string;
  refreshToken: string;
}

export const registerUser = async (
  payload: AuthPayload,
): Promise<IUser | null> => {
  const user = await UserCollection.findOne({ email: payload.email });
  if (user) throw createHttpError(409, 'Email in use');

  const encryptedPassword = await bcrypt.hash(payload.password, 12);

  const newUser = await UserCollection.create({
    ...payload,
    password: encryptedPassword,
  });

  return newUser;
};

export const loginUser = async (
  payload: AuthPayload,
): Promise<{ newSessionsObject: any; user: IUser }> => {
  const user = await UserCollection.findOne({ email: payload.email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }
  const isEqual = await bcrypt.compare(payload.password, user.password);

  if (!isEqual) {
    throw createHttpError(401, 'Unauthorized');
  }

  await SessionCollection.deleteOne({
    userId: user._id,
  });

  const newSessions = createSession();

  const newSessionsObject = await SessionCollection.create({
    userId: user._id,
    ...newSessions,
  });

  return {
    newSessionsObject,
    user,
  };
};

export const refreshUserSession = async ({
  sessionId,
  refreshToken,
}: RefreshSessionPayload): Promise<any> => {
  const session = await SessionCollection.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const isSessionTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);

  if (isSessionTokenExpired) {
    throw createHttpError(401, 'Session token expired');
  }

  const newSession = createSession();

  await SessionCollection.deleteOne({
    _id: sessionId,
    refreshToken,
  });

  return await SessionCollection.create({
    userId: session.userId,
    ...newSession,
  });
};

export const getSession = async ({
  sessionId,
  refreshToken,
}: RefreshSessionPayload): Promise<any> => {
  const session = await SessionCollection.findOne({
    _id: sessionId,
    refreshToken,
  });
  return session;
};

export const logoutUser = async (sessionId: string): Promise<void> => {
  await SessionCollection.deleteOne({ _id: sessionId });
};

const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
  };
};
