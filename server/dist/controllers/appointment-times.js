import { pool } from '../queries.js';
export const appointmentTimes = async (req, res) => {
    const { date } = req.query;
    const requestDate = new Date(JSON.stringify(date));
    const formattedDate = requestDate.toLocaleDateString('default', { month: '2-digit', day: '2-digit', year: 'numeric' });
    const getAppointments = await pool.query(`
    SELECT appointments.time, service_types.duration
    FROM appointments
    JOIN appointment_line_items
      ON appointments.id = appointment_line_items.appointments_id
    JOIN service_types
      ON appointment_line_items.service_types_id = service_types.id
    WHERE appointments.date = $1
  `, [formattedDate]);
    const results = await getAppointments.rows;
    res.status(200).json(results);
};
//# sourceMappingURL=appointment-times.js.map