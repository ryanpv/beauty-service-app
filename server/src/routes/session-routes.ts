import express, { Request, Response } from 'express';
import { login } from '../controllers/login.js';
import { verifyUser } from '../middleware/check-user.js';

export const sessionRouter = express.Router();

sessionRouter.route('/')
  .get(verifyUser)
  .post(login)
  .delete((req: Request, res: Response) => {
    req.session.destroy((error) => {
      if (error) console.log("no sessions");
      res.send(200);
    });

  })