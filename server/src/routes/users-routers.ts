import express, { Request, Response } from 'express';

export const usersRouter = express.Router();

usersRouter.route('/')
  .get((req: Request, res: Response) => {
    res.send("GET all users route")
  })
  .post((req: Request, res: Response) => {
    res.send("POST user account")
  });

usersRouter.route('/:userId')
  .get((req: Request, res: Response) => {
    res.send("GET single users route:" + req.params.userId)
  })
  .put((req: Request, res: Response) => {
    res.send("PUT single users route")
  })
  .delete((req: Request, res: Response) => {
    res.send("DELETE single users route")
  });

  usersRouter.route('/:userId/appointments')
  .get((req: Request, res: Response) => {
    res.send("GET users appointments route. Appointments for: " + req.params.userId)
  })
  .post((req: Request, res: Response) => {
    res.send("POST users appointment route")
  })
  .put((req: Request, res: Response) => {
    res.send("PUT users appointments route")
  })
  .delete((req: Request, res: Response) => {
    res.send("DELETE users appointments route")
  })