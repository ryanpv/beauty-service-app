import { Request, Response } from "express";

export const logout = (req: Request, res: Response) => {
  req.session.destroy((error) => {
    if (error) throw error;
    res.status(400).json({ message: "Failed to log out" });
  });
  res.status(200).json({ message: "Logout successful" });
};