import express from 'express';
import { addService } from '../controllers/add-service.js';
export const servicesRouter = express.Router();
servicesRouter.route('/')
    .get() // GET list of ALL service categories
    .post(addService); // POST new servic
servicesRouter.route('/:serviceId')
    .get((req, res) => {
    res.send(`GET route for ${req.params.serviceId}`);
})
    .put((req, res) => {
    res.send(`PUT route for services success`);
})
    .delete((req, res) => {
    res.send(`DELETE success for services`);
});
//# sourceMappingURL=service-routes.js.map