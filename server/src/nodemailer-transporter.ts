import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: process.env.GMAIL_ACCOUNT,
      pass: process.env.GMAIL_PASS
  }
});