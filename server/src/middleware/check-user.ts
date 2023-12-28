import express, { NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import { pool } from '../queries.js';
import { Session } from 'express-session';

interface ModifiedSession extends Session {
  isAuthenticated?: boolean;
  userRole?: string;
  accessToken?: string;
};

export const checkUserRole = async (req: Request, res: Response) => {
  const userId = 1;
  const userRole = await pool.query(`
    SELECT name, role 
      FROM users 
      JOIN roles 
        ON users.role_id = roles.id
      WHERE users.id = $1
        `, [userId]);

  
    res.status(200).json(userRole.rows[0])
};

export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = (req.session as ModifiedSession).accessToken;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded: ", decoded)
    res.send(decoded)
    // next();
  } catch (error) {
    return res.status(401).json({
      message: "Unsuccessful authentication."
    })
  }
};