import ApiException from "./ApiException";
import CookieService from "../cookie";
export default class Api {
  async request({
    headers,
    path,
    method = "GET",
    data,
    contentType = "application/json",
  }) {
    try {
      const url = `${import.meta.env.VITE_API_URL}/api/${path}`;

      const contentTypeHeaders = contentType
        ? { "Content-Type": contentType }
        : {};

      const cookieService = new CookieService();
      const token = await cookieService.getCookie();

      const requestHeaders = { ...headers, ...contentTypeHeaders };

      if (token) {
        requestHeaders.Authorization = `Bearer ${token}`;
      }

      const requestBody =
        contentType === "application/json" ? JSON.stringify(data) : data;

      const response = await fetch(url, {
        method,
        headers: requestHeaders,
        body: requestBody,
      });

      if (!response.ok) {
        throw new ApiException(response);
      }

      return await response.json();
    } catch (err) {
      throw new ApiException(err);
    }
  }
}
