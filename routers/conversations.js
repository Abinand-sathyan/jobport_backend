const express = require('express')
const router = express.Router()
const userAuth=require("../middilwares/userAuthmiddlewares")
const recruiterAuth=require("../middilwares/recruiterAuthmiddlewares")
const {newconversation,
    getconversation,
    recruiters,
    getconverreqsation,
    users
    }=require('../controllers/Conversation')

router.post("/newConversation",newconversation)
router.get("/getconversation",userAuth,getconversation)
router.get("/getconverreqsation",recruiterAuth,getconverreqsation)
router.get("/recruiters",recruiters)
router.get("/users",users)




module.exports= router