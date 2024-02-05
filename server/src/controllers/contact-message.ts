import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { transporter } from '../nodemailer-transporter.js';

export const contactRequest = async(req: Request, res: Response) => {
  try {
    const result = validationResult(req);
    const { name, email, phone_number, subject, message } = req.body;

    if (result.isEmpty()) {
      const msgToAdmin = {
        from: email,
        to: process.env.GMAIL_ACCOUNT,
        subject: `PolishByCin - Message: ${ subject }`,
        text: `Message recieved from: ${ name ? name : null } \n
          email: ${ email }, \n
          tel: ${ phone_number } \n
          Message: \n
          ${ message } \n
        `
      };

      await transporter.sendMail(msgToAdmin);

      const msgToClient = {
        from: process.env.GMAIL_ACCOUNT,
        to: email,
        subject: `PolishByCin - Thank you for your message!`,
        text: `We have recieved the following message from you: \n
          subject: ${ subject } \n
          email: ${ email } \n
          tel: ${ phone_number } \n
          Message: \n
          ${ message } \n

        I will try to respond as soon as I can. Thank you for your patience!
        `
      };

      await transporter.sendMail(msgToClient);

    }
    
    res.status(201).json({ message: "Successfully sent contact form" });
  } catch (error) {
    console.log("Error with contact form: ", error)
    res.status(400).json({ message: "FAILED to send contact form" });
  }
};