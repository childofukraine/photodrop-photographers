"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = void 0;
class Session {
    constructor(sessionId, userId, refreshToken, expiresIn) {
        this.sessionId = sessionId;
        this.userId = userId;
        this.refreshToken = refreshToken;
        this.expiresIn = expiresIn;
    }
}
exports.Session = Session;
