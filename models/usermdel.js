const mongoose = require("mongoose");
const bcrypt=require('bcrypt') 
const UserSchema=new mongoose.Schema({
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    email_address:{
        type:String,
        required:true},

    password:{
        type:String,
       },
    mobile_number:{
        type:Number,
    },
    block:{
      type:Boolean,
      default:true
    },
    job: [
        {
          jobId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'jobmodel',
          },
          applied: {
            type: Boolean,
          },
          comment: {
            type: String,
          },
        },
      ],

},{ timestamps: true });
let user=mongoose.model('User',UserSchema)
module.exports=user;
