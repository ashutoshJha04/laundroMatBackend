const router = require("express").Router();
const User = require("../models/User");
const OTP = require("../models/OTP");
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');
// Register
// router.post("/register",async(req,res)=>{
//      try {
//         //gen new pass
//         const salt =  await bcrypt.genSalt(10);
//         const hashed = await bcrypt.hash(req.body.password,salt);

//         const use = await User.findOne({email:req.body.username});
//         if(use){
//          return res.json(use);
//         }else{


//         //create new user
//         const newUser = new User({
//             username:req.body.username,
//             email:req.body.email,
//             password:hashed,
//          });
//          //save user and respond
//         const user = await newUser.save();
//       }



//      } catch (error) {
//         console.log(error);

//      }
// });
router.get("/verify/:otp", async (req, res) => {
    const otp = req.params.otp;
    const otpDocument = await OTP.findOne({ otp });
  const userid = otpDocument.userID ;
  const updatedUser = await User.findOneAndUpdate(
    { email: userid }, // Find the user by email
    { $set: { isVerified: true } },
    { new: true } // Return the updated document
);
const otpDoc = await OTP.findOneAndDelete({ otp });
    
    
  });

router.post("/register", async (req, res) => {
    try {
        // Generate new password hash
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.password, salt);

        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            // Send a message to the front end indicating that the email already exists
            return res.status(400).json({ message: 'Email already exists' });
        } else {
            // Create a new user
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashed,
            });



            // Create a transporter object using the default SMTP transport
            const transporter = nodemailer.createTransport({
                service: 'Gmail', // Use your email service provider
                auth: {
                    user: 'mernstack04@gmail.com', // Replace with your email address
                    pass: 'iruikehshifvervf' // Replace with your email password or an app-specific password
                }
            });
            // generate otp

                const otp = Math.floor(Math.random() *10000)+1;
                console.log(otp);
            // Define the email options
            const mailOptions = {
                from: 'mernstack04@gmail.com', // Sender address
                to: req.body.email , // List of recipients
                subject: 'Hello from Node.js', // Subject line
                text: `http://localhost:8000/api/auths/verify/${otp}`,
            };

            // Send the email
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log('Error:', error);
                } else {
                    console.log('Email sent:', info.response);
                }
            });

           

            // Save the new user and respond
            const use = await newUser.save();

            const newOTP = new OTP({
                userID: use.email,
                OTP : otp,
            });
            const newot = await newOTP.save();
            return res.status(201).json({ message: 'User registered successfully' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});


//Login

router.post("/login", async (req, res) => {
    console.log(req.body);
    try {
        const user = await User.findOne({ email: req.body.username });
        if (!user) {
            return res.status(400).json({ message: 'Email does not exist' });
        }

        const isValid = await bcrypt.compare(req.body.password, user.password);
        if (!isValid) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        res.json(user);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'An error occurred' });
    }
});

module.exports = router; 