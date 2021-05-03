const mongoose = require("mongoose");

const BanqueSchema = new mongoose.Schema({
  type: {
    type: String,
  },
  nom: {
    nom: String,
    default: "",
  },
  NBIC: {
    type: String,
    default: "",
  },
  NIBAN: {
    type: String,
    default: "",
  },
});

const Banque = mongoose.model("Banque", BanqueSchema);

exports.Banque = Banque;
