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
import { getSingleAppointment } from '../controllers/get-single-appointment.js';
// VALIDATORS
import { validateSignup } from '../middleware/validators/validate-signup.js';
import { validateAppointmentRequest } from '../middleware/validators/validate-appointment-request.js';
import { validateAppointmentUpdate } from '../middleware/validators/validate-appointment-update.js';
export const usersRouter = express.Router();
usersRouter.route('/')
    .get(getAllUsers) // Should be admin only route
    .post(validateSignup, createUser);
usersRouter.route('/:userId')
    .get(verifyUser, getUser)
    .put(verifyUser, updateUser)
    .delete(verifyUser, deleteUser);
usersRouter.route('/:userSessionId/appointments')
    // .get(getUserAppointments)
    .get(verifyUser, getUserAppointments)
    .post(verifyUser, validateAppointmentRequest, addAppointment);
usersRouter.route('/:userSessionId/appointments/:appointmentId')
    .get(getSingleAppointment)
    .put(validateAppointmentUpdate, updateAppointment)
    .delete(verifyUser, deleteAppointment);
//# sourceMappingURL=users-routes.js.map