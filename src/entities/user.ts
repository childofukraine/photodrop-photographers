export default class User {
  login: string;

  password: string;

  userId: string;

  email: string | null;

  fullName: string | null;

  constructor(
    login: string,
    password: string,
    userId: string,
    email?: string,
    fullName?: string
  ) {
    this.login = login;
    this.password = password;
    this.userId = userId;
    this.email = email || null;
    this.fullName = fullName || null;
  }
}
