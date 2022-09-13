var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const paginate = require("express-paginate");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var authRouter = require("./routes/auth");
var googleLoginRouter = require("./routes/googleLogin");
var shortletsRouter = require("./routes/shortlets");
var paymentRouter = require("./routes/bookPayment");
var verifyPaymentRouter = require("./routes/verifyPayment");

var app = express();

//directing http to https port
app.all("*", (req, res, next) => {
  if (req.secure) {
    return next();
  } else {
    res.redirect(
      307,
      "https://" + req.hostname + ":" + app.get("secPort") + req.url
    );
  }
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/v1/googleLogin", googleLoginRouter);
app.use("/api/v1/oauth/google", authRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/shortlets", shortletsRouter);
app.use("/api/v1/payment", paymentRouter);
app.use("/api/v1/payment/callback", verifyPaymentRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
