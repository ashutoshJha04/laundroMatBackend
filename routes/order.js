const router = require("express").Router();
const User = require("../models/User");
const Order = require("../models/Order");
const nodemailer = require('nodemailer');

router.delete('/deleteorder/:id', async (req, res) => {
    const orderId = req.params.id;
    try {
        // Find the order by ID and delete it
        const deletedOrder = await Order.findByIdAndDelete(orderId);
        
        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        return res.status(200).json({ message: 'Order deleted successfully', deletedOrder });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred' });
    }
});


router.get('/getorders', async (req, res) => {
    try {
        const orders = await Order.find(); // Retrieve all orders
        console.log(orders);
        return res.status(200).json({ orders }); // Sending the orders in the response
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
});

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
            houseVisit: req.body.homevisit,
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

  router.get('/getorders/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const order = await Order.find({ id }); // Corrected this line
      console.log(order);
      return res.status(200).json({order}); // Sending the order in the response
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  });

  router.get('/cancelOrder/:id',async function(req, res) {
try {
    const id = req.params.id;
    const order = await Order.findOneAndRemove({_id : id});
    return res.status(200).json({message: 'Cancelled'});
} catch (error) {
    return res.status(404).json({ message: error.message });
}
    

  });

module.exports = router;