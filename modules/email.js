const mongoose = require("mongoose");

const EmailSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  port: {
    type: Number,
  },
  host: {
    type: String,
  },
  login: {
    type: String,
  },
  password: {
    type: String,
  },
});

const Email = mongoose.model("Email", EmailSchema);

exports.Email = Email;
