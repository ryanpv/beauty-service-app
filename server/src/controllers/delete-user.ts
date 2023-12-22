import { Request, Response } from "express";
import { pool } from "../queries.js";

export const deleteUser = (req: Request, res: Response) => {
  const { userId } = req.params;

  pool.query(`
    DELETE FROM users
    WHERE id = $1
  `, [userId], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(`Deleted user with id: ${ userId }`)
  }); 
};