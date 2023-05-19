const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const subscriptionSchema = new mongoose.Schema(
  {
    limits: {
      type: Number,
    },

    subscriptioname:{
       type:String
    },

    duration: {
      type: String,
    },

    subscriptioname: {
      type: String,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    
  applied: {
      type: Boolean,
      default: false,
    },
   
    RecruiterId: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: "Recuiter",
        }],
        
  },
  { timestamps: true }
);

let Subscription = mongoose.model("Subscription", subscriptionSchema);
module.exports = Subscription;