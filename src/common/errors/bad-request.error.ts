export class BadRequestError extends Error {
  code = 102;
  constructor(message = "Bad Request", code = 102) {
    super(message);
    this.name = "BadRequestError";
    this.code = code;
  }
}
