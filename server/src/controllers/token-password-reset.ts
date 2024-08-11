import { Request, Response } from 'express';
import { tokenCache } from '../middleware/token-cache.js';

interface ModifiedRequest extends Request {
  resetToken?: string;
}

export const passwordResetTokenCheck = async(req: Request, res:Response) => {
  const domain = process.env.NODE_ENV === 'production' ? 'https://www.polishbycin.com' : 'http://localhost:3000'
  try {
    const { token } = req.params;
  
    // User email stored in cache with key === token
    const resetToken = await tokenCache({ key: token, res: res });
  
    if (!resetToken) {
      res.status(400).json({ message: "Invalid/expired token" });
    } else {
      res.redirect(`${ domain }/reset-password?recovery-token=${ token }`);
    }
  } catch (error) {
    console.log('Error with password reset request', error);
    res.redirect(`${ domain }/token-expired`);
  }
};

