import express, { Request, Response } from 'express';
import { pool } from '../queries.js';

export const getServiceCategories = (req: Request, res: Response) => {
  pool.query('SELECT * FROM service_categories ORDER BY id ASC', (error, results) => {
    if (error) {
      console.log("GET all services error: ", error)
      res.status(400).json({ message: "Unable to fetch service categories." });
    }
    res.status(200).json(results.rows);
  });
};