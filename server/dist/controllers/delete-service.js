import { pool } from '../queries.js';
export const deleteService = (req, res) => {
    const { serviceId } = req.params;
    const userRole = req.session.userRole;
    if (userRole === 'admin') {
        pool.query(`DELETE FROM service_types
      WHERE id = $1`, [serviceId], (error, results) => {
            if (error) {
                console.log("DELETE service error: ", error);
                throw error;
            }
            res.status(200).send(`Deleted service with id: ${serviceId}`);
        });
    }
    else {
        res.status(403).json({ message: "Unauthorized. Please check credentials." });
    }
};
//# sourceMappingURL=delete-service.js.map