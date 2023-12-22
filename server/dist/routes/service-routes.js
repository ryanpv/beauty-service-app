import express from 'express';
import { addService } from '../controllers/add-service.js';
import { getAllServices } from '../controllers/get-all-services.js';
import { getService } from '../controllers/get-service.js';
import { updateService } from '../controllers/update-service.js';
export const servicesRouter = express.Router();
servicesRouter.route('/')
    .get(getAllServices) // GET list of ALL service categories
    .post(addService); // POST new service
servicesRouter.route('/:serviceId')
    .get(getService)
    .put(updateService)
    .delete((req, res) => {
    res.send(`DELETE success for services`);
});
//# sourceMappingURL=service-routes.js.map