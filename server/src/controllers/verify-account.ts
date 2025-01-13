import { Request, Response } from "express";
import { tokenCache } from "../middleware/token-cache.js";
import { pool } from "../queries.js";
import { ModifiedSession } from "./login.js";

export const verifyAccount = async (req: Request, res: Response): Promise<Response> => {
  try {
    const verificationToken = req.params.token;
    const userVerifiedEmail = tokenCache({ key: verificationToken });

    if (!userVerifiedEmail) {
      throw new Error ("Invalid/expired token.");
    }

    const updateVerification = await pool.query(`
        UPDATE user_verifications
        SET is_verified = TRUE
        FROM users
        WHERE user_verifications.user_id = users.id
          AND users.email = $1 
      `, [userVerifiedEmail]);

      if (updateVerification.rowCount < 1) {
      throw new Error("Account not found or already verified.");
    }

    // update session data to reflect verification
    (req.session as ModifiedSession).isVerified = true;

    return res.status(200).json({ message: "Account has been verified." })
  } catch (error) {
    console.log("Error verifying account: ", error);
    res.status(400).json({ message: "Unable to verify account at this time. Please try again later." });
  }
};