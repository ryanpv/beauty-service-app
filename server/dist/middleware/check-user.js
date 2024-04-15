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
            console.log("check-user.ts: user token authenticated");
            next();
        }
        else {
            req.session.destroy((error) => {
                console.error("session destroy error:  ", error);
            });
            res.cookie('user', null, { httpOnly: false });
            res.cookie('id', null, { httpOnly: false });
            res.status(401).json({ message: "Invalid token" });
        }
    }
    catch (error) {
        console.error("check-user.verifyUser error: ", error);
        res.cookie('user', null, { httpOnly: false });
        res.cookie('id', null, { httpOnly: false });
        req.session.destroy((error) => {
            console.error("error with check-user.verifyUser", error);
        });
        res.status(401).json({
            message: "Unsuccessful authentication."
        });
    }
};
//# sourceMappingURL=check-user.js.map