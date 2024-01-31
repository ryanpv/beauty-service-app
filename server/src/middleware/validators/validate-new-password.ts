import { body, param } from 'express-validator';

export const validateNewPassword = [
  param('token').notEmpty().escape(),
  body('newPassword').isLength({ min: 8 }).notEmpty().escape()
];