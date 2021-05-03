const mongoose = require("mongoose");

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
