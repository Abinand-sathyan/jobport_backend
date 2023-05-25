const express = require('express')
const router = express.Router()
const {userlist,
    recuiterlist,
    userblock,
    userunblock,
    recruiterblock,
    recruiterunblock,
    jobsdata,
    approvejob,
    pendingjob,
    addsubscription,
    subscriptiondata,
    getdashBoard,
    ReqSubscription,
    Subcancel}=require("../controllers/Admincontroller")
const adminAuthmiddlewares=require("../middilwares/adminAuthmiddlewares")


router.get("/userlist",adminAuthmiddlewares,userlist)
router.get("/recuiterlist",adminAuthmiddlewares,recuiterlist)
router.patch("/userblock",adminAuthmiddlewares,userblock)
router.patch("/userunblock",adminAuthmiddlewares,userunblock)
router.patch("/recruiterblock",adminAuthmiddlewares,recruiterblock)
router.patch("/recruiterunblock",adminAuthmiddlewares,recruiterunblock)
router.get("/jobsdata",adminAuthmiddlewares,jobsdata)
router.patch("/approvejob",adminAuthmiddlewares,approvejob)
router.patch("/pendingjob",adminAuthmiddlewares,pendingjob)
router.post("/addsubscription",adminAuthmiddlewares,addsubscription)
router.get("/subscriptiondata",adminAuthmiddlewares,subscriptiondata)
router.get("/ReqSub",adminAuthmiddlewares,ReqSubscription)
router.post("/Subcancel",adminAuthmiddlewares,Subcancel)
router.get("/getdashboard",getdashBoard)
module.exports= router