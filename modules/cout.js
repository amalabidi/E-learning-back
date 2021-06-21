const mongoose = require("mongoose");

const CoutSchema = new mongoose.Schema({
  categorie: {
    type: String,
  },
  Designation: {
    type: String,
  },
  Date_fact: {
    type: Date,
    Default: Date.now,
  },
  Montant_ttc: {
    type: Number,
  },
  Montant_ht: {
    type: Number,
  },
  Montant_tva: {
    type: Number,
  },
  inclut :{
    type:Boolean
  },
  file: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Fichier",
  },
});

const Cout = mongoose.model("Cout", CoutSchema);

exports.Cout = Cout;