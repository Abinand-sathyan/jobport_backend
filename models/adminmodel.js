const mongoose = require('mongoose');


const adminschema = new mongoose.Schema({
    Name: {
      type: String,
       required: true,
    } ,
    email: {
    type: String,
     required: true,
  },
  password: {
    type: String,
    required: true,
    // trim:true,
    // minlength: [6],
  },
});

const admin = mongoose.model("admin",adminschema )
module.exports = admin