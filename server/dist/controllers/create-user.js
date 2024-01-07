import { pool } from '../queries.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const checkExistingUser = async (emailToCheck) => {
    const result = await pool.query(`
  SELECT name, email FROM users
    WHERE email = $1
  `, [emailToCheck]);
    return result.rowCount > 0;
};
export const createUser = async (req, res) => {
    try {
        const { name, email, phone_number, password } = req.body;
        const emailLowerCased = email.toLowerCase();
        const existingUser = await checkExistingUser(email);
        const clientRole = 1;
        const adminRole = 2;
        if (existingUser) {
            console.log("exists");
            res.status(409).json({ message: "Email already exists" });
        }
        else {
            const hashPassword = await bcrypt.hash(password, 10);
            const newUser = await pool.query(`
        INSERT INTO users (name, email, phone_number, password, role_id)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id
      `, [name, emailLowerCased, phone_number, hashPassword, clientRole]);
            const userEmail = email;
            const userId = newUser.rows[0].id;
            const userRole = clientRole;
            const jwtToken = jwt.sign({
                email: userEmail,
                id: newUser.rows[0].id
            }, process.env.JWT_SECRET, {
                expiresIn: "24h"
            });
            req.session.isAuthenticated = true;
            req.session.userRole = "client";
            req.session.accessToken = jwtToken;
            res.cookie("userRole", 'client', { httpOnly: false });
            return res.status(201).json({ message: `Successfully created user with id ${newUser.rows[0].id}` });
        }
    }
    catch (error) {
        console.log("createUser error: ", error);
        res.status(400).json({ message: "Unsuccessful attempt to create user." });
    }
};
//# sourceMappingURL=create-user.js.map