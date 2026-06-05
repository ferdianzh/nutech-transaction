// src/common/errors/auth.error.ts

export class AuthError extends Error {
  code = 108;
  constructor(message = "Unauthorized", code = 108) {
    super(message);
    this.name = "AuthError";
    this.code = code;
  }
}
