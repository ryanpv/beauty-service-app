import { pool } from '../queries.js';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { tokenCache } from '../middleware/token-cache.js';
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD
    }
});
export const requestNewPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        const emailLowerCased = email.toLowerCase();
        // const email = 'socir16122@wikfee.com'
        const checkEmailExistence = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
        const resetPasswordURL = 'https://localhost:3001/password-resets';
        const resetToken = crypto.randomBytes(32).toString('hex');
        const emailMsg = {
            from: "test person",
            to: email,
            subject: `Password Reset for your PolishByCin account`,
            html: `<p>Click this link to reset your password!: </p><a href="${resetPasswordURL}/${resetToken}">Reset Password</a>`
        };
        console.log("lowercase email: ", emailLowerCased);
        // Check if user's email exists in DB
        if (checkEmailExistence.rowCount === 0) {
            res.status(404).json({ message: "User not found." });
        }
        else {
            const sendEmail = await transporter.sendMail(emailMsg);
            if (sendEmail.rejected.length > 0) {
                res.status(400).json({ message: "Email request has been rejected" });
            }
            else {
                tokenCache({ key: resetToken, body: emailLowerCased, duration: 120, req: req, res: res, next: next }); // Set TTL for 15 minutes for prod ***
                res.status(201).json({ message: "Password reset request email has been sent!" });
            }
        }
    }
    catch (error) {
        res.status(400).json({ message: "Error sending password reset email" });
    }
};
//# sourceMappingURL=request-password-reset.js.map