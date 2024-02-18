import { pool } from "../queries.js";
import { tokenCache, resetTokenCache } from "../middleware/token-cache.js";
import bcrypt from 'bcrypt';
import { sendEmail } from "../utils/emailer-util.js";
export const passwordReset = async (req, res) => {
    try {
        const { newPassword } = req.body;
        const { token } = req.params;
        // Re-check reset token and acquire user's email through that
        const userEmail = tokenCache({ key: token, res: res });
        const hashPassword = await bcrypt.hash(newPassword, 10);
        if (userEmail) {
            const updatePassword = await pool.query(`
        UPDATE users
          SET password = $1
        WHERE email = $2
      `, [hashPassword, userEmail]);
            if (updatePassword.rowCount !== 1) {
                throw new Error();
            }
            else {
                const emailMsg = {
                    from: process.env.GMAIL_ACCOUNT,
                    to: userEmail,
                    subject: `PolishByCin - Account Changes`,
                    html: `
          <div>
            <p>Hello,</p>
            <p>
              You have successfully updated your password. If this was not you, please contact us and we'll fix it for you.
            </p>
            <br></br>
  
            <p>Thank you!</p>
            <br></br>
  
            <p>PolishByCin</p>
          </div>       
          `
                };
                sendEmail(emailMsg);
                resetTokenCache.del(token);
                res.status(201).json({ message: "Password changed!" });
            }
        }
    }
    catch (error) {
        console.log('password change failed', error);
        res.status(400).json({ message: `Failed to change password. ${error}` });
    }
};
//# sourceMappingURL=password-reset.js.map