import Router from "express";
import { Controller } from "../controller/controller";
import { upload } from "../libs/multer";
import { isAuthorized } from "../middlewares/isAuthorized";
import { AlbumValidator } from "../validators/albumValidator";
import { AuthValidator } from "../validators/authValidators";

export const router = Router();

router.post("/sign-up", AuthValidator.checkSignUpBody, Controller.signUp);
router.post("/login", AuthValidator.checkLoginBody, Controller.logIn);
router.post("/refresh", AuthValidator.checkCookies, Controller.refreshTokens);
router.get("/me", isAuthorized, Controller.me);

router.get("/get-all", Controller.getAllUsers);

router.post(
  "/create-album",
  isAuthorized,
  AlbumValidator.createAlbumBody,
  Controller.createAlbum
);
router.get("/get-album/:albumId", isAuthorized, Controller.getAlbumById);
router.get("/all-albums", isAuthorized, Controller.getAllAlbums);
router.post(
  "/upload-photos",
  isAuthorized,
  upload.array("files"),
  AlbumValidator.uploadPhotosToAlbumBody,
  Controller.uploadPhotos
);
