import { hash } from "bcryptjs";
import {
    UserRequest,
    UserResult,
    UserReturn,
    UserRead,
} from "../interfaces/users.interfaces";
import format from "pg-format";
import { client } from "../database";
import { userWithoutPassword, readUserSchema } from "../schemas/users.schemas";
import { AppError } from "../errors";

const createUserService = async (
    userData: UserRequest
): Promise<UserReturn> => {
    userData.password = await hash(userData.password, 10);

    const queryString: string = format(
        `
    INSERT INTO "users" (%I)
    VALUES (%L)
    RETURNING *;
    `,
        Object.keys(userData),
        Object.values(userData)
    );

    const queryResult: UserResult = await client.query(queryString);

    return userWithoutPassword.parse(queryResult.rows[0]);
};

const readUserService = async (): Promise<UserRead> => {
    const queryResult: UserResult = await client.query('SELECT * FROM "users";');

    return readUserSchema.parse(queryResult.rows);
  };

const listUsersCoursesService = async (userId: string) => {
  const queryString: string = `
  SELECT 
    c.id "courseId",
    c."name" "courseName",
    c.description "courseDescription",
    uc.active "userActiveInCourse",
    u.id "userId",
    u."name" "userName"
  FROM users u 
  JOIN "userCourses" uc
    ON u.id = uc."userId" 
  JOIN courses c 
    ON c.id = uc."courseId" 
  WHERE u.id = $1;
`;

    const queryResult = await client.query(queryString, [userId]);

    if (!queryResult.rowCount) {
        throw new AppError("No course found", 404);
    }

    return queryResult.rows;
};


export { createUserService, listUsersCoursesService, readUserService }