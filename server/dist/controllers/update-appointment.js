import { pool } from "../queries.js";
export const updateAppointment = (req, res) => {
    const { userId, appointmentId } = req.params;
    const { date, time, status, price_paid } = req.body;
    // if status === complete, then also update appointment_line_items table for price_paid
    if (status === 2) {
        pool.query(`
      CREATE OR REPLACE FUNCTION update_appointment(
        userId INT,
        status INT,
        price_paid INT,
        appointmentId INT
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
          status = $2
        WHERE id = $4
          AND users_id = $1
        RETURNING id INTO updated_appointment_id;

        UPDATE appointment_line_items
        SET
          price_paid = $3
        WHERE appointments_id = $4
        RETURNING id INTO updated_line_item_id;

        RETURN updated_line_item_id;

        EXCEPTION WHEN OTHERS THEN
          RAISE NOTICE 'ERROR: %', SQLERRM;
          RETURN -1;
      END;
      $BODY$
    `, [], (error, results) => {
            if (error) {
                console.log("error updating: ", error);
                throw error;
            }
            pool.query(`
        SELECT * FROM update_appointment($1, $2, $3, $4);
      `, [userId, status, price_paid, appointmentId], (error, results) => {
                if (error) {
                    console.log("Error in calling update func: ", error);
                    throw error;
                }
                res.status(201).json(results.rows[0].update_appointment);
            });
        });
    }
    else { // any other appointment status OTHER THAN 2(complete) to run this block
        pool.query(`
      UPDATE appointments
      SET
        status = COALESCE($2, status),
        date = COALESCE($3, date),
        time = COALESCE($4, time)
      WHERE users_id = $1
        AND id = $5
      RETURNING id
    `, [userId, status, date, time, appointmentId], (error, results) => {
            if (error) {
                console.log("error updating appointment: ", error);
                throw error;
            }
            res.status(201).json(results.rows[0].id);
        });
    }
};
//# sourceMappingURL=update-appointment.js.map