const mongoose = require("mongoose");
const OtpSchema = new mongoose.Schema({
    userID:{
        type:String,
        require:true,
        max:20, 
    },
    OTP:{
        type:Number, 
    }
   
},
{timestamps:true}
);
module.exports = mongoose.model("OTP",OtpSchema);