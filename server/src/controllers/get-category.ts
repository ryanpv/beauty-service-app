import { Request, Response } from 'express';
import { pool } from "../queries.js";

export const getCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;
  
    const categoryData = await pool.query(`
      SELECT * FROM service_types
      WHERE service_categories_id = $1
    `, [categoryId]);

    const results = categoryData.rows

    res.status(200).json(results);
  } catch (error) {
    res.status(400).json({ message: "Error fetching category data" });
  }
};

