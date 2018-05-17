export class FormatError {
  constructor(...params) {
    Error.call(this, ...params);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
    this.errCode = -100;
    this.statusCode = 409;
    this.message = params.message || "CODE -100: FORMAT ERROR";
  }
}
FormatError.prototype = Object.create(Error.prototype);
FormatError.prototype.constructor = FormatError;