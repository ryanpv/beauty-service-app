import express from 'express';
import { createUser } from '../controllers/create-user.js';
import { getAllUsers } from '../controllers/get-all-users.js';
import { getUser } from '../controllers/get-user.js';
import { updateUser } from '../controllers/update-user.js';
import { deleteUser } from '../controllers/delete-user.js';
import { addAppointment } from '../controllers/add-appointment.js';
import { getUserAppointments } from '../controllers/get-user-appointments.js';
import { updateAppointment } from '../controllers/update-appointment.js';
import { deleteAppointment } from '../controllers/delete-appointment.js';
import { verifyUser } from '../middleware/check-user.js';
export const usersRouter = express.Router();
usersRouter.route('/')
    .get(getAllUsers) // Should be admin only route
    .post(createUser);
usersRouter.route('/:userId')
    .get(verifyUser, getUser)
    .put(verifyUser, updateUser)
    .delete(verifyUser, deleteUser);
usersRouter.route('/:userId/appointments')
    .get(verifyUser, getUserAppointments)
    .post(verifyUser, addAppointment);
usersRouter.route('/:userId/appointments/:appointmentId')
    .put(verifyUser, updateAppointment)
    .delete(verifyUser, deleteAppointment);
//# sourceMappingURL=users-routes.js.map