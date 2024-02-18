import { transporter } from '../nodemailer-transporter.js';

export const sendEmail = async(email) => {
  try {
    await transporter.sendMail(email);
    console.log("Email sent successfully.")
  } catch (error) {
    console.log("Unsuccessful email attempt: ", error);
  }
};

export const sendAllEmails = async(emails) => {
  try {
    await Promise.all(emails.map(sendEmail));
    console.log("Successfully sent ALL emails.");
  } catch (error) {
    console.log("Failed to send emails: ", error);
  }
};