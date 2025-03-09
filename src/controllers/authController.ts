// src/controllers/authController.ts
import { Request, Response, NextFunction } from 'express';
import {
  loginUser,
  logoutUser,
  refreshUserSession,
  registerUser,
} from '../services/authServices.js';
import { FIFTEEN_MINUTES, THIRTY_DAYS } from '../constants/index.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

interface Session {
  accessToken: string;
  refreshToken: string;
  _id: string;
}

export const registerUserController = ctrlWrapper(
  async (req: Request, res: Response): Promise<void> => {
    const user = await registerUser(req.body);
    const { newSessionsObject } = await loginUser(req.body);
    setupSession(res, newSessionsObject);

    res.status(201).json({
      status: 201,
      message: 'Successfully registered a user! Please verify your email!',
      data: {
        user,
        accessToken: newSessionsObject.accessToken,
        sessionId: newSessionsObject._id,
      },
    });
  },
);

export const loginUserController = ctrlWrapper(
  async (req: Request, res: Response): Promise<void> => {
    const { newSessionsObject, user } = await loginUser(req.body);
    setupSession(res, newSessionsObject);

    res.json({
      status: 200,
      message: 'Successfully logged in a user!',
      data: {
        user,
        accessToken: newSessionsObject.accessToken,
        sessionId: newSessionsObject._id,
      },
    });
  },
);

export const refreshSessionController = ctrlWrapper(
  async (req: Request, res: Response): Promise<void> => {
    const { sessionId, refreshToken } = req.cookies;
    const newSession = await refreshUserSession({ sessionId, refreshToken });
    setupSession(res, newSession);

    res.json({
      status: 200,
      message: 'Session refreshed successfully!',
      data: {
        accessToken: newSession.accessToken,
        sessionId: newSession._id,
      },
    });
  },
);

export const getSessionController = ctrlWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Implement the logic for getting the session
  },
);

export const logoutUserController = ctrlWrapper(
  async (req: Request, res: Response): Promise<void> => {
    const { sessionId } = req.cookies;
    await logoutUser(sessionId);

    res.clearCookie('refreshToken', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    res.clearCookie('sessionId', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });

    res.status(200).json({
      status: 200,
      message: 'Successfully logged out!',
    });
  },
);

const setupSession = (res: Response, session: Session): void => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    expires: new Date(Date.now() + FIFTEEN_MINUTES),
  });
};
