const messageDB = require("../models/Message");
const userDB = require("../models/usermdel");

const newmessage = async (req, res) => {
  try {
    const newmessage = await messageDB(req.body.message);
    const savedmesages = await newmessage.save();

    res.status(200).json(savedmesages);
  } catch (error) {
    res.status(500).json(Error);
  }
};

const getmessages = async (req, res) => {
  try {
    const conversationId = req.query.messagesId;
    const messages = await messageDB.find({ conversationId: conversationId });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json(Error);
  }
};

const usersdata = async (req, res) => {
  try {
    const userId = req.user_id;
    const userdata = await userDB.find({ _id: userId });

    if (userdata.length > 0) return res.status(200).send({ userdata });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  newmessage,
  getmessages,
  usersdata,
};
