import Joi from 'joi';

import { environments, timezones } from '../utils';

type InferType<T> = T extends Joi.ObjectSchema ? Joi.Schema<T> : never;

export const LoginFormSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(8).required(),
});

export const VerifyLoginFormSchema = Joi.object({
  email: Joi.string().required(),
  otp: Joi.string().min(6).max(6).required(),
});

export type LoginFormProps = InferType<typeof LoginFormSchema>;
export type VerifyLoginFormProps = InferType<typeof VerifyLoginFormSchema>;
