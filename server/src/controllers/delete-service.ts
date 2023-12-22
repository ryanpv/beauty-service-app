import { Request, Response } from 'express';
import { pool } from '../queries.js';

export const deleteService = (req: Request, res: Response) => {
  const { serviceId } = req.params;

  pool.query(
    `DELETE FROM service_types
    WHERE id = $1`
    , [serviceId], (error, results) => {
      if (error) {
        console.log("DELETE service error: ", error);
        throw error;
      }
      res.status(200).send(`Deleted service with id: ${ serviceId }`)
    });
};