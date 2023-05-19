const ConvrsationDB = require("../models/conversation");
const recruiterDB = require("../models/recuritermodel");
const userDB = require("../models/usermdel");

const newconversation = async (req, res) => {
  try {
    const check = await ConvrsationDB.find({
      members: { $all: [req.body.senderId, req.body.recieverId] },
    });

    if (check.length !== 0) {
      res.status(201).send({ message: "already exist" });
    } else {
      const newcnversation = new ConvrsationDB({
        members: [req.body.senderId, req.body.recieverId],
      });

      const SavedConversation = await newcnversation.save();
      res.status(200).json(SavedConversation);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const getconversation = async (req, res) => {
  try {
    const userId = req.user_id;
    const conversation = await ConvrsationDB.find({
      members: { $in: [userId] },
    });
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getconverreqsation = async (req, res) => {
  try {
    const recruiter = req.recuiter_id;
    const conversation = await ConvrsationDB.find({
      members: { $in: [recruiter] },
    });
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json(error);
  }
};

const recruiters = async (req, res) => {
  try {
    const recruiterId = req.query.recruiterId;
    const recruiter = await recruiterDB.find({ _id: recruiterId });

    if (recruiter.length > 0) {
      res.status(201).send({ recruiter });
    } else {
      res.status(200);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const users = async (req, res) => {
  try {
    const userId = req.query.userId;
    const user = await userDB.find({ _id: userId });

    if (user.length > 0) {
      res.status(201).send({ user });
    } else {
      res.status(200);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  newconversation,
  getconversation,
  recruiters,
  getconverreqsation,
  users,
};
