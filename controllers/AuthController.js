const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const UserDB = require("../models/usermdel");
const RecuiterDB = require("../models/recuritermodel");
const adminDB = require("../models/adminmodel");
const { sendotp, verifyotp } = require("../Verification/otpverifiaction");
const { message } = require("antd");
const { default: mongoose } = require("mongoose");

const userSignup = async (req, res) => {
  try {
    const { Fname, Lname, Email, password, Cpassword, Mnumber } = req.body.data;

    if (Fname && Lname && Email && password && Cpassword && Mnumber) {
      if (!validator.isEmail(Email))
        return res
          .status(200)
          .send({ message: "Email not valid", success: false });

      if (!validator.isMobilePhone(Mnumber, "en-IN"))
        return res
          .status(200)
          .send({ message: "Phone Number is not valid", success: false });

      const User = await UserDB.findOne({ Email: Email });

      if (User)
        return res
          .status(200)
          .send({ message: "User already exist", success: false });

      if (password !== Cpassword)
        return res
          .status(200)
          .send({ message: "Password not same", sucess: false });

      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hash(password.trim(), salt);
      await sendotp(Mnumber);

      // const Newuser = new UserDB({
      //   first_name: Fname,
      //   last_name: Lname,
      //   email_address: Email,
      //   password: hashedPassword,
      //   mobile_number: Mnumber,
      // });
      // await Newuser.save();
      // const userToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      //   expiresIn: 60 * 60 * 24,
      // });
      res.status(201).send({ message: "signup successfully", success: true });
    } else {
      return res
        .status(200)
        .send({ message: "All fields must be filled", success: false });
    }
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: `Signup controller ${error.message}` });
  }
};

const otpverify = async (req, res) => {
  try {
    const otp = req.body.otp;
    const { Fname, Lname, Email, password, Mnumber } = req.body.data;
    await verifyotp(Mnumber, otp).then(async (verification_check) => {
      if (verification_check.status == "approved") {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password.trim(), salt);

        const Newuser = new UserDB({
          first_name: Fname,
          last_name: Lname,
          email_address: Email,
          password: hashedPassword,
          mobile_number: Mnumber,
        });
        await Newuser.save();
        res.status(201).send({ message: "signup successfully", success: true });
      } else {
        res
          .status(201)
          .send({ message: "Otp couldn't verified", success: false });
      }
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: `Signup controller ${error.message}` });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if ((email, password)) {
      const user = await UserDB.findOne({ email_address: email });

      if (!user)
        return status(200).send({
          message: "This email not exist",
          success: false,
        });

      const isMatch = bcrypt.compare(user.password, password);

      if (!isMatch)
        return status(200).send({
          message: " this password not valid",
          success: false,
        });

      const userToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: 60 * 60 * 24,
      });
      const username = user.first_name;
      const userid = user._id;

      res.status(200).send({
        messagr: "login success",
        success: true,
        username,
        userid,
        userToken,
      });
    } else {
      return res
        .status(200)
        .send({ message: "All fields must be filled", sucess: false });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: `Error in LOGIN controller ${error.message}`,
    });
  }
};

const googleAuth = async (req, res) => {
  try {
    const { given_name, family_name, email } = req.body.datas.data;

    const user = await UserDB.findOne({ email_address: email });

    if (user) {
      const userToken = jwt.sign(
        { id: user._id },

        process.env.JWT_SECRET_KEY,
        {
          expiresIn: 60 * 60 * 24,
        }
      );
      const username = user.first_name;
      const userid = user._id;
      return res.status(200).send({ 
        messagr: "login success",
        success: true,
        username,
        userid,
        userToken,
       });
    } else {
      const newUser = new UserDB({
        first_name: given_name,
        last_name: family_name,
        email_address: email,
      });

      await newUser.save();

      const userToken = jwt.sign(
        { id: newUser._id },

        process.env.JWT_SECRET_KEY,
        {
          expiresIn: 60 * 60 * 24,
        }
      );
      const username = newUser.first_name;
      const userid = newUser._id;

      res.status(200).send({
        messagr: "login success",
        success: true,
        username,
        userid,
        userToken,
      });
      // res.status(200).json(userToken);
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const recruiterSignup = async (req, res) => {
  try {
    const {
      concername,
      companyname,
      tagline,
      website,
      Email,
      password,
      discription,
      Cpassword,
      Mnumber,
      cimage,
    } = req.body.data;
    if (
      concername &&
      companyname &&
      tagline &&
      website &&
      Email &&
      password &&
      discription &&
      Cpassword &&
      Mnumber &&
      cimage
    ) {
      if (!validator.isEmail(Email))
        return res
          .status(200)
          .send({ message: "Email not valid", success: false });
      if (!validator.isMobilePhone(Mnumber, "en-IN"))
        return res
          .status(200)
          .send({ message: "Phone Number is not valid", success: false });

      const recruiter = await RecuiterDB.findOne({ Email: Email });

      if (recruiter)
        return res
          .status(200)
          .send({ message: "Recuiter already exist", success: false });

      if (password !== Cpassword)
        return res
          .status(200)
          .send({ message: "Password not same", sucess: false });

      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hash(password.trim(), salt);

      const Newrecruiter = new RecuiterDB({
        concern_name: concername,
        company_name: companyname,
        tagline: tagline,
        password: hashedPassword,
        mobile_number: Mnumber,
        website: website,
        Email: Email,
        discription: discription,
        company_image: cimage,
      });
      await Newrecruiter.save();
      return res
        .status(201)
        .send({ message: "signup successfully", success: true });
    }
    return res
      .status(200)
      .send({ message: "All fields must be filled", success: false });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: `Signup controller ${error.message}` });
  }
};

const recruiterlogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if ((email, password)) {
      const recruiter = await RecuiterDB.findOne({ Email: email });

      if (!recruiter)
        return status(200).send({
          message: "This email not exist",
          success: false,
        });

      const isMatch = bcrypt.compare(recruiter.password, password);

      if (!isMatch)
        return status(200).send({
          message: " this password not valid",
          success: false,
        });

      const recruiterToken = jwt.sign(
        { id: recruiter._id },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: 60 * 60 * 24,
        }
      );
      const recruitername = recruiter.concern_name;
      const recruiterid = recruiter._id;

      res.status(200).send({
        messagr: "login success",
        success: true,
        recruitername,
        recruiterid,
        recruiterToken,
      });
    } else {
      return res
        .status(200)
        .send({ message: "All fields must be filled", sucess: false });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: `Error in LOGIN controller ${error.message}`,
    });
  }
};

const adminlogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if ((email, password)) {
      const admin = await adminDB.findOne({ email: email });

      if (!admin)
        return status(200).send({
          message: "This email not exist",
          success: false,
        });

      const isMatch = bcrypt.compare(admin.password, password);

      if (!isMatch)
        return status(200).send({
          message: " this password not valid",
          success: false,
        });

      const adminToken = jwt.sign(
        { id: admin._id, role: "admin" },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: 60 * 60 * 24,
        }
      );
      const adminame = admin.Name;
      const adminId = admin._id;

      res.status(200).send({
        messagr: "login success",
        success: true,
        adminame,
        adminId,
        adminToken,
      });
    } else {
      return res
        .status(200)
        .send({ message: "All fields must be filled", sucess: false });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: `Error in LOGIN controller ${error.message}`,
    });
  }
};

const verifynumber = async (req, res) => {
  try {
    const phoneNumber = req.body.data.phoneNumber;
    const mNumber = parseInt(phoneNumber);
    const data = await UserDB.findOne({ mobile_number: mNumber });

    if (data) {
      res.json({ status: "success", data, success: true });
      sendotp(mNumber);
    } else {
      res
        .status(200)
        .send({ message: "Phone Number not Exist", success: false });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: `Error in VERIFY number ${error.message}`,
    });
  }
};

const fgverifyotp = async (req, res) => {
  const otp = req.body.otp;
  const data = req.body.data;
  const user = await UserDB.findOne({ _id: data });

  await verifyotp(user.mobile_number, otp).then(async (verification_check) => {
    if (verification_check.status == "approved") {
      res.status(201).send({ message: "Verify suceesfully", success: true });
    } else {
      res
        .status(200)
        .send({ message: "Otp couldn't verified", success: false });
    }
  });
};

const changepasword = async (req, res) => {
  const password = req.body.data.password;
  try {
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password.trim(), salt);
      await UserDB.findOneAndUpdate(
        { _id: req.body.userId },
        {
          $set: { password: hashPassword },
        }
      );
      res.json({ status: "success" });
    } else {
      res.json({ status: "failed", message: "Please Retry" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  userSignup,
  userLogin,
  googleAuth,
  recruiterSignup,
  recruiterlogin,
  adminlogin,
  otpverify,
  verifynumber,
  fgverifyotp,
  changepasword,
};
