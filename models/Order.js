const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema({
    userID:{
        type:String, 
    },
    
    username:{
        type:String,
    },
    quantity:{
        type:Number, 
    },
    City:{
        type:String,
    },
    package:{
        type:String,
    },
    serviceAmount:{
        type:Number,
    },
    payment:{
        type:String,
    },
    totalAmount:{
        type:Number,
    },
    houseVisit:{
        type:Boolean,
        default:false,
    },
    orderStatus:{
        type:Number,
        default:1
    },
    longitude:{
        type:Number,
    },
    email:{
        type:String,
    }
    ,
    latitude:{
        type:Number,
    },
    deliveryboy:{
        type:String,
    },
    deliverynumber:{
        type:Number,
    },
    paid:{
        type:Boolean,
        default:false,
    }

   
},
{timestamps:true}
);
module.exports = mongoose.model("ORDER",OrderSchema);