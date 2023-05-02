import { eq } from "drizzle-orm";
import db from "../db/database";
import { Session, sessionsTable } from "../db/schema";

const { database } = db;

export class SessionRepository {
  static async saveSession(newSession: Session): Promise<void> {
    await database.insert(sessionsTable).values(newSession);
  }

  static async getSessionByRefreshToken(
    refreshToken: string
  ): Promise<Session[] | null> {
    const session = await database
      .select()
      .from(sessionsTable)
      .where(eq(sessionsTable.refreshToken, refreshToken));
    if (!session.length) return null;
    return session;
  }

  static async deleteSessionById(id: string): Promise<void> {
    await database.delete(sessionsTable).where(eq(sessionsTable.sessionId, id));
  }

  static async updateSessionById(
    newSession: Session,
    id: string
  ): Promise<void> {
    await database
      .update(sessionsTable)
      .set(newSession)
      .where(eq(sessionsTable.sessionId, id));
  }
}
