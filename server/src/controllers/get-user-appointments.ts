import { Request, Response } from "express";
import { pool } from "../queries.js";

export const getUserAppointments = (req: Request, res: Response) => {
  const { userId } = req.params;

  pool.query(`
    SELECT appointments.*, status_types.status, service_types.service_name
    FROM appointments
    JOIN status_types
      ON appointments.status = status_types.id
    JOIN appointment_line_items
      ON appointments.id = appointment_line_items.appointments_id
    JOIN service_types
      ON appointment_line_items.service_types_id = service_types.id

    WHERE users_id = $1
  `, [userId], (error, results) => {
    if (error) {
      console.log(`ERROR getting user's appointments: ${ error }`);
      throw error;      
    }
    res.status(200).json(results.rows);
  });
};