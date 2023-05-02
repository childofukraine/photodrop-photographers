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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const database_1 = __importDefault(require("../db/database"));
const schema_1 = require("../db/schema");
const { database } = database_1.default;
class UserRepository {
    static getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield database
                .select({
                login: schema_1.usersTable.login,
            })
                .from(schema_1.usersTable);
            if (!users.length)
                return [];
            return users;
        });
    }
    static getUsersByLogin(login) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield database
                .select()
                .from(schema_1.usersTable)
                .where((0, drizzle_orm_1.eq)(schema_1.usersTable.login, login));
            if (!user.length)
                return null;
            return user;
        });
    }
    static saveUser(newUser) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database.insert(schema_1.usersTable).values(newUser);
        });
    }
    static getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield database
                .select()
                .from(schema_1.usersTable)
                .where((0, drizzle_orm_1.eq)(schema_1.usersTable.userId, id));
            if (!user.length)
                return [];
            return user;
        });
    }
}
exports.UserRepository = UserRepository;
