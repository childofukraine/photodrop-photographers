import { Request, Response } from "express";
import { Send } from "express-serve-static-core";

export interface SignUpRequest extends Request {
  body: {
    login: string;
    password: string;
    email?: string;
    fullName?: string;
  };
}

export interface SignUpResponse {
  message: string;
  login: string;
  password: string;
}

export interface LogInRequest extends Request {
  body: {
    login: string;
    password: string;
  };
}

export interface AccessTokenInResponse {
  accessToken: string
}

export interface RefreshTokensRequest extends Request {
  cookies: {
    refreshToken: string;
  };
}

export interface NewUser {
  login: string;
  password: string;
  userId: string;
  email?: string | null;
  fullName?: string | null;
}

export interface UserLogin {
  login: string;
}
export interface TypedResponse<ResBody> extends Response {
  json: Send<ResBody, this>;
}
