import Api from "../api";

export default class UserService {
  constructor({ api = new Api() } = {}) {
    Object.seal(
      Object.assign(this, {
        api,
      })
    );
  }

  async getCurrentUser() {
    return this.api.request({
      path: "user",
    });
  }

  async updateUser(userData) {
    return this.api.request({
      method: "PUT",
      path: "user",
      data: userData,
    });
  }
}
