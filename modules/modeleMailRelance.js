const mongoose = require("mongoose");

const ModeleMailRelanceSchema = new mongoose.Schema({
  modele: {
    type: String,
    required: true,
  },
  objet: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

const ModeleMailRelance = mongoose.model(
  "ModeleMailRelance",
  ModeleMailRelanceSchema
);

exports.ModeleMailRelance = ModeleMailRelance;
