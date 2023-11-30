import client from "../database";

export class UserRequestLogin {
  private login: string;
  private keyPassword: string;
  private loginIsAdmin: boolean;
  private isLoginExist: boolean;

  constructor(login: string) {
    this.login = login;
    this.keyPassword = "";
    this.loginIsAdmin = false;
    this.isLoginExist = false;
  }

  async logRequest(): Promise<void> {
    try {
      const query = "SELECT * FROM users WHERE email = $1 or pseudo = $1";
      const values = [this.login];

      const result = await client.query(query, values);

      if (result.rows.length > 0) {
        this.keyPassword = result.rows[0].key_password;
        this.loginIsAdmin = result.rows[0].is_admin;
        this.isLoginExist = true;
        console.log(this.isLoginExist);

      }

    } catch (error) {
      console.error("Error inserting data:", error);
      throw error; // Propagate the error to handle it in the route
    } finally {
      // client.end();
    }
  }

  public async getIsLoginExist(): Promise<boolean> {
    await this.logRequest();
    return this.isLoginExist;
  }

  public async getKeyPassword(): Promise<string> {
    await this.logRequest();
    return this.keyPassword;
  }

  public async getIsIsAdmin(): Promise<boolean> {
    await this.logRequest();
    return this.loginIsAdmin;
  }

}
