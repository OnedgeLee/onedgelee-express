export class AuthError {
  constructor(...params) {
    Error.call(this, ...params);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
    this.errCode = -200;
    this.statusCode = 401;
    this.message = params.message || "CODE -200: AUTHORIZATION ERROR";
  }
}
AuthError.prototype = Object.create(Error.prototype);
AuthError.prototype.constructor = AuthError;
