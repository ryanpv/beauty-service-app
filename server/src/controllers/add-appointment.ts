import { Request, Response } from 'express';
import { pool } from '../queries.js';

export const addAppointment = (req: Request, res: Response) => {
  const { userId, date, time, status } = req.body;

  pool.query(`
    INSERT INTO appointments (users_id, date, time, status)
    VALUES ($1, $2, $3, $4) RETURNING id
  `, [userId, date, time, status], (error, results) => {
    if (error) {
      console.log(`ERROR adding appointment: ${ error }`);
      throw error;      
    }
    res.status(201).send(`Successfully added appointment for id: ${ results.rows[0].id }`);
  });
};