import { Request, Response } from 'express';
import { pool } from '../queries.js';
import { ModifiedSession } from './login.js';

export const getService = (req: Request, res: Response) => {
  const { serviceId } = req.params;
  const userRole = (req.session as ModifiedSession).userRole;
  const clientSession = req.sessionID;
  const clientCookie = req.cookies.id;
  const authorizedUser = clientCookie === clientSession && clientCookie !== undefined && clientSession !== undefined;
  
  if (userRole === "admin" && authorizedUser) {
    pool.query(`
      SELECT service_types.*, service_categories.service_category_name
        FROM service_types
        JOIN service_categories
          ON service_types.service_categories_id = service_categories.id
        WHERE service_types.id = $1
        ORDER BY service_types.id
      `, [serviceId], (error, results) => {
        if (error) {
          console.log(`GET SERVICE ERROR: ${ error }`);
          res.status(400).json({ message: "Unable to fetch service type." });     
        }
      res.status(200).json(results.rows);
    });
  } else {
    res.status(403).json({ message: "Unauthorized access. Please check credentials" });
  }
};