const express = require("express");
const fs = require("fs");
const morgan = require("morgan");
const app = express();

const AppError = require("./utils/appError");
const globalErrorHandler = require('./controllers/errorController')
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

//Middlewares
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log("Hello From The Middleware");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  //   res.status(404).json({
  //     status: "fail",
  //     message: `Can't find ${req.originalUrl} on this server ! :(`,
  //   });

  //   const err = new Error(`Can't find ${req.originalUrl} on this server ! :(`);
  //   err.status = "fail";
  //   err.statusCode = 404;

  next(new AppError(`Can't find ${req.originalUrl} on this server ! :(`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
