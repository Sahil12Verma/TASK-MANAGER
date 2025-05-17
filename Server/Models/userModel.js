const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true, minLength: 3, maxLength: 30 },
    last_name: { type: String, required: true, minLength: 2, maxLength: 30 },
    email: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 200,
      unique: true,
    },
    phone: { type: String, required: true, minLength: 8, maxLength: 15 },
    password: { type: String, required: true, minLength: 3, maxLength: 1024 },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
