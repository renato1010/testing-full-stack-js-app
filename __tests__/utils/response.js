export default class Response {
  status(statusCode) {
    this.status = statusCode;
    return this;
  }
  json(data) {
    return data;
  }
}
