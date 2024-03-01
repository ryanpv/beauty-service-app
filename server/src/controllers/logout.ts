import { Request, Response } from "express";

export const logout = (req: Request, res: Response) => {
  const domain = process.env.NODE_ENV === 'production' ? '.polishbycin.com' : 'localhost'

  req.session.destroy((error) => {
    if (error) {    
      res.status(400).json({ message: "Failed to log out" });
    } else {      
      res.clearCookie('id', { domain: domain });
      res.clearCookie('user', { domain: domain });

      res.status(200).json({ message: "Logout successful" });
    }
  });
};