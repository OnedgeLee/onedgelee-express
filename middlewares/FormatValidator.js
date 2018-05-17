import config from "../config";
import * as userFormatError from "../errors/format/UserFormatError";

/* SIGN UP FORMAT VALIDATION */
export function signUpFormatValidator(req, res, next) {
  if (!config.regex.user.userEmail.test(req.body.userEmail)) {
    throw new userFormatError.EmailFormatError();
  } else if (!config.regex.user.userPassword.test(req.body.userPassword)) {
    throw new userFormatError.PasswordFormatError();
  } else if (!config.regex.user.userName.test(req.body.userName)) {
    throw new userFormatError.NameFormatError();
  } else {
    next();
  }
}
/* LOG IN FORMAT VALIDATION */
export function logInFormatValidator(req, res, next) {
  if (!config.regex.user.userEmail.test(req.body.userEmail)) {
    throw new userFormatError.EmailFormatError();
  } else if (!config.regex.user.userPassword.test(req.body.userPassword)) {
    throw new userFormatError.PasswordFormatError();
  } else {
    next();
  }
}
