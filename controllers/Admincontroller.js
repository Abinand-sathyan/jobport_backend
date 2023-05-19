const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const UserDB = require("../models/usermdel");
const jobDB = require("../models/jobmodel");
const recruiterDB = require("../models/recuritermodel");
const subscriptonDB = require("../models/Subscription");

const userlist = async (req, res) => {
  try {
    const userlist = await UserDB.find();
    if (userlist.length > 0) return res.status(200).send({ userlist });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const recuiterlist = async (req, res) => {
  try {
    const recuiterlist = await recruiterDB.find();
    if (recuiterlist.length > 0) return res.status(200).send({ recuiterlist });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const userblock = async (req, res) => {
  try {
    const userId = req.body.userId;
    await UserDB.findByIdAndUpdate({ _id: userId }, { block: false });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const userunblock = async (req, res) => {
  try {
    const userId = req.body.userId;
    await UserDB.findByIdAndUpdate({ _id: userId }, { block: true });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const recruiterblock = async (req, res) => {
  try {
    const userId = req.body.userId;
    await recruiterDB.findByIdAndUpdate({ _id: userId }, { block: false });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const recruiterunblock = async (req, res) => {
  try {
    const userId = req.body.userId;
    await recruiterDB.findByIdAndUpdate({ _id: userId }, { block: true });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const jobsdata = async (req, res) => {
  try {
    const recruiterid = req.recuiter_id;
    const jobdata = await jobDB.find();

    if (jobdata.length > 0) return res.status(200).send({ jobdata });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const approvejob = async (req, res) => {
  try {
    const reqId = req.body.reqId;

    await jobDB.findByIdAndUpdate({ _id: reqId }, { isActive: false });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const pendingjob = async (req, res) => {
  try {
    const reqId = req.body.reqId;
    await jobDB.findByIdAndUpdate({ _id: reqId }, { isActive: true });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const addsubscription = async (req, res) => {
  try {
    const { limits, duration, fee, name } = req.body.data;
    if (limits && duration && fee && name) {
      const subscriptiondata = new subscriptonDB({
        limits,
        duration,
        subscription_fees: fee,
        subscriptioname: name,
      });

      await subscriptiondata.save();
      res.status(201).send({ success: true });
    } else {
      res.status(200).send({ success: false });
    }
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: `subscription ${error.message}` });
  }
};

const subscriptiondata = async (req, res) => {
  try {
    const subscriptiondata = await subscriptonDB.find();

    if (subscriptiondata.length > 0)
      return res.status(200).send({ subscriptiondata });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const getMonthName = (monthNumber) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[monthNumber - 1];
};

const getdashBoard = async(req, res) => {
  try{
  const saleReport = await subscriptonDB.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: "%m", date: "$createdAt" } },
        profit_count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  const result = saleReport.map((report) => {
    const month = getMonthName(report._id);
    report.month = month;
    return report;
});

const standard = await subscriptonDB.find({subscriptioname:"standard"}).count()
const basic = await subscriptonDB.find({subscriptioname:"basic"}).count()
const premium = await subscriptonDB.find({subscriptioname:"premium"}).count()

let data = [];
    data.push(standard);
    data.push(basic);
    data.push(premium);
res.status(200).json({ result, data });  
  }catch (error) {
   
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};






// const getMonthNameE = (monthNumber) => {
//   const months = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];
//   return months[monthNumber - 1];
// };

// export const getDashBord = async (req, res) => {
//   try {
//     const profit = await orderDb.aggregate([
//       {
//         $group: {
//           _id: { $dateToString: { format: "%m", date: "$createdAt" } },
//           profit_count: { $sum: 1 },
//         },
//       },
//       { $sort: { _id: 1 } },
//     ]);

//     const result = profit.map((report) => {
//       const month = getMonthName(report._id);
//       report.month = month;
//       return report;
//     });
//     const pending = await orderDb.find({ orderStatus: "pending" }).count();
//     const complete = await orderDb.find({ orderStatus: "complete" }).count();
//     const cancel = await orderDb.find({ orderStatus: "cancel" }).count();
//     const completePayment = await orderDb
//       .find({ orderStatus: "complete Payment" })
//       .count();
//     
//     let data = [];
//     data.push(pending);
//     data.push(complete);

//     data.push(cancel);
//     data.push(completePayment);

//     res.status(200).json({ result, data });
//   } catch (err) {
//     res.status(500).json({ error:"internal server error" });
//   }
// };

module.exports = {
  userlist,
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
};
