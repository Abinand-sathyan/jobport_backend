const mongoose = require("mongoose");
var express = require("express");

const connectDb = async (DATABASE_URL) => {
  mongoose.set("strictQuery", false);
  try {
    const DB_OPTIONS = { dbName: "jopport" };
    await mongoose.connect(DATABASE_URL, DB_OPTIONS);
  } catch (error) {}
};
module.exports = connectDb;
