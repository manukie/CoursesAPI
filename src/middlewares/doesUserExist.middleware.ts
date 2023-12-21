import { NextFunction, Request, Response } from "express";
import { UserResult } from "../interfaces/users.interfaces";
import { client } from "../database";
import { AppError } from "../errors";

export const doesUserExist = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { courseId } = req.params;

  const query: UserResult = await client.query(
    'SELECT * FROM "users" WHERE "id" = $1',
    [courseId]
  );

  if (query.rowCount === 0) {
    throw new AppError("User/course not found", 404);
  }

  res.locals = { ...res.locals, foundUser: query.rows[0] };

  return next();
};