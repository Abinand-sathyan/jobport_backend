const express = require('express')
const router = express.Router()
const {userSignup,
    userLogin,
    googleAuth,
    recruiterSignup,
    recruiterlogin,
    adminlogin,
    otpverify,
    verifynumber,
    fgverifyotp,
    changepasword}=require('../controllers/AuthController')


router.post("/userSignup",userSignup)
router.post("/recruiterSignup",recruiterSignup)
router.post("/userLogin",userLogin)
router.post("/recruiterlogin",recruiterlogin)
router.post("/adminlogin",adminlogin)
router.post("/googleAuth",googleAuth)
router.post("/verifyotp",otpverify)
router.post("/verifynumber",verifynumber)
router.post("/fgverifyotp",fgverifyotp)
router.post("/changepasword",changepasword)


module.exports= router