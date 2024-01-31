import { body } from 'express-validator';

export const validateAppointmentRequest = [
  body('date').notEmpty().isString().escape().trim(),
  body('time').notEmpty().isString().escape().trim(),
  body('price_paid').isNumeric()
];