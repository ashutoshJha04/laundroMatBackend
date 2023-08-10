const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
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

           // Save the new user and respond
           const use = await newUser.save();
           return res.status(201).json({ message: 'User registered successfully' });
       }
   } catch (error) {
       console.log(error);
       res.status(500).json({ message: 'An error occurred' });
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