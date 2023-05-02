"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = require("../controller/controller");
const isAuthorized_1 = require("../middlewares/isAuthorized");
const authValidators_1 = require("../validators/authValidators");
exports.router = (0, express_1.default)();
exports.router.post("/sign-up", authValidators_1.AuthValidator.checkSignUpBody, controller_1.Controller.signUp);
exports.router.post("/login", authValidators_1.AuthValidator.checkLoginBody, controller_1.Controller.logIn);
exports.router.post("/refresh", authValidators_1.AuthValidator.checkCookies, controller_1.Controller.refreshTokens);
exports.router.get("/me", isAuthorized_1.isAuthorized, controller_1.Controller.me);
exports.router.get("/get-all", controller_1.Controller.getAllUsers);
