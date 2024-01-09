import { Request, Response } from "express";
import { pool } from "../queries.js";

export const getSingleAppointment = async(req: Request, res: Response) => {
  const { userId, appointmentId } = req.params;

  const getUserAppointment = await pool.query(`
    SELECT appointments.*, status_types.status, service_types.service_name, users.email, users.name
    FROM appointments
    JOIN status_types
      ON appointments.status = status_types.id
    JOIN appointment_line_items
      ON appointments.id = appointment_line_items.appointments_id
    JOIN service_types
      ON appointment_line_items.service_types_id = service_types.id
    JOIN users
      ON appointments.users_id = users.id
    WHERE appointments.users_id = $1
      AND appointments.id = $2
  `, [userId, appointmentId]);

  const userAppointment = await getUserAppointment;

  res.status(200).send(userAppointment.rows)
};
