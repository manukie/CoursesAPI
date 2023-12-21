import { Router } from "express";
import {
  createUserController,
  listUserCoursesController,
  readUserController,
} from "../controllers/users.controllers";
import { validateBody } from "../middlewares/validateBody.middleware";
import { createUserSchema } from "../schemas/users.schemas";
import { isTokenValid } from "../middlewares/isTokenValid.middleware";
import { verifyUserPermission } from "../middlewares/verifyUserPermission.middleware";
import { verifyEmailExists } from "../middlewares/verifyEmailExists.middleware";

export const userRouter: Router = Router();

userRouter.post(
  "",
  validateBody(createUserSchema),
  verifyEmailExists,
  createUserController
);

userRouter.get("", isTokenValid, verifyUserPermission, readUserController);

userRouter.get("/:id/courses", isTokenValid, verifyUserPermission, listUserCoursesController);