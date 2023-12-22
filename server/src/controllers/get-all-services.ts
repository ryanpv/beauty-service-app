import express, { Response, Request } from 'express';
import { pool } from '../queries.js';

export const getAllServices = (req: Request, res: Response) => {
  pool.query(`
    SELECT * FROM service_types
      JOIN service_categories
        ON service_types.service_categories_id = service_categories.id`, (error, results) => {
          if (error) {
            console.log(`GET ALL SERVICES ERROR: ${ error }`);
            throw error;
          }
          res.status(200).json(results.rows);
        });
};