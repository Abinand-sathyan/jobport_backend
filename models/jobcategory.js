const mongoose = require("mongoose");
const bcrypt=require('bcrypt') 
const jobCategorySchema=new mongoose.Schema({
          categoryname:{
            type:String,
            required:true,
          },
          isActive:{
            type:Boolean,
            default:true
            }
          
},{ timestamps: true });
let jobCategory=mongoose.model('jobcategory',jobCategorySchema)
module.exports=jobCategory;