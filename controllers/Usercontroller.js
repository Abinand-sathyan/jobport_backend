const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const UserDB = require("../models/usermdel");
const jobDB = require("../models/jobmodel");
const resume = require("../models/resume");
const Subscription = require("../models/Subscription");
const Recruiter = require("../models/recuritermodel");
const { default: mongoose } = require("mongoose");

const jobdata = async (req, res) => {
  try {
    let resumee = false;

    const user_id = req.user_id;

    const jobdata = await jobDB
      .find({ isActive: false })
      .populate("users.userId");

    const checksub = await resume.find({ userId: user_id });

    if (checksub.length > 0) {
      resumee = true;
    }
    if (jobdata.length > 0) {
      return res.status(200).send({ jobdata, success: true, resumee });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const jobapply = async (req, res) => {
  try {
    const jobId = req.body.jobId;
    const applycheck = await jobDB.find({
      "users.userId": req.user_id,
      _id: jobId,
    });

    const resumedata = await resume.find({ userId: req.user_id });

    if (resumedata.length >= 1) {
      if (applycheck.length == 0) {
        await UserDB.findByIdAndUpdate(
          { _id: req.user_id },
          { $push: { job: { jobId: jobId, applied: true } } },
          { upsert: true }
        );
        await jobDB.findByIdAndUpdate(
          { _id: jobId },
          { $push: { users: { userId: req.user_id } } },
          { upsert: true }
        );
        res.status(201).send({ success: true });
      } else {
        res.status(201).send({ applied: true });
      }
    } else {
      res.status(201).send({ resume: true });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const searchresult = async (req, res) => {
  const { catgory, company, location } = req.body.SearchText;

  const catgoryy = new RegExp(catgory, "i");
  const companyy = new RegExp(company, "i");
  const locations = new RegExp(location, "i");

  try {
    const SearchResult = await jobDB
      .find({
        $or: [
          {
            isActive: false,
            jobCategory: catgoryy,
            companyname: companyy,
            location: locations,
          },
        ],
      })
      .populate("users.userId");

    if (SearchResult.length > 0) return res.status(200).send({ SearchResult });
    else return res.status(201).send({ success: false });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const resumebuild = async (req, res) => {
  try {
    const userexperience = req.body.resumedata.experience;
    const usereducation = req.body.resumedata.education;
    const userId = req.user_id;

    const {
      cname,
      Jobtitle,
      country,
      state,
      city,
      jobtype,
      experience,
      description,
    } = userexperience;

    const { degree, degreename, schoolname, edudescription, prophoto } =
      usereducation;

    if (degree && degreename && schoolname && edudescription) {
      const resumedata = new resume({
        userId,
        cname,
        Jobtitle,
        country,
        state,
        city,
        jobtype,
        experience,
        exdescription: description,
        degree,
        degreename,
        employeeimage: prophoto,
        edudescription,
      });

      await resumedata.save();
    } else {
      return res
        .status(200)
        .send({ message: "All fields must be filled", success: false });
    }
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: `Add job controller ${error.message}` });
  }
};

const resumedata = async (req, res) => {
  try {
    const userId = req.user_id;
    const resumedata = await resume.find({ userId: userId }).populate("userId");

    if (resumedata.length > 0) return res.status(200).send({ resumedata });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const appliedjobs = async (req, res) => {
  try {
    userIdd = req.user_id;

    const jobs = await jobDB.find({
      "users.userId": new mongoose.Types.ObjectId(userIdd),
    });

    if (jobs.length > 0) return res.status(200).send({ jobs, success: true });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const searchjobterm = async (req, res) => {
  try {
    const jobterm = req.body.termjob;
    const catgoryy = new RegExp(jobterm, "i");
    const SearchResult = await jobDB
      .find({ isActive: false, jobCategory: catgoryy })
      .populate("users.userId");
    if (SearchResult.length > 0)
      return res.status(200).send({ SearchResult, success: true });
    else return res.status(201).send({ success: false });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const searchcompanyterm = async (req, res) => {
  try {
    const jobterm = req.body.termcompany;
    const company = new RegExp(jobterm, "i");
    const SearchResult = await jobDB
      .find({ isActive: false, companyname: company })
      .populate("users.userId");
    if (SearchResult.length > 0)
      return res.status(200).send({ SearchResult, success: true });
    else return res.status(201).send({ success: false });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const searchlocationterm = async (req, res) => {
  try {
    const jobterm = req.body.termlocation;
    const location = new RegExp(jobterm, "i");
    const SearchResult = await jobDB
      .find({ isActive: false, location: location })
      .populate("users.userId");
    if (SearchResult.length > 0)
      return res.status(200).send({ SearchResult, success: true });
    else return res.status(201).send({ success: false });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const recruiterdata = async (req, res) => {
  try {
    const recruiters = await Recruiter.find();
    if (recruiters.length > 0)
      return res.status(200).send({ recruiters, success: true });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const resumeedit = async (req, res) => {
  try {
    const userId = req.user_id;

    const {
      degree,
      degreename,
      schoolname,
      edudescription,
      prophoto,
      cname,
      Jobtitle,
      country,
      state,
      city,
      jobtype,
      experience,
      description,
    } = req.body.resumedata;
    if (
      degree &&
      degreename &&
      edudescription &&
      cname &&
      Jobtitle &&
      // country&&
      // state&&
      // city&&
      jobtype &&
      experience
    ) {
      const ab = await resume.findOne({ userId: userId });
      const a = await resume.updateOne(
        {
          userId: new mongoose.Types.ObjectId(userId),
        },
        {
          $set: {
            cname: cname,
            Jobtitle: Jobtitle,
            // jobCategory: category,
            country: country,
            state: state,
            city: city,
            jobtype: jobtype,
            experience: experience,
            degree: degree,
            degree: degreename,
            edudescription: edudescription,
            // employeeimage: prophoto,
          },
        },
        { upsert: true },
        { new: true }
      );

      res.status(200).send({ success: true });
    } else {
      res.status(201).send({ success: false });
    }
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

module.exports = {
  jobdata,
  jobapply,
  searchresult,
  resumebuild,
  resumedata,
  appliedjobs,
  searchjobterm,
  searchcompanyterm,
  searchlocationterm,
  recruiterdata,
  resumeedit,
};
