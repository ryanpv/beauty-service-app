import NodeCache from 'node-cache';
const cache = new NodeCache();
export const routeCache = (duration) => ({ req, res, next }) => {
    const key = req.originalUrl.replace(/%20/g, '') + req.sessionID;
    const cacheResponse = cache.get(key);
    if (req.method === "POST" || req.method === "DELETE") {
        cache.del(key);
        return next();
    }
    if (cacheResponse) {
        res.status(200).json(cacheResponse);
    }
    else {
        // store
        cache.set(key, res.send, duration);
        next();
    }
};
//# sourceMappingURL=route-cache.js.map