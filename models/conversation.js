const mongoose = require("mongoose");
const bcrypt=require('bcrypt') 
const ConversationSchema=new mongoose.Schema({
        members:{
            type:Array,
        }
          
},{ timestamps: true });
let conversation =mongoose.model('conversation',ConversationSchema)
module.exports=conversation;