import { Request, Response, NextFunction } from "express";
import { pool } from "../queries.js";
import { ModifiedSession } from "../controllers/login.js";


export const accountVerification = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const clientSession = req.session as ModifiedSession;

    const checkUserVerification = await pool.query(`
      SELECT
        users.email,
        user_verifications.is_verified
      FROM users
      JOIN user_verifications
        ON users.id = user_verifications.user_id
      WHERE users.id = $1 AND users.email = $2
    `, [clientSession.userId, clientSession.userEmail]);

    if (checkUserVerification.rows[0].is_verified === false) {
      throw new Error("Account not verified.");
    } else {
      next();
    }
  } catch (error) {
    console.error("Error verifying account: ", error);
    res.status(403).json({ message: "Unable to verify account. Access denied." });
  }
};