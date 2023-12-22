import express, { Request, Response } from 'express';
import { createUser } from '../controllers/create-user.js';
import { getAllUsers } from '../controllers/get-all-users.js';
import { getUser } from '../controllers/get-user.js';
import { deleteUser } from '../controllers/delete-user.js';

export const usersRouter = express.Router();

usersRouter.route('/')
  .get(getAllUsers)
  .post(createUser);

usersRouter.route('/:userId')
  .get(getUser)
  .put((req: Request, res: Response) => {
    res.send("PUT single users route")
  })
  .delete(deleteUser);

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
  });