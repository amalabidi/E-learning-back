const mongoose = require("mongoose");

const ResetTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  resettoken: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    expires: 43200,
  },
});

const ResetToken = mongoose.model("ResetToken", ResetTokenSchema);
exports.ResetToken = ResetToken;
