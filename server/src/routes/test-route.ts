import express, { Request, Response } from 'express';

export const testRoute = express.Router();

testRoute.route('/').get((req: Request, res: Response) => {
  res.send("updated test route reacehd")
})