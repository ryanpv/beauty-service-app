export const logout = (req, res) => {
    req.session.destroy((error) => {
        if (error)
            throw error;
        res.status(400).json({ message: "Failed to log out" });
    });
    res.status(200).json({ message: "Logout successful" });
};
//# sourceMappingURL=logout.js.map