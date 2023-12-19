import express from 'express';
export const servicesRouter = express.Router();
servicesRouter.route('/')
    .get((req, res) => {
    res.send("GET route for all services");
})
    .post((req, res) => {
    res.send("POST route for all services");
});
servicesRouter.route('/:serviceId')
    .get((req, res) => {
    res.send(`GET route for ${req.params.serviceId}`);
})
    .put((req, res) => {
    res.send(`PUT route for services success`);
})
    .delete((req, res) => {
    res.send(`DELETE success for services`);
});
//# sourceMappingURL=service-routes.js.map