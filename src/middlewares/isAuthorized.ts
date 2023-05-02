import { RequestHandler } from "express";
import Boom from "@hapi/boom";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserRepository } from "../repositories/user";

dotenv.config();

const tokenSecret = process.env.TOKEN_SECRET;

export const isAuthorized: RequestHandler = async (
  req,
  res,
  next
): Promise<void> => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw Boom.unauthorized("Invalid token.");
    }

    let userId: string;

    jwt.verify(token, tokenSecret, (err, encoded) => {
      if (err) throw Boom.unauthorized("Token expired");
      userId = (encoded as { userId: string; iat: number; exp: number }).userId;
    });

    const user = UserRepository.getUserById(userId!);
    if (!user) throw Boom.unauthorized("Invalid token.");

    next();
  } catch (err) {
    next(err);
  }
};
