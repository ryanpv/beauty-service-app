import { Request, Response } from 'express';
import NodeCache from 'node-cache';
import { pool } from '../queries.js';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email', // replace with gmail for prod***
  port: 587,
  auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD
  }
});

export const requestNewPassword = async(req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const resetTokenCache = new NodeCache();
    const checkEmailExistence = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
    const resetPasswordURL = 'http://localhost:3000/reset-password';
    const resetToken = crypto.randomBytes(32).toString('hex'); 
    const emailMsg = {
      from: "test person",
      to: email,
      subject: `Password Reset for your PolishByCin account`,
      html:`<p>Click this link to reset your password!: </p><a href="${ resetPasswordURL }?recovery-token=${ resetToken }">Reset Password</a>`
    };
    
    // Check if user's email exists in DB
    if (checkEmailExistence.rowCount === 0) {
      res.status(404).json({ message: "User not found." });
    } else {
      const sendEmail = await transporter.sendMail(emailMsg);

      if (sendEmail.rejected.length > 0) {
        res.status(400).json({ message: "Email request has been rejected" });
      } else {
        resetTokenCache.set(resetToken, email, 30); // Set TTL for 15 minutes for prod ***
        res.status(201).json({ message: "Password reset request email has been sent!" });
      }
    } 
    
  } catch (error) {
    res.status(400).json({ message: "Error sending password reset email "});
  }
};