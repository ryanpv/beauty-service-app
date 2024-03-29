import { Request, Response } from "express";
import { pool } from "../queries.js";
import { ModifiedSession } from "./login.js";

export const updateService = (req: Request, res: Response) => {
  const { serviceId } = req.params;
  const { service_name, price, description, service_categories_id, duration } = req.body;
  const userRole = (req.session as ModifiedSession).userRole;
  const clientSession = req.sessionID;
  const clientCookie = req.cookies.id;
  const authorizedUser = clientCookie === clientSession && clientCookie !== undefined && clientSession !== undefined;
   
  if (userRole === 'admin' && authorizedUser) {
    pool.query(`
      UPDATE service_types SET 
        service_name = COALESCE($1, service_name),
        price = COALESCE($2, price),
        description = COALESCE($3, description),
        service_categories_id = COALESCE($4, service_categories_id),
        duration = COALESCE($6, duration)
      WHERE id = $5
      RETURNING *
    `, [service_name, price, description, service_categories_id, serviceId, duration], 
    (error, results) => {
      if (error) {
        console.log(`update service error: ${ error }`);
        throw error;
      }
      res.status(201).json(results.rows);
    })
  } else {
    res.status(403).json({ message: "Unauthorized. Please check credentials." });
  }
};