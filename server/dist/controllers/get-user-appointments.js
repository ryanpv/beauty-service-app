import { pool } from "../queries.js";
export const getUserAppointments = async (req, res) => {
    const { userId } = req.params;
    const { status } = req.query;
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 0-index, must +1 to get accurate month value
    const day = date.getDate();
    const currentDate = `${year}-${month}-${day}`;
    const start_date = req.query.start_date === "" ? currentDate : req.query.start_date;
    const end_date = req.query.end_date === "" ? null : req.query.end_date;
    const admin = true;
    const client = false;
    console.log("status: ", req.query);
    console.log("userid: ", userId);
    if (admin) {
        const appointments = await pool.query(`
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
    WHERE (status_types.id = $1 OR $1 IS NULL)
      AND (appointments.date >= $2 OR $2 IS NULL)
      AND (appointments.date < $3 OR $3 IS NULL)
      `, [status, start_date, end_date]);
        const results = appointments.rows;
        res.status(200).json(results);
    }
    else if (client) {
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
        AND appointments.status = $2
    `, [userId, status], (error, results) => {
            if (error) {
                console.log(`ERROR getting user's appointments: ${error}`);
                throw error;
            }
            res.status(200).json(results.rows);
        });
    }
};
//# sourceMappingURL=get-user-appointments.js.map