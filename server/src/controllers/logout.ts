import { Request, Response } from "express";

export const logout = (req: Request, res: Response) => {
  req.session.destroy((error) => {
    if (error) {
      res.status(400).json({ message: "Failed to log out" });
    } else {
      res.clearCookie('userRole');
      res.clearCookie('currentUser');

      res.status(200).json({ message: "Logout successful" });
    }
  });
};