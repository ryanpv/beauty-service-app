import { pool } from "../queries.js";
export const updateAppointment = (req, res) => {
    const { userId } = req.params;
    const { users_id, date, time, status } = req.body;
    if (status === 2 || status === 3) {
        pool.query(`
      UPDATE 
    `);
    }
};
//# sourceMappingURL=update-appointment.js.map