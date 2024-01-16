import { Request, Response } from "express";
import { pool } from "../queries.js";
import { ModifiedSession } from "./login.js";

export const getSingleAppointment = async(req: Request, res: Response) => {
  try {
    const { appointmentId } = req.params;
    const userId = req.cookies.user === req.sessionID && (req.session as ModifiedSession).userId;
    const admin = true;

    if (admin) {
      const getUserAppointment = await pool.query(`
      SELECT 
        appointments.id, 
        appointments.status, 
        appointments.time,
        appointments.date,
        status_types.status, 
        service_types.service_name, 
        users.email, 
        appointment_line_items.price_paid, 
        users.name
      FROM appointments
      JOIN status_types
        ON appointments.status = status_types.id
      JOIN appointment_line_items
        ON appointments.id = appointment_line_items.appointments_id
      JOIN service_types
        ON appointment_line_items.service_types_id = service_types.id
      JOIN users
        ON appointments.users_id = users.id
      WHERE appointments.id = $1
    `, [appointmentId]);
  
    const userAppointment = await getUserAppointment;

    res.status(200).send(userAppointment.rows);
    } else {
      const getUserAppointment = await pool.query(`
        SELECT 
          appointments.id, 
          appointments.status, 
          appointments.time,
          appointments.date,
          status_types.status, 
          service_types.service_name, 
          users.email, 
          appointment_line_items.price_paid, 
          users.name
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
    console.log(userAppointment.rows)
      res.status(200).send(userAppointment.rows)
    }
  } catch (error) {
    console.log("Error fetching appointment: ", error);
    res.status(400).json({ message: "Error fetching users appointment." });
  }
};
