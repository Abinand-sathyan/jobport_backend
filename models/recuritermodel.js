const mongoose = require("mongoose");
const bcrypt=require('bcrypt') 
const recruiterSchema=new mongoose.Schema({
    concern_name:{
        type:String,
        required:true
    },
    
    company_name:{
        type:String,
        required:true
    },
    
    tagline:{
        type:String,
        required:true
    },
    
    website:{
        type:String,
    },

    subscription:{
        type:Boolean,
        default:false
    },
    
    subscriptiondate:{
        type:Date
      },
  
      subscriptionexpirydate:{
        type:Date
      },

  Email:{
        type:String,
    },
    
    discription:{
    type:String,
    },
    
    mobile_number:{
        type:Number,
    },
    
    company_image:{
        type:String,
    },
    
    password:{
        type:String,
       },
    
       block:{
      type:Boolean,
      default:true
    },
    
    location:{
        type:String,
    },
    
}, { timestamps: true },);


let recuiter=mongoose.model('Recuiter',recruiterSchema)
module.exports=recuiter;