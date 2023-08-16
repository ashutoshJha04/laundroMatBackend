const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const Razorpay = require("razorpay");
const authRouter = require("./routes/auths");
const orderRouter = require("./routes/order");
const cors = require("cors");
const bodyParser = require('body-parser');
const laundryRouter = require('./routes/laundry');
app.use(express.json());

const path = require("path");
app.use(bodyParser.json());


app.use(cors());
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

dotenv.config();
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('connected mongo');
});

app.use(helmet({
  crossOriginResourcePolicy: false,
}));

// Define a route to handle payment initiation
app.post('/create-order', async (req, res) => {
  const { amount, currency } = req.body;

  const options = {
    amount: amount, // Amount in paise (India's smallest currency unit)
    currency: currency,
   
  };

  try {
    const order = await razorpay.orders.create(options);
    console.log(order);
    res.json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'An error occurred while creating the order.' });
  }
});


app.use(morgan("common"));


app.use("/api/auths", authRouter);
app.use("/api/order", orderRouter);
app.use("/api/laundry", laundryRouter);



  
 

app.get("/", (req, res) => {
    res.send('Welcome to homepage');
});

app.listen(8000, () => {
    console.log('Backend server is running');

});