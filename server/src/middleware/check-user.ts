import express, { Request, Response} from 'express';
import { pool } from '../queries.js';

export const checkUserRole = (req: Request, res: Response) => {
  pool.query(`
    SELECT name, role 
      FROM users 
      JOIN roles 
        ON users.role_id = roles.id`, (error, results) => {
    if (error) {
      console.log("GET USER ROLE ERROR: ", error);
      throw error;
    }
    res.status(200).json(results.rows)
  })
};