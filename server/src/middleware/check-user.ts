import express, { NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import { pool } from '../queries.js';
import { Session } from 'express-session';
import { ModifiedSession } from '../controllers/login.js';

// interface ModifiedSession extends Session {
//   isAuthenticated?: boolean;
//   userRole?: string;
//   accessToken?: string;
// };
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

export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = (req.session as ModifiedSession).accessToken;
    const isAuthenticated = (req.session as ModifiedSession).isAuthenticated;
    
    jwt.verify(token, process.env.JWT_SECRET);

    if (isAuthenticated) {
      console.log("check-user.ts: user token authenticated");
      
      next();
    } else {
      req.session.destroy((error) => {
        console.error("session destroy error:  ", error);
      });

      res.cookie('user', null, { httpOnly: false });
      res.cookie('id', null, { httpOnly: false });
      res.status(401).json({ message: "Invalid token" });
    }
  } catch (error) {
    console.error("check-user.verifyUser error: ", error)
    // res.cookie('user', null, { httpOnly: false });
    // res.cookie('id', null, { httpOnly: false });
    res.cookie('user', null, { httpOnly: false, secure: true, sameSite: 'none', domain: domain });
    res.cookie('id', null, { httpOnly: true, secure: true, sameSite: 'none', domain: domain });
    req.session.destroy((error) => {
      console.error("error with check-user.verifyUser", error)
    });

    res.status(401).json({
      message: "Unsuccessful authentication."
    });
  }
};