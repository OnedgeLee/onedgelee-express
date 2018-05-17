import models from "../../models";
import config from "../../config";
import jwt from "jsonwebtoken";
import * as logInError from "../../errors/auth/LogInError";
import uuidv1 from "uuid/v1";

/* EMAIL PASSWORD COMPARE */
export async function authenticate(req, res, next) {
  try {
    const results = await models.User.findOne({
      where: { userEmail: req.body.userEmail }
    });
    if (!results) {
      throw new logInError.EmailMissError();
    } else if (!results.comparePassword(req.body.userPassword)) {
      throw new logInError.PasswordMissError();
    } else if (!results.dataValues.userConfirmed) {
      throw new logInError.EmailConfirmError();
    } else {
      req.authedUser = results;
      next();
    }
  } catch (error) {
    next(error);
  }
}

/* GENERATE JWT */
export async function generateJwt(req, res, next) {
  try {
    if (req.authedUser) {
      const jwtPayload = {
        userEmail: req.authedUser.userEmail,
        userName: req.authedUser.userName,
        userRole: req.authedUser.userRole
      };
      const jwtSecret = config.logIn.jwt.jwtSecret;
      const jwtData = config.logIn.jwt.jwtData;
      jwtData.subject = "userInfo";
      req.token = jwt.sign(jwtPayload, jwtSecret, jwtData);
      await req.authedUser.update({ userRefreshToken: uuidv1() });
      next();
    }
  } catch (error) {
    next(error);
  }
}

/* RETURN JWT */
export function returnJwt(req, res) {
  try {
    if (req.authedUser && req.token) {
      return res.status(200).json({
        errCode: 0,
        contents: {
          token: req.token,
          userRefreshToken: req.authedUser.userRefreshToken
        }
      });
    } else {
      throw new logInError.TokenReturnError();
    }
  } catch (error) {
    next(error);
  }
}
