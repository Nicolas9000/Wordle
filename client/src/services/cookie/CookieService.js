import Cookies from "js-cookie";

export default class CookieService {
  async setCookie(jwt) {
    return Cookies.set("token", jwt);
  }

  async getCookie() {
    return Cookies.get("token");
  }
}
