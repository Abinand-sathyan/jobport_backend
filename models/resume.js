const mongoose = require("mongoose");
const bcrypt=require('bcrypt') 
const resumeSchema=new mongoose.Schema({

    cname:{
            type:String,
          },

   userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
   },
        
   Jobtitle:{
            type:String,
           
        },
        
   country:{
            type:String,
          
        },
        
        state:{
            type:String,
        },
        
        city:{
            type:String,
        },
        
        jobtype:{
        type:String,
        },
        
        experience:{
            type:String,
        },
        
        exdescription:{
            type:String,
        },
        
        employeeimage:{
            type:String,
        },
        degree:{
            type:String,
           },
        
        degreename:{
            type:String,
           },

        edudescription:{
            type:String,
           },   
    }, { timestamps: true },);

let Resume=mongoose.model('Resume',resumeSchema)
module.exports=Resume;
