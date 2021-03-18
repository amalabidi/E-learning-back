const mongoose = require("mongoose");

// Creating a user Schema
const EnvironmentWorkshopSchema = new mongoose.Schema({
  environment: {
    type: String,
    required: true,
  },
  actif: {
    type: Boolean,
  },
});

const Environment = mongoose.model("Environment", EnvironmentWorkshopSchema);

exports.Environment = Environment;
