import { NextFunction, Request, Response } from "express";
import { UserResult } from "../interfaces/users.interfaces";
import { client } from "../database";
import { AppError } from "../errors";

export const doesCourseExist = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { courseId } = req.params;
  if (!courseId) {
    return next()
  }

  const query: UserResult = await client.query(
    'SELECT * FROM "courses" WHERE "id" = $1',
    [courseId]
  );

  if (query.rowCount === 0) {
    throw new AppError("User/course not found", 404);
  }

  res.locals = { ...res.locals, foundCourse: query.rows[0] };

  return next();
};