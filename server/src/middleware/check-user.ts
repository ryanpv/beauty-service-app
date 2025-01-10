import express, { NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import { pool } from '../queries.js';
import { Session } from 'express-session';
import { ModifiedSession } from '../controllers/login.js';


const domain = process.env.NODE_ENV === 'production' ? '.polishbycin.com' : 'localhost'

export const checkUserRole = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params; 
  const userRole = await pool.query(`
    SELECT name, role 
      FROM users 
      JOIN roles 
        ON users.role_id = roles.id
      WHERE users.id = $1
        `, [userId]);

    res.status(200).json(userRole.rows[0])
};


// Verify user session
export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = (req.session as ModifiedSession).accessToken;
    const isAuthenticated = (req.session as ModifiedSession).isAuthenticated;
    
    jwt.verify(token, process.env.JWT_SECRET); // throws error on invalid token

    if (isAuthenticated) {
      next();
    } 
  } catch (error) {
    console.error("check-user.verifyUser error: ", error)

    req.session.destroy((error) => {
      if (error) {
        console.error("error with check-user.verifyUser", error)
        res.status(500).json({ message: "Internal server error: check-user session destroy." });
      }

      res.clearCookie('id', { domain: domain });
      res.clearCookie('user', { domain: domain });

      res.status(401).json({
        message: "Unsuccessful authentication."
      });
    });

    return;
  }
};