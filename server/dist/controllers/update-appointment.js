import { pool } from "../queries.js";
import { validationResult } from "express-validator";
import { transporter } from "../nodemailer-transporter.js";
import { sendAllEmails } from "../utils/emailer-util.js";
export const updateAppointment = async (req, res) => {
    try {
        const result = validationResult(req);
        if (result.isEmpty()) {
            const { appointmentId } = req.params;
            const userSessionId = req.cookies.id;
            const { date, time, price_paid, serviceId, email, status, service_name, status_name } = req.body;
            const userId = req.sessionID === userSessionId && req.session.userId;
            const userRole = req.session.userRole;
            const requestDate = new Date(date);
            const formattedDate = requestDate.toLocaleDateString('default', { month: 'long', day: '2-digit', year: 'numeric' });
            if (userRole === 'admin') {
                await pool.query(`
          CREATE OR REPLACE FUNCTION update_appointment_admin(
            userId TEXT,
            appointment_status INT,
            price INT,
            appointmentId INT,
            dates DATE,
            times TIME,
            serviceId INT
            )
          RETURNS INT
          LANGUAGE plpgsql
          AS
          $BODY$
          DECLARE
            updated_appointment_id INT;
            updated_line_item_id INT;
          BEGIN
            UPDATE appointments
            SET
              status = COALESCE($2, status),
              date = COALESCE($5, date),
              time = COALESCE($6, time)
            WHERE id = $4
            RETURNING id INTO updated_appointment_id;
  
            UPDATE appointment_line_items
            SET
              price_paid = COALESCE($3, price_paid),
              service_types_id = COALESCE($7, service_types_id)
            WHERE appointments_id = $4
            RETURNING id INTO updated_line_item_id;
    
            RETURN updated_appointment_id;
    
            EXCEPTION WHEN OTHERS THEN
              RAISE EXCEPTION 'Error: %', SQLERRM;
              RETURN -1;
          END;
          $BODY$
        `, []);
                const adminUpdateAppointmentRequest = await pool.query(`
          SELECT * FROM update_appointment_admin($1, $2, $3, $4, $5, $6, $7);
        `, [email, status, price_paid, appointmentId, date, time, serviceId]);
                if (adminUpdateAppointmentRequest.rows[0].update_appointment_admin !== null && status_name.toLowerCase() === 'upcoming') {
                    const emailMsg = {
                        from: process.env.GMAIL_ACCOUNT,
                        to: email,
                        subject: "PolishByCin - Appointment update",
                        text: `Your appointment with us has been updated. Please confirm the details below: \n
            Service: ${service_name} \n
            Date: ${formattedDate} \n
            Time: ${time} \n
            STATUS: ${status_name} \n
            If you have any questions/concerns, please feel free to reach out. Thank you for booking with me!`
                    };
                    await transporter.sendMail(emailMsg);
                }
                if (adminUpdateAppointmentRequest.rows[0].update_appointment_admin === null) {
                    throw new Error("Cannot find appointment.");
                }
                res.status(201).json(adminUpdateAppointmentRequest.rows);
            }
            else if (userRole !== 'admin' && status_name.toLowerCase() === 'upcoming') {
                // This block is for if the update is to an existing ACCEPTED/UPCOMING appointment. No db call so client does not use original appointment
                const emailMsg = {
                    from: process.env.GMAIL_ACCOUNT,
                    to: email,
                    subject: "PolishByCin - You have requested an update",
                    text: `This email is being sent because you have requested an update to your appointment with the details below: \n
          Service: ${service_name} \n
          Date: ${formattedDate} \n
          Time: ${time} \n
          STATUS: ${status_name} \n
          \n
          Please wait for a confirmation email. If you have any other questions/concerns, feel free to reach out. Thank you for booking with me
          `
                };
                const emailToAdmin = {
                    from: process.env.GMAIL_ACCOUNT,
                    to: process.env.GMAIL_ACCOUNT,
                    subject: "PolishByCin - Client has requested an appointment change",
                    text: `Client with email ${email} has requested an update to their appointment with the details below: \n
          Service: ${service_name} \n
          Date: ${formattedDate} \n
          Time: ${time} \n
          STATUS: ${status_name} \n
          `
                };
                const outboundEmails = [emailMsg, emailToAdmin];
                sendAllEmails(outboundEmails);
                res.status(201).json({ message: "Request to upcoming appointment received." });
            }
            else {
                await pool.query(`
          CREATE OR REPLACE FUNCTION update_appointment_client(
            userId INT,
            dates DATE,
            times TIME,
            appointmentId INT,
            serviceId INT
            )
          RETURNS INT
          LANGUAGE plpgsql
          AS
          $BODY$
          DECLARE
            updated_appointment_id INT;
            updated_line_item_id INT;
          BEGIN        
            UPDATE appointments
            SET
              date = COALESCE($2, date),
              time = COALESCE($3, time)
            WHERE id = $4
              AND users_id = $1
            RETURNING id INTO updated_appointment_id;
    
            UPDATE appointment_line_items
            SET
              service_types_id = COALESCE($5, service_types_id)
            WHERE appointments_id = $4
            RETURNING id INTO updated_line_item_id;
    
            RETURN updated_appointment_id;
    
            EXCEPTION WHEN OTHERS THEN
              RAISE EXCEPTION 'ERROR: %', SQLERRM;
              RETURN -1;
          END;
          $BODY$
        `, []);
                const updateAppointmentRequest = await pool.query(`
          SELECT * FROM update_appointment_client($1, $2, $3, $4, $5);
        `, [userId, date, time, appointmentId, serviceId]);
                if (updateAppointmentRequest.rows[0].update_appointment_client === null) {
                    throw new Error("Cannot find appointment.");
                }
                const emailMsg = {
                    from: process.env.GMAIL_ACCOUNT,
                    to: email,
                    subject: "PolishByCin - You have requested an update",
                    text: `This email is being sent because you have requested an update to your appointment with the details below: \n
          Service: ${service_name} \n
          Date: ${formattedDate} \n
          Time: ${time} \n
          STATUS: ${status_name} \n
          -\n
          Please wait for a confirmation email. If you have any other questions/concerns, feel free to reach out. Thank you for booking with me!
          `
                };
                const emailToAdmin = {
                    from: process.env.GMAIL_ACCOUNT,
                    to: process.env.GMAIL_ACCOUNT,
                    subject: "PolishByCin - Client has requested an appointment change",
                    text: `Client with email ${email} has requested an update to their appointment with the details below: \n
          Service: ${service_name} \n
          Date: ${formattedDate} \n
          Time: ${time} \n
          STATUS: ${status_name} \n
          `
                };
                const outboundEmails = [emailMsg, emailToAdmin];
                sendAllEmails(outboundEmails);
                res.status(201).json(updateAppointmentRequest.rows[0]);
            }
        }
        else {
            console.log("ERROR validating request: ", result);
            res.status(400).json({ message: "VALIDATION ERROR for appointment update request" });
        }
    }
    catch (error) {
        console.log("Update appointment error: ", error);
        res.status(400).json({ message: "FAILED to update appointment." });
    }
};
//# sourceMappingURL=update-appointment.js.map