import express, { Request, Response } from 'express';
import { addService } from '../controllers/add-service.js';
import { getAllServices } from '../controllers/get-all-services.js';
import { getService } from '../controllers/get-service.js';

export const servicesRouter = express.Router();

servicesRouter.route('/')
  .get(getAllServices) // GET list of ALL service categories
  .post(addService); // POST new servic

servicesRouter.route('/:serviceId')
  .get(getService)
  .put((req: Request, res: Response) => {
    res.send(`PUT route for services success`)
  })
  .delete((req: Request, res: Response) => {
    res.send(`DELETE success for services`)
  })