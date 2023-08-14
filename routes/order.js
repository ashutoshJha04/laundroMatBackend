const router = require("express").Router();
const User = require("../models/User");
const Order = require("../models/Order");
const nodemailer = require('nodemailer');

router.post("/", async (req, res) => {
    try {   
        const newOrder = new Order({
            userID: req.body.userID,
            username: req.body.username,
            email: req.body.email,
            quantity : req.body.quantity,
            City: req.body.city,
            package: req.body.service,
            serviceAmount: req.body.serviceAmount,
            payment: req.body.payment,
            totalAmount: req.body.totalAmount,
            houseVisit: req.body.houseVisit,
            longitude: req.body.longitude,
            latitude: req.body.latitude,
            razorpaymentId : req.body.id,
            razorpaymentorderId : req.body.ord_id,
            paid:req.body.paid,
            sign : req.body.sign,
        });
        const orDer = await newOrder.save();
        const transporter = nodemailer.createTransport({
            service: 'Gmail', // Use your email service provider
            auth: {
                user: 'mernstack04@gmail.com', // Replace with your email address
                pass: 'iruikehshifvervf' // Replace with your email password or an app-specific password
            }
        });
        const mailOptions = {
            from: 'mernstack04@gmail.com', // Sender address
            to: req.body.email , // List of recipients
            subject: 'Hello from Node.js', // Subject line
            text: `Thank you ${req.body.username} placing an order!we will connect you within an hour for ${req.body.service}`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });
        return res.status(200).json({ message: "Order placed"});
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
  });


module.exports = router;