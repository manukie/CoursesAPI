import { compare } from "bcryptjs";
import { client } from "../database";
import { AppError } from "../errors";
import { UserResult } from "../interfaces/users.interfaces";
import { SessionRequest } from "../interfaces/session.interfaces";
import { sign } from "jsonwebtoken";

export const createSessionService = async (
  sessionData: SessionRequest
): Promise<string> => {
  const queryString: string = `
    SELECT * FROM users
    WHERE email = $1;
  `;

  const queryResult: UserResult = await client.query(queryString, [
    sessionData.email,
  ]);

  if (!queryResult.rowCount) {
    throw new AppError("Wrong email/password", 401);
  }

  const matchPassword: boolean = await compare(
    sessionData.password,
    queryResult.rows[0].password
  );

  if (!matchPassword) {
    throw new AppError("Wrong email/password", 401);
  }

  const token: string = sign(
    { email: queryResult.rows[0].email },
    process.env.SECRET_KEY!,
    {
      expiresIn: process.env.EXPIRES_IN!,
      subject: queryResult.rows[0].id.toString(),
    }
  );

  return token;
};