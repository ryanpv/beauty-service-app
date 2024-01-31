import express, { Request, Response } from 'express';
import { login } from '../controllers/login.js';
import { logout } from '../controllers/logout.js';
import { verifyUser } from '../middleware/check-user.js';
import { validateLogin } from '../middleware/validators/validate-login.js';

export const sessionRouter = express.Router();

sessionRouter.route('/')
  .get(verifyUser)
  .post(validateLogin, login)
  .delete(logout)