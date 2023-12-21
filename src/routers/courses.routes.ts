import { Router } from "express";
import {
  addUserToCourseController,
  createCourseController,
  deleteUserFromCourseController,
  readCourseController
} from "../controllers/courses.controllers";
import { validateBody } from "../middlewares/validateBody.middleware";
import { createCourseSchema } from "../schemas/courses.schemas";
import { isTokenValid } from "../middlewares/isTokenValid.middleware";
import { verifyUserPermission } from "../middlewares/verifyUserPermission.middleware";
import { listUserCoursesController } from "../controllers/users.controllers";
import { validateAdmin } from "../middlewares/validateAdmin.middleware";
import { doesCourseExist } from "../middlewares/doesCourseExist.middleware";
import { doesUserExist } from "../middlewares/doesUserExist.middleware";

export const courseRouter: Router = Router();

courseRouter.post(
  "",
  validateBody(createCourseSchema),
  isTokenValid,
  validateAdmin,
  createCourseController
);

courseRouter.get("", 
readCourseController
);

courseRouter.post(
  "/:courseId/users/:userId",
  isTokenValid,
  verifyUserPermission,
  doesCourseExist,
  addUserToCourseController
);

courseRouter.delete(
  "/:courseId/users/:userId",
  isTokenValid,
  verifyUserPermission,
  doesCourseExist,
  doesUserExist,
  deleteUserFromCourseController
);

courseRouter.get("/:id/users", isTokenValid, verifyUserPermission, listUserCoursesController,);