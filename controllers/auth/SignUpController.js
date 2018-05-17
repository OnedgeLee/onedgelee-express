import models from "../../models";
import Sequelize from "sequelize";
import * as signUpError from "../../errors/auth/SignUpError";
import config from "../../config";

/* USEREMAIL DUPLICATION CHECK */
export async function findUserEmail(req, res, next) {
  try {
    const results = await models.User.findOne({
      where: { userEmail: req.body.userEmail }
    });
    if (!results) {
      next();
    } else {
      throw new signUpError.EmailDupError();
    }
  } catch (error) {
    next(error);
  }
}

/* USERNAME DUPLICATION CHECK */
export async function findUserName(req, res, next) {
  try {
    const results = await models.User.findOne({
      where: Sequelize.where(
        Sequelize.fn("lower", Sequelize.col("user_name")),
        req.body.userName.toLowerCase()
      )
    });
    if (!results) {
      next();
    } else {
      throw new signUpError.NameDupError();
    }
  } catch (error) {
    next(error);
  }
}

/* CREATE USER */
export async function createUser(req, res, next) {
  try {
    await models.User.create({
      userEmail: req.body.userEmail,
      userPassword: req.body.userPassword,
      userName: req.body.userName
    });
    next()
    // return res.status(201).json({
    //   errCode: 0,
    //   contents: {
    //     userName: req.body.userName
    //   }
    // });
  } catch (error) {
    next(error);
  }
}
