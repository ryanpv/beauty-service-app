import { Request, Response } from "express";
import { pool } from "../queries.js";

export const getUserAppointments = (req: Request, res: Response) => {
  const { userId } = req.params;

  pool.query(`
    SELECT * FROM appointments
    WHERE users_id = $1
  `, [userId], (error, results) => {
    if (error) {
      console.log(`ERROR getting user's appointments: ${ error }`);
      throw error;      
    }
    res.status(200).json(results.rows);
  });
};