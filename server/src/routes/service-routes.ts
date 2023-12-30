import express, { Request, Response } from 'express';
import { addService } from '../controllers/add-service.js';
import { getAllServices } from '../controllers/get-all-services.js';
import { getService } from '../controllers/get-service.js';
import { updateService } from '../controllers/update-service.js';
import { deleteService } from '../controllers/delete-service.js';

export const servicesRouter = express.Router();

servicesRouter.route('/')
  .get(getAllServices) // GET list of ALL service categories
  .post(addService); // POST new service - admin route

servicesRouter.route('/:serviceId')
  .get(getService)
  .put(updateService) // admin route
  .delete(deleteService) // admin route