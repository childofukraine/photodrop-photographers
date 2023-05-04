"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const boom_1 = __importDefault(require("@hapi/boom"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const uuid_1 = require("uuid");
const user_1 = require("../repositories/user");
const user_2 = __importDefault(require("../entities/user"));
const jwtTokens_1 = require("../libs/jwtTokens");
const session_1 = require("../entities/session");
const session_2 = require("../repositories/session");
const getUserIdFromToken_1 = require("../libs/getUserIdFromToken");
const album_1 = require("../entities/album");
const album_2 = require("../repositories/album");
class Controller {
}
exports.Controller = Controller;
_a = Controller;
Controller.getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.UserRepository.getAllUsers();
        if (!users)
            throw boom_1.default.notFound();
        res.status(200).json(users);
    }
    catch (err) {
        next(err);
    }
});
Controller.signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const login = req.body.login.toLowerCase();
    const { password, email, fullName } = req.body;
    try {
        const userExist = yield user_1.UserRepository.getUsersByLogin(login);
        if (userExist)
            throw boom_1.default.conflict(`User with login - ${login} is exist.`);
        const hashedPassword = yield bcryptjs_1.default.hash(password, 7);
        const newUser = new user_2.default(login, hashedPassword, (0, uuid_1.v4)(), email, fullName);
        yield user_1.UserRepository.saveUser(newUser);
        res.status(200).json({ message: "User is registered.", login, password });
    }
    catch (err) {
        next(err);
    }
});
Controller.logIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const login = req.body.login.toLowerCase();
    const { password } = req.body;
    try {
        const user = yield user_1.UserRepository.getUsersByLogin(login);
        if (!user)
            throw boom_1.default.notFound(`User with login - ${login} isn't exist.`);
        const { userId } = user[0];
        const hashedPassword = user[0].password;
        yield bcryptjs_1.default.compare(password, hashedPassword).then((same) => {
            if (!same)
                throw boom_1.default.badRequest("Password is incorrect.");
        });
        const tokens = (0, jwtTokens_1.createTokens)(userId);
        // session expire in - 5 days
        const refreshTokenExpTime = Math.floor(Date.now() + 432000000);
        const sessionExpireTimestamp = new Date(refreshTokenExpTime);
        const newSession = new session_1.Session((0, uuid_1.v4)(), userId, tokens.refreshToken, sessionExpireTimestamp);
        yield session_2.SessionRepository.saveSession(newSession);
        res
            .cookie("refreshToken", tokens.refreshToken, {
            httpOnly: true,
            sameSite: "strict",
        })
            .json({ accessToken: tokens.accessToken });
    }
    catch (err) {
        next(err);
    }
});
Controller.refreshTokens = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    try {
        const session = yield session_2.SessionRepository.getSessionByRefreshToken(refreshToken);
        if (!session)
            throw boom_1.default.badRequest("Invalid refresh token.");
        const timeStamp = new Date(Date.now()).toJSON();
        if (Date.parse(timeStamp) >=
            Date.parse(session[0].expiresIn)) {
            yield session_2.SessionRepository.deleteSessionById(session[0].sessionId);
            throw boom_1.default.unauthorized("Session is expired, please log-in.");
        }
        const newTokens = (0, jwtTokens_1.createTokens)(session[0].userId);
        const refreshTokenExpTime = Math.floor(Date.now() + 432000000);
        const sessionExpireTimestamp = new Date(refreshTokenExpTime);
        const newSession = new session_1.Session(session[0].sessionId, session[0].userId, newTokens.refreshToken, sessionExpireTimestamp);
        yield session_2.SessionRepository.updateSessionById(newSession, session[0].sessionId);
        res
            .cookie("refreshToken", newTokens.refreshToken, {
            httpOnly: true,
            sameSite: "strict",
        })
            .json({ accessToken: newTokens.accessToken });
    }
    catch (err) {
        next(err);
    }
});
Controller.me = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ message: "ok" });
});
Controller.createAlbum = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const userId = (0, getUserIdFromToken_1.getUserIdFromToken)((_b = req.header("Authorization")) === null || _b === void 0 ? void 0 : _b.replace("Bearer ", ""));
    const { name, location } = req.body;
    try {
        const createdAt = new Date(Date.now());
        const newAlbum = new album_1.Album((0, uuid_1.v4)(), name, location, createdAt, userId);
        yield album_2.AlbumRepository.saveAlbum(newAlbum);
        res.json({ message: "Album created", album: newAlbum });
    }
    catch (err) {
        next(err);
    }
});
Controller.getAlbumById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { albumId } = req.params;
    try {
        const albumWithPhotos = yield album_2.AlbumRepository.getAlbumWithPhotosById(albumId);
        if (!albumWithPhotos)
            throw boom_1.default.notFound();
        res.json({ data: albumWithPhotos });
    }
    catch (err) {
        next(err);
    }
});
Controller.getAllAlbums = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const userId = (0, getUserIdFromToken_1.getUserIdFromToken)((_c = req.header("Authorization")) === null || _c === void 0 ? void 0 : _c.replace("Bearer ", ""));
    try {
        const albums = yield album_2.AlbumRepository.getAllAlbumsByUserId(userId);
        if (!albums)
            throw boom_1.default.notFound();
        res.json({ data: albums });
    }
    catch (err) {
        next(err);
    }
});
