const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    encryptedPassword: { type: String, required: true },
    pictureUrl: { type: String }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
