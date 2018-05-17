import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import config from "../config";
import * as logInError from "../errors/auth/LogInError";

/* VERIFYING */
export async function tokenVerifier(req, res, next) {
  let token;
  const authHeader = req.headers["authorization"];
  if (authHeader) token = authHeader.split(" ")[1];
  await jwt.verify(token, config.logIn.jwt.jwtSecret, (error, decoded) => {
    if (error) {
      next(error);
    } else {
      req.decoded = decoded;
      next();
    }
  });
}

/* GOOGLE TOKEN VERIFYING */
export async function gTokenVerifier(req, res, next) {
  try {
    let token;
    const authHeader = req.headers["authorization"];
    const client = new OAuth2Client(
      "81459934336-5om0irnvrnuult3t863d8sahkbj5o7ps.apps.googleusercontent.com"
    );
    if (authHeader) token = authHeader.split(" ")[1];
    // if (!token) {
    //   throw new logInError.GTokenMissingError();
    // }
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience:
        "81459934336-5om0irnvrnuult3t863d8sahkbj5o7ps.apps.googleusercontent.com"
    });
    const payload = ticket.getPayload();
    req.gUserId = payload.sub;
    req.gUserGmail = payload.email;
    next();
  } catch (error) {
    next(error);
  }
}
