const router = require("express").Router();
const Laundry = require("../models/Laundry");
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
router.post('/laundryDetails',async (req,res)=>{
    const {laundryHead,servicesAtCost ,City,deliveryBoys,email,address,username,password} = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const newLaundry = new Laundry({
        username:username,
        password:hashed,
        laundryHead:laundryHead,
        servicesAtCost:servicesAtCost,
        City:City,
        deliveryBoys:deliveryBoys,
        email:email,
        address:address,
    });
    const use = await newLaundry.save();
    const transporter = nodemailer.createTransport({
        service: 'Gmail', // Use your email service provider
        auth: {
            user: 'mernstack04@gmail.com', // Replace with your email address
            pass: 'iruikehshifvervf' // Replace with your email password or an app-specific password
        }
    });
    const mailOptions = {
        from: 'mernstack04@gmail.com', 
        to: req.body.email , 
        subject: 'New laundry registerd', 
        text: `username: ${req.body.username} , password: ${req.body.password}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
});

router.post('/searchCity',async (req, res) => {
    const findLaundry = await Laundry.findOne({ City: req.body.City });
    const Details = {
        laundryName: findLaundry.laundryName,
        City: findLaundry.City,
        address: findLaundry.address,
        rating: findLaundry.rating,
    }
    res.json(Details);
})

module.exports = router;