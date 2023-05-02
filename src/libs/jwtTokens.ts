import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

dotenv.config();

const tokenSecret = process.env.TOKEN_SECRET;

export const createTokens = (userId: string): {accessToken: string,refreshToken: string} => {
  const accessToken = jwt.sign(
    {
      userId,
    },
    tokenSecret,
    {
      expiresIn: "24h",
    }
  );
  const refreshToken = uuidv4();
  const tokens = {
    accessToken,
    refreshToken,
  };
  return tokens;
};
