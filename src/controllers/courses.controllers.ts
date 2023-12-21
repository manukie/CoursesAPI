import { Response, Request } from "express";
import {
  addUserToCourseService,
  createCourseService,
  deleteUserFromCourseService,
  readCourseService,
  listCourseUsersService,
} from "../services/courses.services";
import { CourseRead } from "../interfaces/courses.interfaces";

const createCourseController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const newCourse = await createCourseService(req.body);

  return res.status(201).json(newCourse);
};

const readCourseController = async (req: Request, res: Response): Promise<Response> => {
  const courses: CourseRead = await readCourseService();
  return res.status(200).json(courses);
};

const addUserToCourseController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { userId, courseId } = req.params;

  await addUserToCourseService(userId, courseId);

  return res.status(201).json({ message: "User successfully vinculed to course" });
};

const deleteUserFromCourseController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { userId, courseId } = req.params;

  await deleteUserFromCourseService(userId, courseId);
  return res.status(204).json();
};

const listCourseUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const courseUsers = await listCourseUsersService(req.params.id);

  return res.status(200).json(courseUsers);
};

export {
  createCourseController,
  addUserToCourseController,
  deleteUserFromCourseController,
  readCourseController,
  listCourseUsersController,
};