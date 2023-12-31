import { pool } from '../queries.js';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const addService = (req, res) => {
    const serviceTypesTable = 'service_types';
    const { service_name, price, description, service_categories_id } = req.body;
    const service_categories_idNum = Number(service_categories_id); // parse id to number;
    pool.query(`INSERT INTO $5 (service_name, price, description, service_categories_id)
      VALUES ($1, $2, $3, $4) RETURNING *`, [service_name, price, description, service_categories_idNum, serviceTypesTable], (error, result) => {
        if (error) {
            console.log("INSERT NEW SERVICE TYPE ERROR: ", error);
            throw error;
        }
        res.status(200).json(result.rows[0].id);
    });
};
export const uploadServices = (req, res) => {
    const serviceTypesTable = 'service_types';
    const data = fs.readFileSync(__dirname + "/service-list.json", "utf-8");
    const results = JSON.parse(data);
    console.log(results.length);
    // console.log('data: ', results)
    // results.forEach(service => {
    //   pool.query(`
    //   INSERT INTO ${ serviceTypesTable } (service_name, price, description, service_categories_id)
    //     VALUES ($1, $2, $3, $4)`, [service.service_name, service.price, service.description, service.service_categories_id], (error, result) => {
    //       if (error) {
    //         console.log("INSERT MANY ERROR: ", error);
    //         throw error;          
    //       }
    //     });
    // });
    res.status(201).send('Successful loop insert');
};
//# sourceMappingURL=add-service.js.map