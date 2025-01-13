import { Request, Response } from "express";
import { pool } from '../queries.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Session } from "express-session";
import { validationResult } from "express-validator";
import { sendEmail } from "../utils/emailer-util.js";
import crypto from 'crypto';
import { tokenCache } from "../middleware/token-cache.js";
import { ModifiedSession } from "./login.js";


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
      // const adminRole = 2;
  
      if (existingUser) {
        console.log("exists")
        res.status(409).json({ message: "Email already exists" });
      } else {
        const hashPassword = await bcrypt.hash(password, 10)
 
        await pool.query(`
          CREATE OR REPLACE FUNCTION create_user(
            name TEXT,
            email TEXT,
            phone_number TEXT,
            password TEXT,
            role_id INT
          )
          RETURNS INT
          LANGUAGE plpgsql
          AS
          $BODY$
          DECLARE
            new_user_id INT;
          BEGIN
            INSERT INTO users (name, email, phone_number, password, role_id)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id INTO new_user_id;

            RAISE NOTICE 'User inserted successfully with ID: %', new_user_id;

            INSERT INTO user_verifications (user_id, is_verified)
            VALUES (new_user_id, FALSE);

            RAISE NOTICE 'User verification inserted successfully with ID: %', new_user_id;

            RETURN new_user_id;

            EXCEPTION WHEN OTHERS THEN
              RAISE NOTICE 'Error: %', SQLERRM;
              RETURN -1;
          END;
          $BODY$
        `, []);  

        const createUser = await pool.query(`
            SELECT * from create_user($1, $2, $3, $4, $5)
          `,[name, emailLowerCased, phone_number, hashPassword, clientRole]);

        if (createUser.rows[0].create_user === null || createUser.rows[0].create_user === -1) {
          throw new Error("Error creating user");
        }

        const userEmail = emailLowerCased;
        const userId = createUser.rows[0].create_user;
        const userRole = clientRole;
        const userDisplayName = name;

        const verificationToken = crypto.randomBytes(32).toString('hex'); 
        const verificationURL = process.env.NODE_ENV === 'production' ? 'https://www.polishbycin.com/verify-account' : 'http://localhost:3000/verify-account';

        const payload = {
          id: userId,
          role: userRole,
          displayName: userDisplayName,
          iat: Math.floor(Date.now() / 1000),
          isVerified: false
        };
        const jwtToken = jwt.sign(
          payload,
          process.env.JWT_SECRET,
          {
            expiresIn: "24h"
          }
        );
  
        (req.session as ModifiedSession).isAuthenticated = true;
        (req.session as ModifiedSession).userRole = "client";
        (req.session as ModifiedSession).accessToken = jwtToken;
        (req.session as ModifiedSession).userEmail = userEmail;
        (req.session as ModifiedSession).userId = userId;
        (req.session as ModifiedSession).isVerified = false;
  
        const domain = process.env.NODE_ENV === 'production' ? '.polishbycin.com' : 'localhost'

        res.cookie('user', jwtToken, { httpOnly: false, secure: true, sameSite: 'none', domain: domain });
        res.cookie('id', req.sessionID, { httpOnly: true, secure: true, sameSite: 'none', domain: domain });

        tokenCache({ key: verificationToken, body: userEmail, duration: 600, req: req }); // Set TTL for 10 minutes for prod ***

        const emailMsg = {
          from: process.env.GMAIL_ACCOUNT,
          to: userEmail,
          subject: `PolishByCin - Thank you for signing up!`,
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
  
        return res.status(201).json({ message: `Successfully created user with id ${ createUser.rows[0].create_user }`});  
      }
    } else {
      throw new Error("INVALID sign up credentials")
    }
  } catch (error) {
    console.log("createUser error: ", error);
    res.status(400).json({ message: "Unsuccessful attempt to create user." });
  }
};