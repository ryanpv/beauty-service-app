import express from 'express';
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
    .put((req, res) => {
    res.send("PUT single users route");
})
    .delete(deleteUser);
usersRouter.route('/:userId/appointments')
    .get((req, res) => {
    res.send("GET users appointments route. Appointments for: " + req.params.userId);
})
    .post((req, res) => {
    res.send("POST users appointment route");
})
    .put((req, res) => {
    res.send("PUT users appointments route");
})
    .delete((req, res) => {
    res.send("DELETE users appointments route");
});
//# sourceMappingURL=users-routers.js.map