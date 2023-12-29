import { Request, Response } from 'express';
import { tokenCache } from '../middleware/token-cache.js';

interface ModifiedRequest extends Request {
  resetToken?: string;
}

export const passwordResetTokenCheck = async(req: Request, res:Response) => {
  const { token } = req.params;
  // const resetTokenCache = new NodeCache();

  // User email stored in cache with key === token
  const resetToken = await tokenCache({ key: token, res: res });
  console.log("resettoken: ", resetToken)

  if (!resetToken) {
    res.status(400).json({ message: "Invalid/expired token" });
  } else {
    res.redirect(`http://localhost:3000/reset-password?recovery-token=${ token }`);
  }
};

