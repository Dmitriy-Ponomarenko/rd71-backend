// src/validation/authValidation.ts
import Joi from 'joi';

export const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  gender: Joi.string().valid('male', 'female', 'other').optional(),
  avatar: Joi.string().optional(),
  isVerified: Joi.boolean().optional(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const refreshSessionSchema = Joi.object({
  sessionId: Joi.string().required(),
  refreshToken: Joi.string().required(),
});
