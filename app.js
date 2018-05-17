// LOAD DEPENDENCIES
import path from "path";
import express from "express";
import favicon from "serve-favicon";
import logger from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import sassMiddleware from "node-sass-middleware";
import apiRouter from "./routes/api";
import cors from "cors"

// LOAD CONFIG
import config from "./config";

// EXPRESS CONFIG
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  sassMiddleware({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    indentedSyntax: true, // true = .sass and false = .scss
    sourceMap: true
  })
);
app.use(
  sassMiddleware({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    indentedSyntax: true, // true = .sass and false = .scss
    sourceMap: true
  })
);
app.use(express.static(path.join(__dirname, "public")));

app.use(cors())
app.options("*", cors())

/* //크로스 도메인 해결법, app.use router 전에 해줘야댐
app.use(function log(req, res, next) {
  res.setHeader("Content-Type", "application/json");

  // res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // 크로스 도메인 해제, production에서는 절대 사용 X
  res.header(
    "Access-Control-Allow-Headers",
    "Credentials, Content-Type, Authorization, X-Requested-With, Accept"
  ); // POST parameter 허용해줌, 이거 안쓰면 options로 들어감
  res.header("Access-Control-Allow-Methods", "GET,PUT, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");

  // req.method === "OPTIONS" ? res.send(200) : next();
  console.log("## URL : " + req.originalUrl + " / IP : " + req.ip + " ##");
  next();
});
 */
app.use("/", apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
