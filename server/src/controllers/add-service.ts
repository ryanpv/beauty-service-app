import express, { Request, Response} from 'express';
import { pool } from '../queries.js';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

export const addService = (req: Request, res: Response) => {
  const serviceTypesTable = 'service_types';
  const { service_name, price, description, service_categories_id } = req.body;

  pool.query(
    `INSERT INTO ${ serviceTypesTable } (service_name, price, description, service_categories_id)
      VALUES ($1, $2, $3, $4) RETURNING id`, [service_name, price, description, service_categories_id], (error, result) => {
        if (error) {
          console.log("INSERT NEW SERVICE TYPE ERROR: ", error);
          throw error;          
        }
        res.status(200).json(result.rows[0].id);
    });
};


export const uploadServices = (req: Request, res: Response) => {
  const serviceTypesTable = 'service_types';
  const data = fs.readFileSync(__dirname + "/service-list.json", 'utf-8')
  const results = JSON.parse(data)
  console.log('service arr length, ', results.length)

  // results.forEach(service => {
  //   pool.query(`
  //   INSERT INTO ${ serviceTypesTable } (service_name, price, description, service_categories_id)
  //     VALUES ($1, $2, $3, $4)`, [service.service_name, service.price, service.description, service.service_categories_id], (error, result) => {
  //       if (error) {
  //         console.log("INSERT MANY ERROR: ", error);
  //         throw error;          
  //       }
  //       // console.log("result: ", result)
  //     });
  // });


  res.send('successful loop insert@')
}