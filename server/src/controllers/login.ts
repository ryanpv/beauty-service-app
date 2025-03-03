import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import { pool } from '../queries.js';
import jwt from 'jsonwebtoken';
import { Session } from "express-session";
import { validationResult } from "express-validator";

export interface ModifiedSession extends Session {
  isAuthenticated?: boolean;
  userRole?: string;
  accessToken?: string;
  userEmail?: string;
  userId?: number;
  name?: string;
  isVerified?: boolean;
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const result = validationResult(req);

    if (result.isEmpty()) {
      const { email, password } = req.body;
      const emailLowerCased = email.toLowerCase();
  
      const getUser = await pool.query(`
        SELECT users.*, is_verified FROM users
        JOIN user_verifications
          ON users.id = user_verifications.user_id
        WHERE email = $1
      `, [emailLowerCased]);
  
      if (getUser.rows.length === 0) {
        console.log("no user", getUser)
        res.status(400).json({ message: "User does not exist" });
      } else { 
        const userEmail = getUser.rows[0].email;
        const userId = getUser.rows[0].id;
        const userRole = getUser.rows[0].role_id;
        const userDisplayName = getUser.rows[0].name;
        const hashedPassword = getUser.rows[0].password;
        const isVerified = getUser.rows[0].is_verified;
        const checkPassword = await bcrypt.compare(password, hashedPassword);
  
        if (!checkPassword) {
          return res.status(401).json({ message: "Failed to authenticate." });
        } else {
          const payload = {
            id: userId,
            role: userRole,
            displayName: userDisplayName,
            iat: Math.floor(Date.now() / 1000),
            isVerified: isVerified
          }
          const jwtToken = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {
              expiresIn: "24h"
            });
            
          (req.session as ModifiedSession).isAuthenticated = true;
          (req.session as ModifiedSession).userRole = userRole === 2 ? "admin" : "client";
          (req.session as ModifiedSession).accessToken = jwtToken;
          (req.session as ModifiedSession).userEmail = userEmail;
          (req.session as ModifiedSession).userId = userId;
          (req.session as ModifiedSession).name = userDisplayName;
          (req.session as ModifiedSession).isVerified = isVerified;

          const domain = process.env.NODE_ENV === 'production' ? '.polishbycin.com' : 'localhost'
  
          res.cookie('user', jwtToken, { httpOnly: false, secure: true, sameSite: 'none', domain: domain });
          res.cookie('id', req.sessionID, { httpOnly: true, secure: true, sameSite: 'none', domain: domain });
          
          res.status(200).json({ message: "Successfully authenticated user!" });
        }
      }

    } else {
      throw new Error("INVALID login input(s)");
    }

  } catch (error) {
    console.log("error auth: ", error)
    return res.status(401).json({ message: "Failed to authenticate." });
  }
};