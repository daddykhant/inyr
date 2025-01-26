const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "editor"], required: true }, // Add role field
});

module.exports = mongoose.model("Admin", adminSchema);
