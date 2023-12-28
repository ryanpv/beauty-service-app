import jwt from 'jsonwebtoken';
import { pool } from '../queries.js';
;
export const checkUserRole = async (req, res) => {
    const userId = 1;
    const userRole = await pool.query(`
    SELECT name, role 
      FROM users 
      JOIN roles 
        ON users.role_id = roles.id
      WHERE users.id = $1
        `, [userId]);
    res.status(200).json(userRole.rows[0]);
};
export const verifyUser = (req, res, next) => {
    try {
        const token = req.session.accessToken;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded: ", decoded);
        res.send(decoded);
        // next();
    }
    catch (error) {
        return res.status(401).json({
            message: "Unsuccessful authentication."
        });
    }
};
//# sourceMappingURL=check-user.js.map