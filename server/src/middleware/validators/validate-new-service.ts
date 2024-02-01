import { body } from 'express-validator';

export const validateServiceForms = [
  body('service_name').notEmpty().isString().escape().trim(),
  body('duration').isNumeric().notEmpty(),
  body('price').notEmpty().escape().trim(),
  body('description').isString().escape().trim(),
  body('service_categories_id').isNumeric().notEmpty()
];