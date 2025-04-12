import Joi from 'joi';
import { NotificationType } from '../utils'; // adjust path as needed

type InferType<T> = T extends Joi.ObjectSchema ? Joi.Schema<T> : never;

export const ComposeEmailSchema = Joi.object({
  title: Joi.string().required(),
  message: Joi.string().required(),
  type: Joi.string()
    .valid(...Object.values(NotificationType))
    .required(),
  is_scheduled: Joi.boolean().required(),
  recipients: Joi.array()
    .items(Joi.string().uuid({ version: 'uuidv4' }))
    .min(1)
    .required(),
});

export type ComposeEmailFormProps = InferType<typeof ComposeEmailSchema>;
