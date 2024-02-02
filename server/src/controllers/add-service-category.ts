import express, { Request, Response } from 'express';
import { pool } from '../queries.js';
import { ModifiedSession } from './login.js';

export const addNewServiceCategory = (req: Request, res: Response) => {
  const { service_category_name } = req.body;
  const userRole = (req.session as ModifiedSession).userRole;

  if (userRole === 'admin') {
    pool.query('INSERT INTO service_categories (service_category_name) VALUES ($1) RETURNING *', [service_category_name], (error, results) => {
      if (error) {
        throw error
      }
      res.status(201).send(`Category added with ID: ${ results.rows[0].id }`)
    });
  } else {
    res.status(403).json({ message: "Unauthorized. Please check credentials." });
  }
};