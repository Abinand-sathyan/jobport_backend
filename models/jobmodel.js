const mongoose = require("mongoose");
const bcrypt=require('bcrypt') 
const jobSchema=new mongoose.Schema({
    recruiterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recuiter',
     
    },

    jobTitle: {
      type: String,
     
    },

    companyname:{
        type:String
    },

     jobCategory: {
    
      type:String
     
    },

    jobQualification: {
      type: String,
     
    },
    vaccancy: {
      type: Number,
   
    },
    jobDiscription: {
      type: String,
   
    },
    workPlace: {
      type: String,
   
    },
    responsibilities: {
      type: String,
   
    },
    salaryRange: {
      type: String,
   
    },
    jobType: {
      type: String,
   
    },
    isActive: {
      type: Boolean,
      default: true,
    } ,
   applied: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
    },
    location: {
      type: String,
   
    },
    users: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        comment: {
          type: String,
        },
      },
    ],
    hired: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
}],
  },{ timestamps: true },);


let job=mongoose.model('job',jobSchema)
module.exports=job  ;