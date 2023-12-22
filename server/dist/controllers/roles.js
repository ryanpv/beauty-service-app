import { pool } from '../queries.js';
export const getRoles = (req, res) => {
    pool.query('SELECT * FROM roles', (error, results) => {
        if (error) {
            console.log('getRoles ERROR: ', error);
            throw error;
        }
        else {
            results.rows.filter((role, idx) => {
                console.log(`index: ${idx}, role: ${role}`);
            });
            console.log("rows: ", results.rows);
        }
        res.status(200).send(results.rows);
    });
};
//# sourceMappingURL=roles.js.map