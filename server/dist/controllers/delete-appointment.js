import { pool } from "../queries.js";
export const deleteAppointment = (req, res) => {
    const { userSessionId, appointmentId } = req.params;
    const userId = req.sessionID === userSessionId && req.session.userId;
    console.log("params: ", req.params);
    console.log("userid: ", userId);
    const admin = true;
    if (admin) {
        pool.query(`
    DELETE FROM appointments
    WHERE id = $1
    RETURNING id
  `, [appointmentId], (error, results) => {
            if (error) {
                console.log(`ERROR deleting appointment: ${error}`);
                throw error;
            }
            res.status(201).json({ message: `Successfully deleted appointment with id: ${results.rows[0].id}`, id: results.rows[0].id });
        });
    }
    else {
        pool.query(`
      DELETE FROM appointments
      WHERE users_id = $1
        AND id = $2
      RETURNING id
    `, [userId, appointmentId], (error, results) => {
            if (error) {
                console.log(`ERROR deleting appointment: ${error}`);
                throw error;
            }
            res.status(201).json({ message: `Successfully deleted appointment with id: ${results.rows[0].id}`, id: results.rows[0].id });
        });
    }
};
// *** Consider when deleting appointment is NOT counted as a cancellation *** 
//# sourceMappingURL=delete-appointment.js.map