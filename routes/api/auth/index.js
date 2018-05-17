import express from "express";
import models from "../../../models";
import * as authCtrl from "../../../controllers/auth";
import * as middlewares from "../../../middlewares";

var authRouter = express.Router();

/* SIGN UP */
authRouter.post(
  "/signup",
  middlewares.caseHandler,
  middlewares.signUpFormatValidator,
  authCtrl.findUserEmail,
  authCtrl.findUserName,
  authCtrl.createUser,
  authCtrl.sendConfirmation
);

/* LOG IN */
authRouter.post(
  "/login",
  middlewares.caseHandler,
  middlewares.logInFormatValidator,
  authCtrl.authenticate,
  authCtrl.generateJwt,
  authCtrl.returnJwt
);

/* REFRESH TOKEN */
authRouter.post(
  "/refreshToken",
  authCtrl.refreshJwt,
  authCtrl.generateJwt,
  authCtrl.returnJwt
);

/* CONFIRMAITION */
authRouter.get("/confirm/:token", authCtrl.receiveConfirmation);

/* VERIFY */
authRouter.use("/verify", middlewares.tokenVerifier);
authRouter.get("/verify", authCtrl.verify);

/* GOOGLE VERIFY */
authRouter.get("/gVerify", middlewares.gTokenVerifier, authCtrl.gVerify)

export default authRouter;
