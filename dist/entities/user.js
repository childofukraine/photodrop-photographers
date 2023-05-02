"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(login, password, userId, email, fullName) {
        this.login = login;
        this.password = password;
        this.userId = userId;
        this.email = email || null;
        this.fullName = fullName || null;
    }
}
exports.default = User;
