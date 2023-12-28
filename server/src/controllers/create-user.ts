import { Request, Response } from "express";
import { pool } from '../queries.js';
import bcrypt from 'bcrypt';

const checkExistingUser = async(emailToCheck: string): Promise<boolean> => { 
  const result = await pool.query(`
  SELECT name, email FROM users
    WHERE email = $1
  `, [emailToCheck]);

  return result.rowCount > 0;
};

export const createUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, email, phone_number, password, role_id } = req.body;
    const existingUser: boolean = await checkExistingUser(email);

    if (existingUser) {
      console.log("exists")
      res.status(409).json({ message: "Email already exists" });
    } else {
      const hashPassword = await bcrypt.hash(password, 10)

      const newUser = await pool.query(`
        INSERT INTO users (name, email, phone_number, password, role_id)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id
      `, [name, email, phone_number, hashPassword, role_id]
      );  

      return res.status(201).json({ message: `Successfully created user with id ${ newUser.rows[0].id }`})
    }
  } catch (error) {
    console.log("createUser error: ", error);
    res.status(400).json({ message: "Unsuccessful attempt to create user." });
  }
};