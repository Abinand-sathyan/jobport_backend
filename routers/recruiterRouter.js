const express = require('express')
const router = express.Router()
const{addjobs,
    recruiterdata,
    jobdata,editjob,
    resumedata,
    subscriptiondata,
    payment,
    recruiteredit,
    hirecandidates,
    hiredcandidates,
    singlejobdata}=require("../controllers/Recruitercontroller")
const recruiterAuth=require("../middilwares/recruiterAuthmiddlewares")

router.post("/addjobs",recruiterAuth,addjobs)
router.get("/recruiterdata",recruiterAuth,recruiterdata)
router.get("/jobdata",recruiterAuth,jobdata)
router.post("/editjob",recruiterAuth,editjob)
router.post("/resumedata",recruiterAuth,resumedata)
router.get("/subscriptiondata",recruiterAuth,subscriptiondata)
router.post("/payment",recruiterAuth,payment)
router.post("/recruiteredit",recruiterAuth,recruiteredit)
router.post("/hirecandidates",recruiterAuth,hirecandidates)
router.get("/hiredcandidates",recruiterAuth,hiredcandidates)
router.post("/singlejobdata",recruiterAuth,singlejobdata)


module.exports= router