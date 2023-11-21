const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env'});
const app = require('./app');

// console.log(process.env);
const port = process.env.PORT;

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then (() => {
    console.log("Database Connected....!");
}).catch((err) => {
    console.log(err);
    console.log(("No Connection..."));
});

app.listen(port, () =>{
    console.log(`App running on Port ${port} ....`);
});