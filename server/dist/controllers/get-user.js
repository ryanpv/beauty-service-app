import { pool } from "../queries.js";
export const getUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const results = await pool.query(`
    SELECT name, email, phone_number FROM users
    WHERE id = $1`, [userId]);
        res.status(200).json(results.rows);
    }
    catch (error) {
        console.log("getUser error: ", error);
        res.status(400).json({ message: `Unable to get user` });
    }
};
//# sourceMappingURL=get-user.js.map