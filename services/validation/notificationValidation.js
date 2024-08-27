// /src/validation/notificationValidation.js

import Joi from 'joi';

const notificationSchema = Joi.object({
  user: Joi.string().required(),
  type: Joi.string().required(),
  category: Joi.string().required(),
  message: Joi.string().required(),
  link: Joi.string().optional(),
  image: Joi.string().optional(),
  priority: Joi.string().valid('Low', 'Normal', 'High', 'Critical').default('Normal'),
  channels: Joi.array().items(Joi.string().required()).min(1).required(),
  createdAt: Joi.date().default(() => new Date(), 'current date').optional(),
  readAt: Joi.date().optional(),
  read: Joi.boolean().default(false),
  additionalInfo: Joi.object().optional(),
  history: Joi.array().items(Joi.string()).optional(),
  recurrence: Joi.object({
    frequency: Joi.string().valid('Daily', 'Weekly', 'Monthly', 'Yearly').optional(),
    interval: Joi.number().min(1).default(1).optional(),
    endDate: Joi.date().optional(),
  }).optional(),
  scheduledAt: Joi.date().optional(),
  sentAt: Joi.date().optional(),
  status: Joi.string().valid('Pending', 'Sent', 'Failed').default('Pending'),
});

export default notificationSchema;
