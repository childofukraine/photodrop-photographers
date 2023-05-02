import Router from "express";
import { Controller } from "../controller/controller";
import { isAuthorized } from "../middlewares/isAuthorized";
import { AuthValidator } from "../validators/authValidators";

export const router = Router();

router.post("/sign-up", AuthValidator.checkSignUpBody, Controller.signUp);
router.post("/login", AuthValidator.checkLoginBody, Controller.logIn);
router.post("/refresh", AuthValidator.checkCookies, Controller.refreshTokens);
router.get("/me",isAuthorized,Controller.me)

router.get("/get-all", Controller.getAllUsers);
