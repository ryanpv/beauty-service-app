import { pool } from "../queries.js";
export const deleteUser = (req, res) => {
    const { userId } = req.params;
    const userRole = req.session.userRole;
    if (userRole === 'admin') {
        pool.query(`
      DELETE FROM users
      WHERE id = $1
    `, [userId], (error, results) => {
            if (error) {
                res.status(400).json({ message: "Unable to delete user." });
            }
            res.status(200).send(`Deleted user with id: ${userId}`);
        });
    }
    else {
        res.status(403).json({ message: "Unauthorized. Please check credentials." });
    }
};
//# sourceMappingURL=delete-user.js.map