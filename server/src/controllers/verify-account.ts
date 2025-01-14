import { Request, Response } from "express";
import { tokenCache } from "../middleware/token-cache.js";
import { pool } from "../queries.js";
import { ModifiedSession } from "./login.js";
import jwt from 'jsonwebtoken';

export const verifyAccount = async (req: Request, res: Response): Promise<Response> => {
  try {
    const verificationToken = req.params.token;
    const userVerifiedEmail = tokenCache({ key: verificationToken });
    const session = req.session as ModifiedSession;
    const domain = process.env.NODE_ENV === 'production' ? '.polishbycin.com' : 'localhost'

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

    // sign new jwt with updated session data
    const payload = {
      id: session.userId,
      role: session.userRole,
      displayName: session.name,
      iat: Math.floor(Date.now() / 1000),
      isVerified: session.isVerified
    };

    const updateJWT = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: "24h"
      }
    );

    // clear old cookie and set new cookie with updated jwt
    res.clearCookie('user', { domain: domain });
    res.cookie('user', updateJWT, { httpOnly: false, secure: true, sameSite: 'none', domain: domain });


    return res.status(200).json({ message: "Account has been verified." })
  } catch (error) {
    console.log("Error verifying account: ", error);
    res.status(400).json({ message: "Unable to verify account at this time. Please try again later." });
  }
};