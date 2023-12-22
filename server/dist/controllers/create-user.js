import { pool } from '../queries.js';
export const createUser = (req, res) => {
    const { name, email, phone_number, password, role_id } = req.body;
    pool.query(`
    INSERT INTO users (name, email, phone_number, password, role_id)
    VALUES ($1, $2, $3, $4, $5) RETURNING id
  `, [name, email, phone_number, password, role_id], (error, results) => {
        if (error) {
            console.log(`CREATE USER ERROR: ${error}`);
            throw error;
        }
        console.log("results: ", results.rows[0]);
        res.status(200).send('User created successfully');
    });
};
//# sourceMappingURL=create-user.js.map