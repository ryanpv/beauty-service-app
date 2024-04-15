export const logout = (req, res) => {
    const domain = process.env.NODE_ENV === 'production' ? '.polishbycin.com' : 'localhost';
    req.session.destroy((error) => {
        if (error) {
            res.status(400).json({ message: "Failed to log out" });
        }
        else {
            console.log("user logout success");
            // res.clearCookie('id', { domain: domain });
            // res.clearCookie('user', { domain: domain });
            // res.clearCookie('connect.sid');
            res.cookie('user', null, { httpOnly: false, secure: true, sameSite: 'none', domain: domain });
            res.cookie('id', null, { httpOnly: true, secure: true, sameSite: 'none', domain: domain });
            res.status(200).json({ message: "Logout successful" });
        }
    });
};
//# sourceMappingURL=logout.js.map