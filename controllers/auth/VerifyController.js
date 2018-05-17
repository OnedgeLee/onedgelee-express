import jwt from "jsonwebtoken";
import models from "../../models";
import * as logInError from "../../errors/auth/LogInError";

/* VERIFICATION */

export function verify(req, res) {
  res.json({
    code: 0,
    contents: req.decoded
  });
}

export async function gVerify(req, res) {
  try {
    req.gAuthedUser = await models.GUser.findOrCreate({
      where: {
        gUserId: req.gUserId
      },
      defaults: {
        gUserName: req.gUserGmail.substr(0, req.gUserGmail.length - 8),
        gUserGmail: req.gUserGmail
      }
    });
    req.gUserInfo = req.gAuthedUser[0].dataValues;
    delete req.gUserInfo.created_at;
    delete req.gUserInfo.updated_at;
    delete req.gUserInfo.deleted_at;

    res.json({
      code: 0,
      contents: req.gUserInfo
    });
  } catch (error) {
    next(error);
  }
}

/* REFRESH JWT */
export async function refreshJwt(req, res, next) {
  try {
    let token;
    const authHeader = req.headers["authorization"];
    if (authHeader) token = authHeader.split(" ")[1];
    req.authedUser = await models.User.findOne({
      where: {
        userEmail: jwt.decode(token).userEmail,
        userRefreshToken: req.body.userRefreshToken
      }
    });
    if (!req.authedUser) {
      throw new logInError.TokenRefreshError();
    }
    next();
  } catch (error) {
    next(error);
  }
}
