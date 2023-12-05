const express = require("express");
const fs = require("fs");
const morgan = require("morgan");
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require("express-mongo-sanitize");
const xss = require('xss-clean');
const hpp = require("hpp");

const app = express();

const AppError = require("./utils/appError");
const globalErrorHandler = require('./controllers/errorController')
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

//1)Global Middlewares
//set securtiy http header
app.use(helmet());
//Middlewares
//env
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Limit requests from same Api
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too may requests from this IP please try again in an hour!'
});

app.use('/api',limiter);

//Body parser,reading data from body into req.body
app.use(express.json({limit: '10kb'}));

//Date sanitization against NoSQL query injection 
app.use(mongoSanitize());

//Data sanitization against XSS
app.use(xss());

//prevent parameter pollution
app.use(hpp({
  whitelist:[
    'duration',
    'ratingsQuantity',
    'ratingsAverage',
    'maxGroupSize',
    'difficulty',
    'price'
  ]
}));

//serving static files
app.use(express.static(`${__dirname}/public`));

// app.use((req, res, next) => {
//   console.log("Hello From The Middleware");
//   next();
// });

//Test middlewares
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

//Unhandle routes
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
