import express, { NextFunction, Request, Response } from 'express';
import NodeCache from 'node-cache';
import { Session } from 'express-session';

const cache = new NodeCache();

type RouteCacheArgs = {
  req: Request;
  res: Response;
  next: NextFunction;
};

export const routeCache = (duration: number) => ({ req, res, next }: RouteCacheArgs) => {
  const key = req.originalUrl.replace(/%20/g, '') + req.sessionID;
  const cacheResponse = cache.get(key);
  
  if (req.method === "POST" || req.method === "DELETE") {
    cache.del(key);

    return next();
  }

  if (cacheResponse) {
    res.status(200).json(cacheResponse);
  } else {
    // store
    cache.set(key, res.send, duration)

    next();
  }
};