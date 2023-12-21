import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

export const validateAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { admin } = res.locals.decoded;
  if (!admin) throw new AppError("Insufficient permission", 403);

  return next();
};