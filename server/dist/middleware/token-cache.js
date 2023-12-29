import NodeCache from "node-cache";
const resetTokenCache = new NodeCache();
export const tokenCache = ({ key, body, duration, req, res, next }) => {
    const cacheKey = key;
    if (req) {
        if (req.method === "POST") {
            resetTokenCache.set(cacheKey, body, duration);
        }
        else if (req.method === "DELETE") {
            resetTokenCache.del(cacheKey);
            next();
        }
    }
    else {
        const userEmail = resetTokenCache.get(cacheKey);
        if (userEmail) {
            return userEmail;
        }
        else {
            res.status(400).json({ message: "Invalid key" });
        }
    }
};
//# sourceMappingURL=token-cache.js.map