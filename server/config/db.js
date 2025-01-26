const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://khantthihazaw2018:buIVqARiQybb6Cmb@cluster0.turb5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("mongodb connected");
  } catch (error) {
    console.error("MongoDB connection failed", error.message);
  }
};
module.exports = connectDB;
