const validator = require("validator");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const UserDB = require("../models/usermdel");
const jobDB = require("../models/jobmodel");
const resume = require("../models/resume");
const subscription = require("../models/Subscription");

const RecuiterDB = require("../models/recuritermodel");
const { message } = require("antd");

const addjobs = async (req, res) => {
  try {
    const recruiterid = req.recuiter_id;
    const {
      jobtitle,

      Jobtype,
      category,
      workplacetype,
      jobdescription,
      Jobqualification,
      responsibilities,
      salaryrange,
      vaccancy,
      Location,
      postlogo,
      companyname,
    } = req.body.data;

    if (
      jobtitle &&
      Jobtype &&
      category &&
      workplacetype &&
      jobdescription &&
      Jobqualification &&
      responsibilities &&
      salaryrange &&
      vaccancy &&
      Location &&
      postlogo &&
      companyname
    ) {
      const jobData = new jobDB({
        recruiterId: recruiterid,
        jobTitle: jobtitle,
        companyname: companyname,
        jobCategory: category,
        jobQualification: Jobqualification,
        vaccancy: vaccancy,
        jobDiscription: jobdescription,
        workPlace: workplacetype,
        responsibilities: responsibilities,
        salaryRange: salaryrange,
        jobType: Jobtype,
        image: postlogo,
        location: Location,
      });
      await jobData.save();
      res.status(201).send({ message: "Add job succesfully", success: true });
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

const recruiterdata = async (req, res) => {
  try {
    const recruiterid = req.recuiter_id;

    const recruiterdata = await RecuiterDB.find({ _id: recruiterid });

    if (recruiterdata.length > 0)
      return res.status(200).send({ recruiterdata });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const jobdata = async (req, res) => {
  try {
    const recruiterid = req.recuiter_id;
    const jobdata = await jobDB
      .find({ recruiterId: recruiterid })
      .populate("users.userId");
    if (jobdata.length > 0) return res.status(200).send({ jobdata });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const editjob = async (req, res) => {
  try {
    const {
      jobtitle,

      Jobtype,
      category,
      workplacetype,
      jobdescription,
      Jobqualification,
      responsibilities,
      salaryrange,
      vaccancy,
      Location,
      postlogo,
      companyname,
    } = req.body.data;

    if (
      jobtitle &&
      Jobtype &&
      category &&
      workplacetype &&
      jobdescription &&
      Jobqualification &&
      responsibilities &&
      salaryrange &&
      vaccancy &&
      Location &&
      postlogo
    ) {
      await jobDB.findByIdAndUpdate(req.body.SingleJobdata._id, {
        $set: {
          jobTitle: jobtitle,
          companyname: companyname,
          jobCategory: category,
          jobQualification: Jobqualification,
          vaccancy: vaccancy,
          jobDiscription: jobdescription,
          workPlace: workplacetype,
          responsibilities: responsibilities,
          salaryRange: salaryrange,
          jobType: Jobtype,
          image: postlogo,
          location: Location,
        },
      });
      res.status(201).send({ message: "Edit job succesfully", success: true });
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
    const userId = req.body.userId;
    const resumedata = await resume.find({ userId: userId }).populate("userId");

    if (resumedata.length > 0) return res.status(200).send({ resumedata });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const subscriptiondata = async (req, res) => {
  try {
    const subscriptiondata = await subscription.find();

    if (subscriptiondata.length > 0)
      return res.status(200).send({ subscriptiondata });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const payment = async (req, res) => {
  try {
    const recuiterId = req.recuiter_id;
    const recruiter = await subscription.find({
      RecruiterId: { $elemMatch: { $eq: recuiterId } },
    });

    if (recruiter == 0) {
      function calculateExpiryDate(startDate, monthsUntilExpiry) {
        const expiryDate = new Date(
          startDate.getTime() + monthsUntilExpiry * 30 * 24 * 60 * 60 * 1000
        );

        return expiryDate;
      }
      let period;
      const frmdata = new Date();

      const subscriptions = await subscription.findOne({ _id: req.body.subId });

      if (subscriptions.limits == 150) {
        period = 12;
      } else if (subscriptions.limits == 90) {
        period = 6;
      } else if (subscriptions.limits == 30) {
        period = 1;
      }

      const enddate = calculateExpiryDate(frmdata, period);

      const addsubscrption = await subscription.updateOne(
        { _id: req.body.subId },
        { $push: { RecruiterId: recuiterId } }
      );

      const reqdata = await RecuiterDB.findOneAndUpdate(
        { _id: recuiterId },
        {
          subscriptiondate: frmdata,
          subscriptionexpirydate: enddate,
          subscription: true,
        },
        { upsert: true }
      );
      res.status(201).send({ success: true });
    } else {
      res
        .status(200)
        .send({
          success: false,
          message: "You have already subscription plan",
        });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const recruiteredit = async (req, res) => {
  try {
    const recruiterid = req.recuiter_id;

    const {
      concername,
      companyname,
      tagline,
      website,
      Email,
      discription,
      Mnumber,
      // cimage
    } = req.body.reqdata;

    if (
      concername &&
      companyname &&
      tagline &&
      website &&
      Email &&
      discription &&
      Mnumber
    ) {
      const a = await RecuiterDB.findOneAndUpdate(
        { _id: recruiterid },
        {
          $set: {
            concern_name: concername,
            company_name: companyname,
            tagline: tagline,
            website: website,
            Email: Email,
            discription: discription,
            mobile_number: Mnumber,
            // company_image:cimage,
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

const hirecandidates = async (req, res) => {
  try {
    const Jobid = req.body.jobanduserId.jobid;
    const userId = req.body.jobanduserId.userid;
    const user = await UserDB.findById(userId);
    const job = await jobDB.findById(Jobid);
    const recruiterid = job.recruiterId;
    const recruiter = await RecuiterDB.findOne({ _id: recruiterid });

    const Email = user.email_address;

    const addsubscrption = await jobDB.updateOne(
      { _id: Jobid },
      { $push: { hired: userId } },
      { upsert: true }
    );
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.USER,
      to: Email,
      subject: "Congratulations! You have been hired",
      html: `<div>
        <h1>Congratulations!</h1>
        <p>Dear ${user.first_name},</p>
        <p>We are pleased to inform you that you have been selected for the position of ${job.jobCategory} at ${job.companyname}.</p>
        <p>Please contact us at ${recruiter.Email}/${recruiter.mobile_number} if you have any questions or concerns.</p>
        <p>Thank you for accepting our offer. We are looking forward to having you on our team!</p>
        <br>
        <p>Best regards,</p>
        <p>The ${job.companyname} team</p>
      </div>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
      } else {
      }
    });
    res.status(200).send({ success: true });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const hiredcandidates = async (req, res) => {
  try {
    const hiredcandidates = await jobDB
      .find({ recruiterId: req.recuiter_id, hired: { $exists: true } })
      .populate("hired");
    if (hiredcandidates.length > 0) {
      res.status(201).send({ hiredcandidates, success: true });
    } else {
      res.status(200).send({ success: false });
    }
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const singlejobdata = async (req, res) => {
  try {
    const jobid = req.body.jobId.jobId;
    const userId = req.body.jobId.usererId;

    const singlejob = await jobDB.find({
      _id: jobid,
      hired: { $in: [userId] },
    });

    if (singlejob.length > 0) {
      res.status(201).send({ singlejob, success: true });
    } else {
      res.status(200).send({ success: false });
    }
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

module.exports = {
  addjobs,
  recruiterdata,
  jobdata,
  editjob,
  resumedata,
  subscriptiondata,
  payment,
  recruiteredit,
  hirecandidates,
  hiredcandidates,
  singlejobdata,
};
