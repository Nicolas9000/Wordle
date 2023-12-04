export default class ApiException extends Error {
  constructor(data) {
    super();
    this.message = data.message || "";
  }
}
