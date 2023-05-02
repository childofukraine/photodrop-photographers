export class Session {
  sessionId: string;

  userId: string;

  refreshToken: string;

  expiresIn: Date;

  constructor(
    sessionId: string,
    userId: string,
    refreshToken: string,
    expiresIn: Date
  ) {
    this.sessionId = sessionId;
    this.userId = userId;
    this.refreshToken = refreshToken;
    this.expiresIn = expiresIn;
  }
}
