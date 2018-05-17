import config from "../../config";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import models from "../../models";

export async function sendConfirmation(req, res, next) {
  try {
    let transporter = nodemailer.createTransport(config.confirm.smtp);
    const jwtPayload = { confirmEmail: req.body.userEmail };
    const jwtSecret = config.confirm.jwt.jwtSecret;
    const jwtData = config.confirm.jwt.jwtData;
    jwtData.subject = "confirmEmail";
    const token = jwt.sign(jwtPayload, jwtSecret, jwtData);
    const uri = `http://localhost:8099/auth/confirm/${token}`;
    let mailOptions = {
      from: "Omija.com <ex.onedge.lee@gmail.com>",
      to: req.body.userEmail,
      subject: "Omija Email Confirmation",
      html: `Please click this link to confirm your email: <a href="${uri}">${uri}</a>`
    };
    await transporter.sendMail(mailOptions);
    return res.status(201).json({
      errCode: 0,
      contents: {
        userName: req.body.userName
      }
    });
  } catch (error) {
    next(error);
  }
}

export async function receiveConfirmation(req, res, next) {
  try {
    const confirmedUser = jwt.verify(
      req.params.token,
      config.confirm.jwt.jwtSecret
    ).confirmEmail;
    await models.User.update(
      { userConfirmed: true },
      { where: { userEmail: confirmedUser } }
    );
    return res.redirect("http://localhost:3000/confirmed");
  } catch (error) {
    next(error);
  }
}
