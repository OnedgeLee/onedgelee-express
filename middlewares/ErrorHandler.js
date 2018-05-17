import jwt from "jsonwebtoken";
import * as errors from "../errors";

export function errorHandler(error, req, res, next) {
  console.log(error);
  console.log(error.constructor);
  console.log(error.constructor.name);

  if (error instanceof jwt.TokenExpiredError) {
    /* TOKEN ERROR */
    return res
      .status(401)
      .json({ errCode: -120, contents: { message: error.message } });
  } else if (error instanceof jwt.JsonWebTokenError) {
    return res
      .status(401)
      .json({ errCode: -121, contents: { message: error.message } });
  } else if (!error.statusCode) {
    /* UNCAUGHT ERROR */
    return res
      .status(500)
      .json({ errCode: -1, contents: { message: error.message } });
  } else {
    /* CUSTOM ERROR */
    return res.status(error.statusCode).json({
      errCode: error.errCode,
      contents: { message: error.message }
    });
  }
}

// switch (error.constructor.name) {
//   /* TOKEN ERROR */
//   case "TokenExpiredError":
//     return res
//       .status(401)
//       .json({ errCode: -120, contents: { message: error.message } });
//     break;
//   case "JsonWebTokenError":
//     return res
//       .status(401)
//       .json({ errCode: -121, contents: { message: error.message } });
//     break;
//   default:
//     if (!error.statusCode) {
//       /* UNCAUGHT ERROR */
//       return res
//         .status(500)
//         .json({ errCode: -1, contents: { message: error.message } });
//     } else {
//       /* CUSTOM ERROR */
//       return res.status(error.statusCode).json({
//         errCode: error.errCode,
//         contents: { message: error.message }
//       });
//     }
// }
// }
