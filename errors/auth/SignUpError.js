import { AuthError } from "./AuthError";

/* 상위 에러 */
export class SignUpError extends AuthError {
  constructor(...params) {
    super(...params);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
    this.errCode = -210;
    this.statusCode = 409;
    this.message = "CODE -210: SIGN_UP_ERROR";
  }
}

/* 하위 에러 */
export class EmailDupError extends SignUpError {
  constructor(...params) {
    super(...params);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
    this.errCode = -211;
    this.statusCode = 409;
    this.message = "CODE -211: DUPLICATED_EMAIL";
  }
}
export class NameDupError extends SignUpError {
  constructor(...params) {
    super(...params);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
    this.errCode = -212;
    this.statusCode = 409;
    this.message = "CODE -212: DUPLICATED_NAME";
  }
}
