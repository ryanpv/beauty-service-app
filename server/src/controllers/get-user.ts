import { Request, Response } from "express";
import { pool } from "../queries.js";

export const getUser = (req: Request, res: Response) => {
  const { userId } = req.params;

  pool.query(`
  SELECT * FROM users
  WHERE id = $1`, [userId], (error, results) => {
    if (error) {
      console.log(`FAILED to GET user with id: ${ userId }`)
    }
    res.status(200).json(results.rows);
  });
};