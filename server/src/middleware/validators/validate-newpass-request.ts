import { body } from 'express-validator';

export const validateNewpassRequest = [
  body('email').isEmail().trim()
];