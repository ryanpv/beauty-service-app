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
    const resetPasswordURL = 'http://localhost:3000/request-new-password';
    
    // Check if user's email exists in DB
    if (checkEmailExistence.rowCount === 0) return res.status(404).json({ message: "User not found." });
  
    const resetToken = crypto.randomBytes(32).toString('hex'); 
    const userId = checkEmailExistence.rows[0].id;
    
    resetTokenCache.set(resetToken, email, 30); // Set TTL for 15 minutes for prod ***
  
    const emailMsg = {
      from: "test person",
      to: email,
      subject: `Password Reset for your PolishByCin account`,
      text: `Click this link to reset your password: ${ resetPasswordURL }?token=${ resetToken }`
    };
  
    const sendEmail = await transporter.sendMail(emailMsg);
  
    if (sendEmail.rejected.length > 0) {
      res.status(400).json({ message: "Email request has been rejected" });
    } else {
      res.status(201).json({ message: "Password reset request email has been sent!" });
    }
  } catch (error) {
    res.status(400).json({ message: "Error sending password reset email "});
  }
};