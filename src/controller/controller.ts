import { RequestHandler } from "express";
import Boom from "@hapi/boom";
import bcryptjs from "bcryptjs";
import { v4 as uuid } from "uuid";
import {
  LogInRequest,
  AccessTokenInResponse,
  RefreshTokensRequest,
  SignUpRequest,
  SignUpResponse,
  TypedResponse,
  UserLogin,
} from "../types";
import { UserRepository } from "../repositories/user";
import User from "../entities/user";
import { createTokens } from "../libs/jwtTokens";
import { Session } from "../entities/session";
import { SessionRepository } from "../repositories/session";

export class Controller {
  static getAllUsers: RequestHandler = async (
    req,
    res: TypedResponse<UserLogin[]>,
    next
  ) => {
    try {
      const users = await UserRepository.getAllUsers();
      if (!users) throw Boom.notFound();
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  };

  static signUp: RequestHandler = async (
    req: SignUpRequest,
    res: TypedResponse<SignUpResponse>,
    next
  ) => {
    const login = req.body.login.toLowerCase();
    const { password, email, fullName } = req.body;

    try {
      const userExist = await UserRepository.getUsersByLogin(login);
      if (userExist)
        throw Boom.conflict(`User with login - ${login} is exist.`);

      const hashedPassword = await bcryptjs.hash(password, 7);

      const newUser = new User(login, hashedPassword, uuid(), email, fullName);

      await UserRepository.saveUser(newUser);

      res.status(200).json({ message: "User is registered.", login, password });
    } catch (err) {
      next(err);
    }
  };

  static logIn: RequestHandler = async (
    req: LogInRequest,
    res: TypedResponse<AccessTokenInResponse>,
    next
  ) => {
    const login = req.body.login.toLowerCase();
    const { password } = req.body;

    try {
      const user = await UserRepository.getUsersByLogin(login);
      if (!user) throw Boom.notFound(`User with login - ${login} isn't exist.`);

      const { userId } = user[0];
      const hashedPassword = user[0].password;

      await bcryptjs.compare(password, hashedPassword).then((same) => {
        if (!same) throw Boom.badRequest("Password is incorrect.");
      });

      const tokens = createTokens(userId);

      // session expire in - 5 days
      const refreshTokenExpTime = Math.floor(Date.now() + 432000000);
      
      const sessionExpireTimestamp = new Date(
        refreshTokenExpTime
      );

      const newSession = new Session(
        uuid(),
        userId,
        tokens.refreshToken,
        sessionExpireTimestamp as unknown as Date
      );

      await SessionRepository.saveSession(newSession);

      res
        .cookie("refreshToken", tokens.refreshToken, {
          httpOnly: true,
          sameSite: "strict",
        })
        .json({ accessToken: tokens.accessToken });
    } catch (err) {
      next(err);
    }
  };

  static refreshTokens: RequestHandler = async (
    req: RefreshTokensRequest,
    res: TypedResponse<AccessTokenInResponse>,
    next
  ) => {
    const { refreshToken } = req.cookies;

    try {
      const session = await SessionRepository.getSessionByRefreshToken(
        refreshToken
      );

      if (!session) throw Boom.badRequest("Invalid refresh token.");

      const timeStamp = new Date(Date.now()).toJSON();
      if (
        Date.parse(timeStamp) >=
        Date.parse(session[0].expiresIn as unknown as string)
      ) {
        await SessionRepository.deleteSessionById(session[0].sessionId);
        throw Boom.unauthorized("Session is expired, please log-in.");
      }

      const newTokens = createTokens(session[0].userId);

      const refreshTokenExpTime = Math.floor(Date.now() + 432000000);
      const sessionExpireTimestamp = new Date(
        refreshTokenExpTime
      );

      const newSession = new Session(
        session[0].sessionId,
        session[0].userId,
        newTokens.refreshToken,
        sessionExpireTimestamp as unknown as Date
      );

      await SessionRepository.updateSessionById(
        newSession,
        session[0].sessionId
      );

      res
        .cookie("refreshToken", newTokens.refreshToken, {
          httpOnly: true,
          sameSite: "strict",
        })
        .json({ accessToken: newTokens.accessToken });
    } catch (err) {
      next(err);
    }
  };

  static me: RequestHandler = async (
    _req,
    res: TypedResponse<{ message: string }>
  ) => {
    res.json({ message: "ok" });
  };
}
