const mongoose = require("mongoose");
const LaundrySchema = new mongoose.Schema({

    username:{
        type: 'string',
    },
    password:{
        type: 'string',
    },
    laundryHead:{
        type:String,
    },
    address:{
        type:String,
    },
    servicesAtCost:{
        type:Object,
        default:{}
    },
    City:{
        type:String,
    },
   deliveryBoys:{
    type:Array,
    default:[]
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
   
},
{timestamps:true}
);
module.exports = mongoose.model("LAUNDRY",LaundrySchema);