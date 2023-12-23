import express, { Request, Response } from 'express';
import { createUser } from '../controllers/create-user.js';
import { getAllUsers } from '../controllers/get-all-users.js';
import { getUser } from '../controllers/get-user.js';
import { updateUser } from '../controllers/update-user.js';
import { deleteUser } from '../controllers/delete-user.js';
import { addAppointment } from '../controllers/add-appointment.js';
import { getUserAppointments } from '../controllers/get-user-appointments.js';
import { updateAppointment } from '../controllers/update-appointment.js';
import { deleteAppointment } from '../controllers/delete-appointment.js';

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

usersRouter.route('/:userId/appointments/:appointmentId')
  .put(updateAppointment)
  .delete(deleteAppointment);