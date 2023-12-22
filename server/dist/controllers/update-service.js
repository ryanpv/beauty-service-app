import { pool } from "../queries.js";
export const updateService = (req, res) => {
    const { serviceId } = req.params;
    const serviceDetails = req.body.serviceDetails;
    pool.query(`
    UPDATE service_types
    SET service_name = $1,
        price = $2,
        description = $3,
        service_categories_id = $4
    WHERE id = $5
    RETURNING *
  `, [serviceDetails.service_name, serviceDetails.price, serviceDetails.description, serviceDetails.service_categories_id, serviceId], (error, results) => {
        if (error) {
            console.log(`update service error: ${error}`);
            throw error;
        }
        res.status(201).json(results.rows);
    });
};
//# sourceMappingURL=update-service.js.map