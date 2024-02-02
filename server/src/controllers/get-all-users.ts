import { Request, Response } from "express";
import { pool } from "../queries.js";
import { ModifiedSession } from "./login.js";

export const getAllUsers = (req: Request, res: Response) => {
  const userRole = (req.session as ModifiedSession).userRole;

  if (userRole !== 'admin') {
    res.status(403).json({ message: "Forbidden access." });
  }
  
  pool.query(`
    SELECT name, email, phone_number, role_id
    FROM users
    `, (error, results) => {
      if (error) {
        console.log(`UNSUCCESSFUL GET all users request: ${ error }`)
        res.status(400).json({ message: "Unable to fetch all users' information." });
      }

      res.status(200).json(results.rows);
    });
};

// include aggregation of appointments.status data (ie. # of cancellations)