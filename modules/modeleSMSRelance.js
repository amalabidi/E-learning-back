const mongoose = require("mongoose");

// Creating a user Schema
const ModeleSMSRelanceSchema = new mongoose.Schema({
  modele: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },
});

const ModeleSMSRelance = mongoose.model(
  "ModeleSMSRelance",
  ModeleSMSRelanceSchema
);

exports.ModeleSMSRelance = ModeleSMSRelance;
