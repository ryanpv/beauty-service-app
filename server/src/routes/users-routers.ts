import express, { Request, Response } from 'express';
import { createUser } from '../controllers/create-user.js';
import { getAllUsers } from '../controllers/get-all-users.js';
import { getUser } from '../controllers/get-user.js';
import { updateUser } from '../controllers/update-user.js';
import { deleteUser } from '../controllers/delete-user.js';
import { addAppointment } from '../controllers/add-appointment.js';
import { getUserAppointments } from '../controllers/get-user-appointments.js';

export const usersRouter = express.Router();

usersRouter.route('/')
  .get(getAllUsers)
  .post(createUser);

usersRouter.route('/:userId')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

usersRouter.route('/:userId/appointments')
  .get(getUserAppointments)
  .post(addAppointment)
  .put((req: Request, res: Response) => {
    res.send("PUT users appointments route")
  })
  .delete((req: Request, res: Response) => {
    res.send("DELETE users appointments route")
  });