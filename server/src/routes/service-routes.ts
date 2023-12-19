import express, { Request, Response } from 'express';

export const servicesRouter = express.Router();

servicesRouter.route('/')
  .get((req: Request, res: Response) => {
    res.send("GET route for all services")
  })
  .post((req: Request, res: Response) => {
    res.send("POST route for all services")
  });

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