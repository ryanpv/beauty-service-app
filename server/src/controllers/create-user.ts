import { Request, Response } from "express";
import { pool } from '../queries.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Session } from "express-session";
import { validationResult } from "express-validator";
import { sendEmail } from "../utils/emailer-util.js";


interface ModifiedSession extends Session {
  isAuthenticated: boolean;
  userRole: string;
  accessToken: string; 
}

export const createUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const result = validationResult(req);
    if (result.isEmpty()) {
      const checkExistingUser = async(emailToCheck: string): Promise<boolean> => { 
        const result = await pool.query(`
        SELECT name, email FROM users
          WHERE email = $1
        `, [emailToCheck]);
      
        return result.rowCount > 0;
      };
  
      const { name, email, phone_number, password } = req.body;
      const emailLowerCased = email.toLowerCase();
      const existingUser: boolean = await checkExistingUser(email);
      const clientRole = 1;
      const adminRole = 2;
  
      if (existingUser) {
        console.log("exists")
        res.status(409).json({ message: "Email already exists" });
      } else {
        const hashPassword = await bcrypt.hash(password, 10)
  
        const newUser = await pool.query(`
          INSERT INTO users (name, email, phone_number, password, role_id)
          VALUES ($1, $2, $3, $4, $5)
          RETURNING id
        `, [name, emailLowerCased, phone_number, hashPassword, clientRole]
        );  
  
        const userEmail = emailLowerCased;
        const userId = newUser.rows[0].id;
        const userRole = clientRole;
        const userDisplayName = newUser.rows[0].name;
  
        const payload = {
          id: userId,
          role: userRole,
          displayName: userDisplayName,
          iat: Math.floor(Date.now() / 1000)
        }
        const jwtToken = jwt.sign(
          payload,
          process.env.JWT_SECRET,
          {
            expiresIn: "24h"
          });
  
        (req.session as ModifiedSession).isAuthenticated = true;
        (req.session as ModifiedSession).userRole = "client";
        (req.session as ModifiedSession).accessToken = jwtToken;
  
        res.cookie("user", jwtToken, { httpOnly: false, secure: true, domain: 'https://beauty-service-app-1.onrender.com' });
        res.cookie('id', req.sessionID, { httpOnly: true, secure: true, domain: 'https://beauty-service-app-1.onrender.com' });

        const emailMsg = {
          from: process.env.GMAIL_ACCOUNT,
          to: userEmail,
          subject: `PolishByCin - Thank you for signing up!`,
          html: `
          <div>
            <p>Hello ${ name },</p>
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

        sendEmail(emailMsg);
  
        return res.status(201).json({ message: `Successfully created user with id ${ newUser.rows[0].id }`});
      }
    } else {
      throw new Error("INVALID sign up credentials")
    }
  } catch (error) {
    console.log("createUser error: ", error);
    res.status(400).json({ message: "Unsuccessful attempt to create user." });
  }
};