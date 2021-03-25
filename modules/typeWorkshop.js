const mongoose = require("mongoose");

// Creating a user Schema
const TypeWorkshopSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  actif: {
    type: Boolean,
  },
});

const Type = mongoose.model("Type", TypeWorkshopSchema);

exports.Type = Type;
