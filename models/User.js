const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        max:20, 
    },
    email:{
        type:String,
        require:true,
        max:20, 
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:6
    },
    isVerified:{
        type:Boolean,
        default:false,
    }
    ,
    isAdmin:{
        type:Boolean,
        default:false,
    }
   
},
{timestamps:true}
);
module.exports = mongoose.model("User",UserSchema);