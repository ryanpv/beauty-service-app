import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { sendAllEmails } from '../utils/emailer-util.js';
import axios from 'axios';

export const contactRequest = async(req: Request, res: Response) => {
  try {
    const result = validationResult(req);
    const { name, email, phone_number, subject, message, captchaToken } = req.body;

    if (result.isEmpty()) {
      const verifyCaptcha = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CAPTCHA_SECRET}&response=${captchaToken}`
      );

      if (verifyCaptcha.data.success) {
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
  
        const outboundEmails = [msgToAdmin, msgToClient];
  
        sendAllEmails(outboundEmails);
        res.status(201).json({ message: "Successfully sent contact form" });
      } else {
        res.status(498).json({ message: "reCAPTCHA verification failed" });
      }
    }
    
  } catch (error) {
    console.log("Error with contact form: ", error)
    res.status(400).json({ message: "FAILED to send contact form" });
  }
};