import { pool } from "../queries.js";
export const deleteAppointment = (req, res) => {
    const { userId, appointmentId } = req.params;
    pool.query(`
    DELETE FROM appointments
    WHERE users_id = $1
      AND id = $2
  `, [userId, appointmentId], (error, results) => {
        if (error) {
            console.log(`ERROR deleting appointment: ${error}`);
            throw error;
        }
        res.status(201).send(`Successfully deleted appointment with id: ${results.rows[0].id}`);
    });
};
// *** Consider when deleting appointment is NOT counted as a cancellation *** 
//# sourceMappingURL=delete-appointment.js.map