import express from 'express';
import { getCategory } from '../controllers/get-category.js';
import { getServiceCategories } from '../controllers/get-services-categories.js';

export const serviceCategoryRouter = express.Router();

serviceCategoryRouter.route('/')
  .get(getServiceCategories)
  .post()

serviceCategoryRouter.route('/:categoryId')
  .get(getCategory)