// src/validation/userValidation.ts
import Joi from 'joi';

export const userIdSchema = Joi.object({
  userId: Joi.string().required(),
});

export const userUpdateSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().optional(),
  gender: Joi.string().valid('male', 'female', 'other').optional(),
  avatar: Joi.string().optional(),
  isVerified: Joi.boolean().optional(),
});
