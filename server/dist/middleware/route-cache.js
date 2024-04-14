import NodeCache from 'node-cache';
const cache = new NodeCache();
;
const routeCache = (duration) => async (req, res, next) => {
    try {
        const key = req.originalUrl.replace(/%20/g, ''); // simple cache key because asset changes infrequently and is for all users
        const cacheResponse = cache.get(key);
        if (req.method === "POST" || req.method === "DELETE") {
            cache.del(key);
            return next();
        }
        if (cacheResponse) {
            res.status(200).json(cacheResponse);
        }
        else {
            res.originalJsonRes = res.json;
            res.json = (responseBody) => {
                cache.set(key, responseBody, duration);
                return res.status(200).originalJsonRes(responseBody);
            };
            next();
        }
    }
    catch (error) {
        res.status(400).json({ message: "Cache error for database" });
    }
};
export default routeCache;
//# sourceMappingURL=route-cache.js.map