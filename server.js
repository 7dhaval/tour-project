const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log("UNHANDLER EXCEPTION!! Shutting down...");
  console.log(err);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });
const app = require("./app");

// console.log(process.env);
const port = process.env.PORT;

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Database Connected....!");
  })
  .catch((err) => {
    console.log(err);
    console.log("No Connection...");
  });

const server = app.listen(port, () => {
  console.log(`App running on Port ${port} ....`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLER REJECTION!! Shutting down...");
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
