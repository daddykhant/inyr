const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
  bookname: { type: String, required: true },
  year: {
    type: String,
    enum: ["first", "second", "third", "fourth", "fifth", "final"],
    required: true,
  },
  semester: {
    type: String,
    enum: ["1st_sem", "2nd_sem", "full_sem"],
    required: true,
  },
  description: { type: String, required: true },
  bookType: {
    type: String,
    enum: ["textbook", "thesis", "other"],
    required: true,
  },
  major: { type: String, required: true },
  driveLink: { type: String, required: true },
  thumbnail: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Book", bookSchema);
