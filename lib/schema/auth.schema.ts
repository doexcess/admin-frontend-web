import Joi from 'joi';

import { environments, timezones } from '../utils';

type InferType<T> = T extends Joi.ObjectSchema ? Joi.Schema<T> : never;

export const LoginFormSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(8).required(),
  environment: Joi.string()
    .valid(...environments)
    .required(),
  timezone: Joi.string()
    .valid(...timezones)
    .required(),
});

export type LoginFormProps = InferType<typeof LoginFormSchema>;
