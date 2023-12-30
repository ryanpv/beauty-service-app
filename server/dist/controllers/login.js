import bcrypt from 'bcrypt';
import { pool } from '../queries.js';
import jwt from 'jsonwebtoken';
;
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("login info: ", req.body);
        const getUser = await pool.query(`
      SELECT * FROM users
      WHERE email = $1
    `, [email]);
        const userEmail = getUser.rows[0].email;
        const userId = getUser.rows[0].id;
        const userRole = getUser.rows[0].role_id;
        const hashedPassword = getUser.rows[0].password;
        const checkPassword = await bcrypt.compare(password, hashedPassword);
        if (!checkPassword) {
            return res.status(401).json({ message: "Failed to authenticate." });
        }
        else {
            const jwtToken = jwt.sign({
                email: userEmail,
                id: userId
            }, process.env.JWT_SECRET, {
                expiresIn: "24h"
            });
            req.session.isAuthenticated = true;
            req.session.userRole = userRole === 2 ? "admin" : "client";
            req.session.accessToken = jwtToken;
            if (userRole === 2) { // Provide frontend with context of users' role
                res.cookie('userRole', 'admin', { httpOnly: false });
            }
            else {
                res.cookie('userRole', 'client', { httpOnly: false });
            }
            res.status(200).json({ message: "Successfully authenticated user" });
        }
    }
    catch (error) {
        console.log("error auth: ", error);
        return res.status(401).json({ message: "Failed to authenticate." });
    }
};
//# sourceMappingURL=login.js.map