import express from 'express';
import { addService } from '../controllers/add-service.js';
import { getAllServices } from '../controllers/get-all-services.js';
import { getService } from '../controllers/get-service.js';
import { updateService } from '../controllers/update-service.js';
import { deleteService } from '../controllers/delete-service.js';
import routeCache from '../middleware/route-cache.js';
import { validateServiceForms } from '../middleware/validators/validate-new-service.js';
import { verifyUser } from '../middleware/check-user.js';
export const servicesRouter = express.Router();
servicesRouter.route('/')
    .get(routeCache(3600), getAllServices) // GET list of ALL service categories
    .post(validateServiceForms, verifyUser, addService); // POST new service - admin route
servicesRouter.route('/:serviceId')
    .get(verifyUser, getService)
    .put(verifyUser, validateServiceForms, updateService) // admin route
    .delete(verifyUser, deleteService); // admin route
//# sourceMappingURL=service-routes.js.map