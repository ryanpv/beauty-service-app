import { pool } from '../queries.js';
export const getServices = (req, res) => {
    pool.query('SELECT * FROM service_categories ORDER BY id ASC', (error, results) => {
        if (error) {
            console.log("GET all services error: ", error);
            throw error;
        }
        res.status(200).json(results.rows);
    });
};
//# sourceMappingURL=get-services.js.map