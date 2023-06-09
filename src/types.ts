import { Request, Response } from "express";
import { Send } from "express-serve-static-core";
import { Album, Photo } from "./db/schema";

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
  accessToken: string;
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

export interface AlbumWithPhotos extends Album {
  photos?: Photo[] | [];
}

export interface CreateAlbumRequest extends Request {
  body: {
    name: string;
    location: string;
    datapicker: string;
  };
}

export interface CreateAlbumResponse {
  message: string;
  album: Album;
}

export interface GetAlbumByIdResponse {
  data: AlbumWithPhotos;
}

export interface GetAllAlbumsResponse {
  data: Album[];
}

export interface UploadPhotosResponse {
  message: string;
}

export interface UploadPhotosRequest extends Request {
  body: {
    album: string;
    clients: string;
  };
}

export interface File {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}

export interface NewPhoto {
  photoId: string;
  unlockedPhotoUrl: string;
  unlockedThumbnailUrl: string;
  lockedPhotoUrl: string;
  lockedThumbnailUrl: string;
  albumId: string;
  clients: string | null;
}

export interface TypedResponse<ResBody> extends Response {
  json: Send<ResBody, this>;
}
