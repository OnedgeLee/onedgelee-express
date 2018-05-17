import { FormatError } from "./FormatError";

/* 상위 에러 */
export class UserFormatError extends FormatError {
  constructor(...params) {
    super(...params);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
    this.errCode = -110;
    this.statusCode = 401;
    this.message = params.message || "CODE -110: LOG_IN_ERROR";
  }
}

/* 하위 에러 */
export class EmailFormatError extends FormatError {
    constructor(...params) {
      super(...params);
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
      }
      this.errCode = -111;
      this.statusCode = 409;
      this.message = "CODE -111: MISMATCH_EMAIL_FORMAT";
    }
  }
  export class PasswordFormatError extends FormatError {
    constructor(...params) {
      super(...params);
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
      }
      this.errCode = -112;
      this.statusCode = 409;
      this.message = "CODE -112: MISMATCH_PASSWORD_FORMAT";
    }
  }
  export class NameFormatError extends FormatError {
    constructor(...params) {
      super(...params);
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
      }
      this.errCode = -113;
      this.statusCode = 409;
      this.message = "CODE -113: MISMATCH_NAME_FORMAT";
    }
  }
  