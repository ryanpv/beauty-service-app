import { tokenCache } from '../middleware/token-cache.js';
export const passwordResetTokenCheck = async (req, res) => {
    try {
        const { token } = req.params;
        // User email stored in cache with key === token
        const resetToken = await tokenCache({ key: token, res: res });
        if (!resetToken) {
            res.status(400).json({ message: "Invalid/expired token" });
        }
        else {
            res.redirect(`http://localhost:3000/reset-password?recovery-token=${token}`);
        }
    }
    catch (error) {
        console.log('Error with password reset request', error);
        res.redirect('http://localhost:3000/token-expired');
    }
};
//# sourceMappingURL=token-password-reset.js.map