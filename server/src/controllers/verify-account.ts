import { Request, Response } from "express";
import { tokenCache } from "../middleware/token-cache.js";

export const verifyAccount = async (req: Request, res: Response): Promise<Response> => {
  try {
    const verificationToken = req.params.token;
    const userVerified = tokenCache({ key: verificationToken });

    if (!userVerified) {
      throw new Error ("Invalid/expired token.");
    }

    return res.status(200).json({ message: "Account has been verified." })
  } catch (error) {
    console.log("Error verifying account: ", error);
    res.status(400).json({ message: "Unable to verify account at this time. Please try again later." });
  }
};