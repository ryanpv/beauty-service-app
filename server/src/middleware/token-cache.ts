import { NextFunction, Request, Response } from "express";
import NodeCache from "node-cache";

export const resetTokenCache = new NodeCache();

type tokenCacheParams = {
  key: string;
  body?: string;
  duration?: number;
  req?: Request;
  res: Response;
  next?: NextFunction;
}

export const tokenCache = ({ key, body, duration, req, res, next }: tokenCacheParams) => {
  const cacheKey = key;

  if (req) {
    if (req.method === "POST") {
      resetTokenCache.set(cacheKey, body, duration);
    } else if (req.method === "DELETE") {
      resetTokenCache.del(cacheKey);
      next();
    }
  } else {
    const userEmail = resetTokenCache.get(cacheKey);

    if (userEmail) {
      return userEmail;
    } else {
      throw new Error ("Invalid key.")
    }
  }
  
};