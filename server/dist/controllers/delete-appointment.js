import { pool } from "../queries.js";
import { transporter } from "../nodemailer-transporter.js";
import { sendAllEmails } from "../utils/emailer-util.js";
export const deleteAppointment = async (req, res) => {
    try {
        const { appointmentId, userId } = req.params;
        const userSessionId = req.cookies.id;
        const user_Id = req.sessionID === userSessionId && req.session.userId;
        const userRole = req.session.userRole;
        const clientSession = req.sessionID;
        const clientCookie = req.cookies.id;
        const authorizedUser = clientCookie === clientSession && clientCookie !== undefined && clientSession !== undefined;
        if (!authorizedUser)
            res.status(403).json({ message: "No valid credentials. Log in required." });
        if (userRole === 'admin' && authorizedUser) {
            const adminDeleteAppointment = await pool.query(`
        DELETE FROM appointments
        USING users, appointment_line_items, service_types
        WHERE appointments.id = $1
          AND appointments.users_id = users.id
          AND appointment_line_items.appointments_id = appointments.id
          AND appointment_line_items.service_types_id = service_types.id
        RETURNING appointments.id, appointments.date, appointments.time, users.email, service_types.service_name;
      `, [appointmentId]);
            const results = await adminDeleteAppointment;
            const clientEmail = results.rows[0].email;
            const requestDate = new Date(results.rows[0].date);
            const appointmentDate = requestDate.toLocaleDateString('default', { month: 'long', day: '2-digit', year: 'numeric' });
            const appointmentTime = results.rows[0].time;
            const appointmentService = results.rows[0].service_name;
            const emailMsg = {
                from: process.env.GMAIL_ACCOUNT,
                to: clientEmail,
                subject: "PolishByCin - Appointment Cancellation",
                text: `The following appointment has been cancelled: \n
        Service: ${appointmentService}, \n
        Date: ${appointmentDate}, \n
        Time: ${appointmentTime} \n 
        -\n 
        If you have any questions/concerns please feel free to reach out. Hope to see you next time!
        `
            };
            await transporter.sendMail(emailMsg);
            res.status(201).json({ message: `Successfully deleted appointment with id: ${results.rows[0].id}`, id: results.rows[0].id });
        }
        else if (authorizedUser) {
            const userDeleteAppointment = await pool.query(`
        DELETE FROM appointments
        USING appointment_line_items, service_types
        WHERE appointments.users_id = $1
          AND appointments.id = $2
          AND appointment_line_items.appointments_id = $2
          AND appointment_line_items.service_types_id = service_types.id
        RETURNING appointments.id, appointments.date, appointments.time, service_types.service_name;
      `, [userId, appointmentId]);
            const results = await userDeleteAppointment;
            const clientEmail = req.session.userEmail;
            const requestDate = new Date(results.rows[0].date);
            const appointmentDate = requestDate.toLocaleDateString('default', { month: 'long', day: '2-digit', year: 'numeric' });
            const appointmentTime = results.rows[0].time;
            const appointmentService = results.rows[0].service_name;
            const emailToClient = {
                from: process.env.GMAIL_ACCOUNT,
                to: clientEmail,
                subject: "PolishByCin - Appointment Cancellation",
                text: `You have chosen to cancel the following appointment: \n
        Service: ${appointmentService}, \n
        Date: ${appointmentDate}, \n
        Time: ${appointmentTime} \n 
        -\n 
        If you have any questions/concerns please feel free to reach out. Hope to see you next time!
        `
            };
            const emailToAdmin = {
                from: process.env.GMAIL_ACCOUNT,
                to: process.env.GMAIL_ACCOUNT,
                subject: "PolishByCin - Appointment Cancellation",
                text: `The following appointment has been cancelled by ${clientEmail}: \n
        Service: ${appointmentService}, \n
        Date: ${appointmentDate}, \n
        Time: ${appointmentTime} \n 
        `
            };
            const outboundEmails = [emailToClient, emailToAdmin];
            sendAllEmails(outboundEmails);
            res.status(201).json({ message: `Successfully deleted appointment with id: ${results.rows[0].id}`, id: results.rows[0].id });
        }
    }
    catch (error) {
        console.log("Delete appointment error: ", error);
        res.status(400).json({ message: "FAILED to cancel appointment" });
    }
};
// *** Consider when deleting appointment is NOT counted as a cancellation *** 
//# sourceMappingURL=delete-appointment.js.map