const mongoose = require("mongoose");
require("dotenv").config();

const db = async function connectDb () {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database Connected");
  } catch (error) {
    console.log("Database Connection Failed: "+error);
    process.exit(1);
  }
};

module.exports = db;