import express from 'express';
export const testRoute = express.Router();
testRoute.route('/').get((req, res) => {
    res.send("updated test route reacehd");
});
//# sourceMappingURL=test-route.js.map