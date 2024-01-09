import jwt from 'jsonwebtoken';
import { pool } from '../queries.js';
// interface ModifiedSession extends Session {
//   isAuthenticated?: boolean;
//   userRole?: string;
//   accessToken?: string;
// };
export const checkUserRole = async (req, res, next) => {
    const { userId } = req.params;
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
        const isAuthenticated = req.session.isAuthenticated;
        jwt.verify(token, process.env.JWT_SECRET);
        if (isAuthenticated) {
            next();
        }
        else {
            req.session.destroy((error) => {
                if (error)
                    throw error;
                res.status(400).json({ message: "Failed to logout" });
            });
            res.cookie('userRole', null, { httpOnly: false });
            res.status(401).json({ message: "Invalid token" });
        }
    }
    catch (error) {
        res.status(401).json({
            message: "Unsuccessful authentication."
        });
    }
};
//# sourceMappingURL=check-user.js.map