import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import { pool } from '../queries.js';
import jwt from 'jsonwebtoken';
import { Session } from "express-session";

interface ModifiedSession extends Session {
  isAuthenticated?: boolean;
  userRole?: string;
  accessToken?: string;
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;
  
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
    } else {
      const jwtToken = jwt.sign(
        {
          email: userEmail,
          id: userId 
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h"
        });

      (req.session as ModifiedSession).isAuthenticated = true;
      (req.session as ModifiedSession).userRole = userRole === 2 ? "admin" : "client";
      (req.session as ModifiedSession).accessToken = jwtToken;
      
      res.status(200).json({ message: "Successfully authenticated user" });
    }
    // console.log(getUser.rows[0])

  } catch (error) {
    console.log("error auth: ", error)
    return res.status(401).json({ message: "Failed to authenticate." });
  }
};