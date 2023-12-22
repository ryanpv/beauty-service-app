import express, { Request, Response } from 'express';
import { addService } from '../controllers/add-service.js';

export const servicesRouter = express.Router();

servicesRouter.route('/')
  .get() // GET list of ALL service categories
  .post(addService); // POST new servic

servicesRouter.route('/:serviceId')
  .get((req: Request, res: Response) => {
    res.send(`GET route for ${ req.params.serviceId }`)
  })
  .put((req: Request, res: Response) => {
    res.send(`PUT route for services success`)
  })
  .delete((req: Request, res: Response) => {
    res.send(`DELETE success for services`)
  })