const mongoose = require("mongoose");
const bcrypt=require('bcrypt') 
const MessageSchema=new mongoose.Schema({
        conversationId:{
            type:String,
        },
        sender:{
            type:String,
        },
        text:{
            type:String,
        },

          
},{ timestamps: true });
let message=mongoose.model('message',MessageSchema)
module.exports=message;