import { pool } from '../queries.js';
export const userSingleAppointment = async (req, res) => {
    try {
        const { userId, appointmentId } = req.params;
        const { date, time, serviceId, status, price_paid } = req.body;
        const updateAppointment = await pool.query(`
      UPDATE appointments 
        SET 
          appointments.date = COALESCE($3, appointments.date),
          appointments.time = COALESCE($4, appointments.time),
          appointments.status = COALESCE($5, appointments.status),
          appointment_line_items.price_paid = COALESCE($6, appointment_line_items.price_paid)
  
  
        FROM appointment_line_items
        WHERE appointments.users_id = $1
          AND appointments.id = $2
          AND appointments.id = appointment_line_items.appointments_id
          AND appointment_line_items.service_types_id = service_types.id
    `, [userId, appointmentId, date, time, serviceId, status, price_paid]);
        const result = updateAppointment.rows;
        console.log("results: ", result);
        res.send(200);
    }
    catch (error) {
        console.log("update error: ", error);
    }
};
//# sourceMappingURL=user-single-appointment.js.map