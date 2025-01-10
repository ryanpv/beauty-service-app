import { Request, Response } from "express";
import { tokenCache } from "../middleware/token-cache.js";
import { pool } from "../queries.js";
import { sendEmail } from "../utils/emailer-util.js";
import crypto from 'crypto';

export const requestVerificationToken = async(req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.params.id;
    console.log(userId);
    const request = await pool.query(`
      SELECT email, name FROM users
      WHERE id = $1
    `, [userId]);

    const userEmail = request.rows[0].email;
    const name = request.rows[0].name;

    const verificationToken = crypto.randomBytes(32).toString('hex'); 
    const verificationURL = process.env.NODE_ENV === 'production' ? 'https://www.polishbycin.com/verify-account' : 'http://localhost:3000/verify-account';
    console.log("userEmail: ", userEmail);
    console.log('verificationToken', verificationToken)
    tokenCache({ key: verificationToken, body: userEmail, duration: 600, req: { method: "POST" } }); // Set TTL for 10 minutes for prod ***

    const emailMsg = {
      from: process.env.GMAIL_ACCOUNT,
      to: userEmail,
      subject: `PolishByCin - New verification link`,
      html: `
      <div>
        <p>Hello ${ name },</p>
        <p>
          Thank you for signing up with PolishByCin! We are excited to have you as a client. Before you can book and manage your appointments, please verify your email address by clicking the link below.
        </p>

        <p>This link will expire after 10 minutes: <a href="${ verificationURL }?verification-token=${ verificationToken }">Email verification for PolishByCin</a></p>
        <br></br>

        <p>
        After verification, you will only receive emails for appointment bookings, appointment updates/cancellations, responses to inquiries sent from the contact page or by direct emails.
        Feel free to reach out if you have any questions/concerns.
        </p>
        <br></br>

        <p>Thank you again for registering!</p>
        <br></br>

        <p>PolishByCin</p>
      </div>       
      `
    };

    sendEmail(emailMsg);

    return res.status(200).json({ message: "Verification link sent." });
  } catch (error) {
    console.log("Error: ", error)
    res.status(400).json({ message: "Unable to request new verification link at this time. Please try again later." });
  }
};