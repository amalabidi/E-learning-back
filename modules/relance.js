const mongoose = require("mongoose");

const RelanceSchema = new mongoose.Schema({
  type: {
    type: String,
  },
  actif: {
    type: Boolean,
  },
  code_Tarif: {
    type: String,
  },
  nom: {
    type: String,
  },
  jour: {
    type: Number,
  },
  modeleMail: {
    type: String,
  },
  modeleSMS: {
    type: String,
  },
});

const Relance = mongoose.model("Relance", RelanceSchema);

exports.Relance = Relance;
