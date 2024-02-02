import { pool } from "../queries.js";
import { validationResult } from "express-validator";
export const updateAppointment = (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        const { appointmentId } = req.params;
        const userSessionId = req.cookies.id;
        const { date, time, price_paid, serviceId, status } = req.body;
        const userId = req.sessionID === userSessionId && req.session.userId;
        const userRole = req.session.userRole;
        if (userRole === 'admin') {
            pool.query(`
        CREATE OR REPLACE FUNCTION update_appointment_admin(
          userId INT,
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
            AND users_id = $1
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
      `, [], (error, results) => {
                if (error) {
                    console.log("error updating: ", error);
                    throw error;
                }
                pool.query(`
          SELECT * FROM update_appointment_admin($1, $2, $3, $4, $5, $6, $7);
        `, [userId, status, price_paid, appointmentId, date, time, serviceId], (error, results) => {
                    if (error) {
                        console.log("Error in calling update func: ", error);
                        throw error;
                    }
                    res.status(201).json(results.rows);
                });
            });
        }
        else {
            pool.query(`
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
      `, [], (error, results) => {
                if (error) {
                    console.log("error updating appointment: ", error);
                    throw error;
                }
                pool.query(`
          SELECT * FROM update_appointment_client($1, $2, $3, $4, $5);
        `, [userId, date, time, appointmentId, serviceId], (error, results) => {
                    if (error) {
                        console.log("ERROR updating appointment for USER: ", error);
                        throw error;
                    }
                    res.status(201).json(results.rows[0]);
                });
            });
        }
    }
    else {
        res.status(400).json({ message: "INVALID appointment update request" });
    }
};
//# sourceMappingURL=update-appointment.js.map