import { Request, Response } from "express";
import { pool } from "../queries.js";

export const getAllUsers = (req: Request, res: Response) => {
  pool.query(`
    SELECT name, email, phone_number, role_id
    FROM users
    `, (error, results) => {
      if (error) {
        console.log(`UNSUCCESSFUL GET all users request: ${ error }`)
      }
      res.status(200).json(results.rows);
    });
};

// include aggregation of appointments.status data (ie. # of cancellations)