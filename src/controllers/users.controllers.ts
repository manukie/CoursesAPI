import { Request, Response } from "express";
import {
  createUserService,
  listUsersCoursesService,
  readUserService,
} from "../services/users.services";
import { UserRead } from "../interfaces/users.interfaces";

const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const newUser = await createUserService(req.body);

  return res.status(201).json(newUser);
};

const readUserController = async (req: Request, res: Response): Promise<Response> => {
  const users: UserRead = await readUserService();
  return res.status(200).json(users);
};

const listUserCoursesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userCourses = await listUsersCoursesService(req.params.id);

  return res.status(200).json(userCourses);
};

export {
  createUserController,
  listUserCoursesController,
  readUserController,
};