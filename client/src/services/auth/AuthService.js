import Api from "../api";

export default class AuthService {
  constructor({ api = new Api() } = {}) {
    Object.seal(
      Object.assign(this, {
        api,
      })
    );
  }

  async register(registerData) {
    return this.api.request({
      method: "POST",
      path: "register",
      data: registerData,
    });
  }

  async login(loginData) {
    return this.api.request({
      method: "POST",
      path: "login",
      data: loginData,
    });
  }
}
