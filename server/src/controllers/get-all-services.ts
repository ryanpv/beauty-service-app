import { Response, Request } from 'express';
import { pool } from '../queries.js';

export const getAllServices = async (req: Request, res: Response) => {
  try {
    const services = await pool.query(`
      SELECT service_types.*, service_categories.service_category_name FROM service_types
        JOIN service_categories
          ON service_types.service_categories_id = service_categories.id
        ORDER BY service_types.id`)
      
    res.status(200).json(services.rows)
  } catch (error) {
    console.log(`GET ALL SERVICES ERROR: ${ error }`);
    res.status(400).json({ message: "Unable to fetch list of services." });
  }
};