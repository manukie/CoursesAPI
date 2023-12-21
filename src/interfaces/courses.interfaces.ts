import { z } from "zod";
import { QueryResult } from "pg";
import {
  createCourseSchema,
  courseSchema,
  readCourseSchema,
} from "../schemas/courses.schemas";

type Course = z.infer<typeof courseSchema>;
type CoursesRequest = z.infer<typeof createCourseSchema>;
type CourseResult = QueryResult<Course>;
type CourseRead = z.infer<typeof readCourseSchema>

export { Course, CoursesRequest, CourseResult, CourseRead };