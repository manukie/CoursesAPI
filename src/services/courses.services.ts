import format from "pg-format";
import { client } from "../database";
import {
  Course,
  CourseRead,
  CourseResult,
  CoursesRequest,
} from "../interfaces/courses.interfaces";
import { readCourseSchema } from "../schemas/courses.schemas";
import { AppError } from "../errors";

const createCourseService = async (
  projectData: CoursesRequest
): Promise<Course> => {
  const queryString: string = format(
    `
    INSERT INTO "courses" (%I)
    VALUES (%L)
    RETURNING *;
    `,
    Object.keys(projectData),
    Object.values(projectData)
  );

  const queryResult: CourseResult = await client.query(queryString);

  return queryResult.rows[0];
};

const readCourseService = async (): Promise<CourseRead> => {
  const queryResult: CourseResult = await client.query('SELECT * FROM "courses";');

  return readCourseSchema.parse(queryResult.rows);
};

const addUserToCourseService = async (
  userId: string,
  courseId: string
): Promise<void> => {
  const queryString: string = `
    INSERT INTO "userCourses"
      ("userId", "courseId")
    VALUES ($1, $2)
    RETURNING *;
  `;

  await client.query(queryString, [userId, courseId]);
};

const deleteUserFromCourseService = async (
  developerId: string,
  projectId: string
): Promise<void> => {
  const queryString: string = `
    UPDATE "userCourses"
    SET active = false
    WHERE "userId" = $1
    AND "courseId" = $2;
  `;

  await client.query(queryString, [developerId, projectId]);
};

const listCourseUsersService = async (courseId: string) => {
  const queryString: string = `
  SELECT 
    u.id "userId",
    u."name" "userName",
    c.id "courseId",
    c."name" "courseName",
    c.description "courseDescription",
    uc.active "userActiveInCourse"
  FROM courses c 
  JOIN "userCourses" uc
    ON c.id = uc."courseId" 
  JOIN users u
    ON u.id = uc."userId" 
  WHERE c.id = $1;
`;

  const queryResult = await client.query(queryString, [courseId]);

  if (!queryResult.rowCount) {
      throw new AppError("No user found", 404);
  }

  return queryResult.rows;
};

export {
  createCourseService,
  addUserToCourseService,
  deleteUserFromCourseService,
  readCourseService,
  listCourseUsersService,
};