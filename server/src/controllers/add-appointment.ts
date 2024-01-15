import { Request, Response } from 'express';
import { pool } from '../queries.js';
import { ModifiedSession } from './login.js';
import { transporter } from '../nodemailer-transporter.js';

export const addAppointment = async(req: Request, res: Response) => {
  try {
    const { date, time, price_paid } = req.body;
    const { userSessionId } = req.params;
    const userId = req.sessionID === userSessionId && (req.session as ModifiedSession).userId;
    const serviceId = JSON.parse(req.body.id).id;
    const status = 2; // default status for "requested" - admin to UPDATE to 1 ("upcoming") upon approval;
    const userEmail = (req.session as ModifiedSession).userEmail;
  
    // const requestDate = new Date(date);
    // const formattedDate = requestDate.toLocaleDateString('default', { month: '2-digit', day: '2-digit', year: 'numeric' });
  
    await pool.query(`
      CREATE OR REPLACE FUNCTION add_appointment(
        userId INT, 
        dates DATE, 
        times TIME, 
        serviceId INT, 
        price_paid INT, 
        status INT
        )
      RETURNS INT
      LANGUAGE plpgsql
      AS
      $BODY$
      DECLARE
        new_appointments_id INT;
        line_item_id INT;
      BEGIN
        INSERT INTO appointments (users_id, date, time, status)
        VALUES ($1, $2, $3, $6)
        RETURNING id INTO new_appointments_id;
  
        RAISE NOTICE 'Appointment inserted successfully with ID: %', new_appointments_id;
  
        INSERT INTO appointment_line_items (appointments_id, service_types_id, price_paid)
        VALUES (new_appointments_id, $4, $5)
        RETURNING id INTO line_item_id;
  
        RAISE NOTICE 'Appointment line item successfully inserted with ID: %', line_item_id;
  
        RETURN new_appointments_id;
  
        EXCEPTION WHEN OTHERS THEN
          RAISE NOTICE 'Error: %', SQLERRM;
          RETURN -1;
      END;
      $BODY$
    `, []);
    
    const appointmentRequest = await pool.query(`
      SELECT * FROM add_appointment($1, $2, $3, $4, $5, $6);
    `,[userId, date, time, serviceId, price_paid, status]);

    if (!isNaN(appointmentRequest.rows[0].add_appointment)) {
      const emailMsg = {
        from: "PBC",
        to: userEmail,
        subject: `Appointment request received`,
        text: `Your appointment request has been received for "${ JSON.parse(req.body.id).service_name }" at ${ time } on ${ date }. 
        Please allow up to 24 hours for a response. Thank you for booking with me.`
      };
      console.log("number")
      await transporter.sendMail(emailMsg);

      res.status(200).json({ message: "Appointment request sent" });
    } else {
      throw new Error("Unable to add appointment.")
    }
  } catch (error) {
    console.log("Error adding appointment", error);
    res.status(400).json({ message: "Error adding appointment" });
  }
};