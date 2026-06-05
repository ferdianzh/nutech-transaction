export class NotFoundError extends Error {
  code = 102;
  constructor(message = "Not Found", code = 102) {
    super(message);
    this.name = "NotFoundError";
    this.code = code;
  }
}
