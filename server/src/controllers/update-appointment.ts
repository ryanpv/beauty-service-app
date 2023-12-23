// post to appointment_line_items when updating appointments.status to "cancelled"
// add functionality for updating appointments_line_items also in case of mistake
import { Request, Response } from "express";
import { pool } from "../queries.js";

export const updateAppointment = (req: Request, res: Response) => {
  const { userId } = req.params;
  const { users_id, date, time, status } = req.body;

  if (status === 2 || status === 3) {
    pool.query(`
      UPDATE 
    `)
  }
};