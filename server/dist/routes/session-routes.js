import express from 'express';
import { login } from '../controllers/login.js';
import { logout } from '../controllers/logout.js';
import { verifyUser } from '../middleware/check-user.js';
export const sessionRouter = express.Router();
sessionRouter.route('/')
    .get(verifyUser)
    .post(login)
    .delete(logout);
//# sourceMappingURL=session-routes.js.map