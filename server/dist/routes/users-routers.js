import express from 'express';
export const usersRouter = express.Router();
usersRouter.route('/')
    .get((req, res) => {
    res.send("GET all users route");
})
    .post((req, res) => {
    res.send("POST user account");
});
usersRouter.route('/:userId')
    .get((req, res) => {
    res.send("GET single users route:" + req.params.userId);
})
    .put((req, res) => {
    res.send("PUT single users route");
})
    .delete((req, res) => {
    res.send("DELETE single users route");
});
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