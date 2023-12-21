import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { verify } from "jsonwebtoken";

export const isTokenValid = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const tokenHeader = req.headers.authorization;

  if (!tokenHeader || !tokenHeader.startsWith("Bearer ")) {
    throw new AppError("Missing bearer token", 401);
  }

  const token = tokenHeader.split(" ")[1];
  
  try {
    const decoded = verify(token, process.env.SECRET_KEY!);
    res.locals = { ...res.locals, decoded };
    return next();
  } catch (error) {
    throw new AppError("Invalid token", 401);
  }
};
