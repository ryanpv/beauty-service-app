import { Request, Response } from "express";
import { pool } from "../queries.js";
import { ModifiedSession } from "./login.js";

export const deleteUser = (req: Request, res: Response) => {
  const { userId } = req.params;
  const userRole = (req.session as ModifiedSession).userRole;
  const clientSession = req.sessionID;
  const clientCookie = req.cookies.id;
  const authorizedUser = clientCookie === clientSession && clientCookie !== undefined && clientSession !== undefined;

  if (userRole === 'admin' && authorizedUser) {
    pool.query(`
      DELETE FROM users
      WHERE id = $1
    `, [userId], (error, results) => {
      if (error) {
        res.status(400).json({ message: "Unable to delete user." });
      }
      res.status(200).send(`Deleted user with id: ${ userId }`)
    }); 
  } else {
    res.status(403).json({ message: "Unauthorized. Please check credentials." });
  }
};