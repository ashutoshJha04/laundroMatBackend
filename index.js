const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

const authRouter = require("./routes/auths");
const orderRouter = require("./routes/order");
const cors = require("cors");

const path = require("path");

app.use(cors());
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

dotenv.config();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('connected mongo');
});
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(express.json());
app.use(helmet({
  crossOriginResourcePolicy: false,
}));
app.use(morgan("common"));


app.use("/api/auths", authRouter);
app.use("/api/order", orderRouter);



  
 

app.get("/", (req, res) => {
    res.send('Welcome to homepage');
});

app.listen(8000, () => {
    console.log('Backend server is running');

});