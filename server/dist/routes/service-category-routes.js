import express from 'express';
import { getServiceCategories } from '../controllers/get-services-categories.js';
export const serviceCategoryRouter = express.Router();
serviceCategoryRouter.route('/')
    .get(getServiceCategories)
    .post();
//# sourceMappingURL=service-category-routes.js.map