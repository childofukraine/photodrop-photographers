import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const tokenSecret = process.env.TOKEN_SECRET as string;

export const getUserIdFromToken = (token: string): string => {
  const decode = jwt.verify(token, tokenSecret);
  return (decode as { userId: string; iat: number; exp: number }).userId;
};
