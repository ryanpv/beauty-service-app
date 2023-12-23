import { pool } from "../queries.js";
export const getUserAppointments = (req, res) => {
    const { userId } = req.params;
    pool.query(`
    SELECT * FROM appointments
    WHERE users_id = $1
  `, [userId], (error, results) => {
        if (error) {
            console.log(`ERROR getting user's appointments: ${error}`);
            throw error;
        }
        res.status(200).json(results.rows);
    });
};
//# sourceMappingURL=get-user-appointments.js.map