export const logout = (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            res.status(400).json({ message: "Failed to log out" });
        }
        else {
            res.clearCookie('id');
            res.clearCookie('user');
            res.status(200).json({ message: "Logout successful" });
        }
    });
};
//# sourceMappingURL=logout.js.map