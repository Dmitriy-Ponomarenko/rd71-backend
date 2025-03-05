// src/controllers/authController.ts
import { Request, Response, NextFunction } from 'express';

export const registerUserController = async (
  req: Request,
  res: Response,
): Promise<void> => {};

export const loginUserController = async (
  req: Request,
  res: Response,
): Promise<void> => {};

export const refreshSessionController = async (
  req: Request,
  res: Response,
): Promise<void> => {};

export const getSessionController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {};

export const logoutUserController = async (
  req: Request,
  res: Response,
): Promise<void> => {};
