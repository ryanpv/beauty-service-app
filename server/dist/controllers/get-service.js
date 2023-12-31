import { pool } from '../queries.js';
export const getService = (req, res) => {
    const { serviceId } = req.params;
    pool.query(`
    SELECT service_types.*, service_categories.service_category_name
      FROM service_types
      JOIN service_categories
        ON service_types.service_categories_id = service_categories.id
      WHERE service_types.id = $1
    `, [serviceId], (error, results) => {
        if (error) {
            console.log(`GET SERVICE ERROR: ${error}`);
            throw error;
        }
        res.status(200).json(results.rows);
    });
};
//# sourceMappingURL=get-service.js.map