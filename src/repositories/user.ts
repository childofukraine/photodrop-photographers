import { eq } from "drizzle-orm";
import db from "../db/database";
import { User, usersTable } from "../db/schema";
import { NewUser, UserLogin } from "../types";

const { database } = db;

export class UserRepository {
  static async getAllUsers(): Promise<UserLogin[] | []> {
    const users = await database
      .select({
        login: usersTable.login,
      })
      .from(usersTable);
    if (!users.length) return [];
    return users;
  }

  static async getUsersByLogin(login: string): Promise<User[] | null> {
    const user = await database
      .select()
      .from(usersTable)
      .where(eq(usersTable.login, login));
    if (!user.length) return null;
    return user;
  }

  static async saveUser(newUser: NewUser): Promise<void> {
    await database.insert(usersTable).values(newUser);
  }

  static async getUserById(id: string): Promise<User[] | []> {
    const user = await database
      .select()
      .from(usersTable)
      .where(eq(usersTable.userId, id));
    if (!user.length) return [];
    return user;
  }
}
