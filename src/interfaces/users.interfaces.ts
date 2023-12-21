import { z } from "zod";
import { QueryResult } from "pg";
import {
  createUserSchema,
  userSchema,
  userWithoutPassword,
  readUserSchema,
} from "../schemas/users.schemas";

type Users = z.infer<typeof userSchema>;
type UserRequest = z.infer<typeof createUserSchema>;
type UserReturn = z.infer<typeof userWithoutPassword>;
type UserRead = z.infer<typeof readUserSchema>
type UserResult = QueryResult<Users>;

export { Users, UserRequest, UserReturn, UserResult, UserRead };