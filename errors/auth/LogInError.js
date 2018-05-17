import { AuthError } from "./AuthError";

/* 상위 에러 */
export class LogInError extends AuthError {
  constructor(...params) {
    super(...params);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
    this.errCode = -220;
    this.statusCode = 401;
    this.message = params.message || "CODE -220: LOG_IN_ERROR";
  }
}

/* 하위 에러 */
export class EmailMissError extends LogInError {
  constructor(...params) {
    super(...params);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
    this.errCode = -221;
    this.statusCode = 401;
    this.message = params.message || "CODE -221: EMAIL_ABSENT";
  }
}
export class PasswordMissError extends LogInError {
  constructor(...params) {
    super(...params);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
    this.errCode = -222;
    this.statusCode = 401;
    this.message = "CODE -222: INCORRECT_PASSWORD";
  }
}
export class EmailConfirmError extends LogInError {
  constructor(...params) {
    super(...params);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
    this.errCode = -223;
    this.statusCode = 401;
    this.message = "CODE -223: NOT_CONFIRMED_EMAIL";
  }
}
export class TokenRefreshError extends LogInError {
  constructor(...params) {
    super(...params);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
    this.errCode = -224;
    this.statusCode = 401;
    this.message = "CODE -224: JWT_REFRESH_TOKEN DO NOT MATCH";
  }
}
export class TokenReturnError extends LogInError {
  constructor(...params) {
    super(...params);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
    this.errCode = -225;
    this.statusCode = 401;
    this.message = "CODE -225: LOG_IN_FAILURE";
  }
}
export class GTokenMissingError extends LogInError {
  constructor(...params) {
    super(...params);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
    this.errCode = -226;
    this.statusCode = 401;
    this.message = "CODE -225: NOT_LOGGED_IN_GOOGLE";
  }
}