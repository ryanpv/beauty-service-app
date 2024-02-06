import { Request, Response } from 'express';
import { pool } from '../queries.js';
import { ModifiedSession } from './login.js';

export const deleteService = (req: Request, res: Response) => {
  const { serviceId } = req.params;
  const userRole = (req.session as ModifiedSession).userRole;
  const clientSession = req.sessionID;
  const clientCookie = req.cookies.id;
  const authorizedUser = clientCookie === clientSession && clientCookie !== undefined && clientSession !== undefined;
   
  if (userRole === 'admin' && authorizedUser) {
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
  } else {
    res.status(403).json({ message: "Unauthorized. Please check credentials." });
  }
};