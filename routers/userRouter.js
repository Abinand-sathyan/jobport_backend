const express = require('express')
const router = express.Router()
const{jobdata,
    jobapply,
    searchresult,
    resumebuild,
    resumedata,
    appliedjobs,
    searchjobterm,
    searchcompanyterm,
    searchlocationterm,
    recruiterdata,
    resumeedit}=require("../controllers/Usercontroller")
const userAuth=require("../middilwares/userAuthmiddlewares")

router.get("/jobdata",userAuth,jobdata)
router.patch("/jobapply",userAuth,jobapply)
router.post("/searchresult",userAuth,searchresult)
router.post("/resumebuild",userAuth,resumebuild)
router.post("/resumeedit",userAuth,resumeedit)
router.get("/resumedata",userAuth,resumedata)
router.get("/appliedjobs",userAuth,appliedjobs)
router.post("/searchjobterm",userAuth,searchjobterm)
router.post("/searchcompanyterm",userAuth,searchcompanyterm)
router.post("/searchlocationterm",userAuth,searchlocationterm)
router.get("/recruiterdata",userAuth,recruiterdata)
module.exports= router