import express, { NextFunction, Request, Response } from 'express';
import NodeCache from 'node-cache';
import { Session } from 'express-session';

const cache = new NodeCache();

type RouteCacheArgs = {
  req: Request;
  res: Response;
  next: NextFunction;
};

interface CachedResponse extends Response {
  originalJsonRes: Response['json'];
};

type ServiceResponse = {
  id: number;
  service_name: string;
  price: string;
  description: string;
  service_categories_id: number;
  duration: number;
  service_category_name: string;
}[];


const routeCache = (duration: number) => (req: Request, res: Response, next: NextFunction) => {
  const key = req.originalUrl.replace(/%20/g, ''); // simple cache key because asset changes infrequently and is for all users
  const cacheResponse = cache.get(key);

  if (req.method === "POST" || req.method === "DELETE") {    
    cache.del(key);

    return next();
  }

  if (cacheResponse) {  
    
    res.status(200).json(cacheResponse);
  } else {
    (res as CachedResponse).originalJsonRes = res.json;

    res.json = (responseBody: ServiceResponse) => {
      cache.set(key, responseBody, duration)
      return (res as CachedResponse).status(200).originalJsonRes(responseBody);
    };
    
    next();
  }
};

export default routeCache;