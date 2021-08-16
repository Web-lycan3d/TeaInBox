/** @format */

const mongoose = require("mongoose");
const config = require("config");
const User = require("../models/User");

const mongoURI1 = config.get("mongoURI1");

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI1, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("Database is Connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
