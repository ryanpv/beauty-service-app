import { pool } from '../queries.js';
export const addNewServiceCategory = (req, res) => {
    const { service_category_name } = req.body;
    const userRole = req.session.userRole;
    const clientSession = req.sessionID;
    const clientCookie = req.cookies.id;
    const authorizedUser = clientCookie === clientSession && clientCookie !== undefined && clientSession !== undefined;
    if (userRole === 'admin' && authorizedUser) {
        pool.query('INSERT INTO service_categories (service_category_name) VALUES ($1) RETURNING *', [service_category_name], (error, results) => {
            if (error) {
                throw error;
            }
            res.status(201).send(`Category added with ID: ${results.rows[0].id}`);
        });
    }
    else {
        res.status(403).json({ message: "Unauthorized. Please check credentials." });
    }
};
//# sourceMappingURL=add-service-category.js.map