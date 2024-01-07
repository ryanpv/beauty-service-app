import { pool } from '../queries.js';
export const addAppointment = (req, res) => {
    const { date, time, serviceId, price_paid } = req.body;
    const { userId } = req.params;
    const status = 2;
    pool.query(`
    CREATE OR REPLACE FUNCTION add_appointment(
      userId INT, 
      dates DATE, 
      times TIME, 
      serviceId INT, 
      price_paid INT, 
      status INT
      )
    RETURNS INT
    LANGUAGE plpgsql
    AS
    $BODY$
    DECLARE
      new_appointments_id INT;
      line_item_id INT;
    BEGIN
      INSERT INTO appointments (users_id, date, time, status)
      VALUES ($1, $2, $3, $6)
      RETURNING id INTO new_appointments_id;

      RAISE NOTICE 'Appointment inserted successfully with ID: %', new_appointments_id;

      INSERT INTO appointment_line_items (appointments_id, service_types_id, price_paid)
      VALUES (new_appointments_id, $4, $5)
      RETURNING id INTO line_item_id;

      RAISE NOTICE 'Appointment line item successfully inserted with ID: %', line_item_id;

      RETURN new_appointments_id;

      EXCEPTION WHEN OTHERS THEN
        RAISE NOTICE 'Error: %', SQLERRM;
        RETURN -1;
    END;
    $BODY$
  `, [], (error, results) => {
        if (error) {
            console.log("ERROR adding new appointment: ", error);
            throw error;
        }
        pool.query(`
      SELECT * FROM add_appointment($1, $2, $3, $4, $5, $6);
    `, [userId, date, time, serviceId, price_paid, status], (error, results) => {
            if (error) {
                console.log("ERROR adding new appointment: ", error);
                throw error;
            }
            console.log("results: ", results.rows);
            res.status(201).json({ "appointments_id": results.rows[0].add_appointment });
        });
    });
};
//# sourceMappingURL=add-appointment.js.map