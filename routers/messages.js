const express = require('express')
const router = express.Router()
const userAuth=require("../middilwares/userAuthmiddlewares")
const {newmessage,
    getmessages,
    usersdata}=require('../controllers/Message')


router.post("/newmessage",newmessage)
router.get("/getmessages",getmessages)
router.get("/usersdata",userAuth,usersdata)



module.exports= router