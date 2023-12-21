import { Router } from "express";
import { sessionController } from "../controllers/session.controllers";
import { sessionSchema } from "../schemas/session.schemas";
import { validateBody } from "../middlewares/validateBody.middleware";

export const sessionRouter: Router = Router();

sessionRouter.post(
  "",
  validateBody(sessionSchema),
  sessionController
);