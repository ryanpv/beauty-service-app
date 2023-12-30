import { Request, Response } from "express";
import { pool } from "../queries.js";
import { tokenCache } from "../middleware/token-cache.js";
import bcrypt from 'bcrypt';

export const passwordReset = async(req: Request, res: Response) => {
  try {
    const { newPassword } = req.body;
    const { token } = req.params;
  
    // Re-check reset token and acquire user's email through that
    const userEmail = tokenCache({ key: token, res: res });
    const hashPassword = await bcrypt.hash(newPassword, 10);
    
    console.log("useremail results: ", userEmail)
    console.log("reqbody: ", req.body)
    console.log("token" , token)
    
    if (userEmail) {
      await pool.query(`
        UPDATE users
          SET password = $1
        WHERE email = $2
      `,[hashPassword, userEmail]);
      res.status(201).json({ message: "Password changed!" });
    } else {
      res.status(400).json({ message: "User email does not exist" });
    }
  } catch (error) {
    res.status(400).json({ message: "Failed to change password" });
  }
};