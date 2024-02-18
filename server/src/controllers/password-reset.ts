import { Request, Response } from "express";
import { pool } from "../queries.js";
import { tokenCache } from "../middleware/token-cache.js";
import bcrypt from 'bcrypt';
import { sendEmail } from "../utils/emailer-util.js";

export const passwordReset = async(req: Request, res: Response) => {
  try {
    const { newPassword } = req.body;
    const { token } = req.params;
  
    // Re-check reset token and acquire user's email through that
    const userEmail = tokenCache({ key: token, res: res });
    const hashPassword = await bcrypt.hash(newPassword, 10);
    
    if (userEmail) {
      const updatePassword = await pool.query(`
        UPDATE users
          SET password = $1
        WHERE email = $2
      `,[hashPassword, userEmail]);

      if (updatePassword.rowCount !== 1) {
        throw new Error();
      } else {
        const emailMsg = {
          from: process.env.GMAIL_ACCOUNT,
          to: userEmail,
          subject: `PolishByCin - Thank you for signing up!`,
          html: `
          <div>
            <p>Hello,</p>
            <p>
              You have successfully created an account with us at PolishByCin. You will now be able to track your appointments, see appointment status updates, and request 
              changes to your appointments.
            </p>
            <p>
            You will only receive emails for appointment bookings, appointment updates/cancellations, responses to inquiries sent from the contact page or by direct emails.
            Feel free to reach out if you have any questions/concerns.
            </p>
            <br></br>
  
            <p>Thank you again for registering!</p>
            <br></br>
  
            <p>PolishByCin</p>
          </div>       
          `
        };

        sendEmail(emailMsg)
  
        res.status(201).json({ message: "Password changed!" });
      }
    }
  } catch (error) {
    console.log('password change failed', error);
    res.status(400).json({ message: `Failed to change password. ${ error }` });
  }
};