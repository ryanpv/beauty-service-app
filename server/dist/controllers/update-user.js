import { pool } from "../queries.js";
export const updateUser = (req, res) => {
    const { userId } = req.params;
    const { name, email, phone_number } = req.body;
    pool.query(`
    UPDATE users SET 
      name = COALESCE($1, name), 
      email = COALESCE($2, email),
      phone_number = COALESCE($3, phone_number)
    WHERE id = $4 
    RETURNING id
  `, [name, email, phone_number, userId], (error, results) => {
        if (error) {
            console.log("ERROR updating user: ", error);
        }
        res.status(200).send(`Successfully UPDATED user with id: ${results.rows[0].id}`);
    });
};
//# sourceMappingURL=update-user.js.map