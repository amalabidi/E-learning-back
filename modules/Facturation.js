const mongoose = require("mongoose");

const FacturationSchema = new mongoose.Schema({
  MontantFacture: {
    type: String,
  },
  CoutElearning: {
    type: String,
  },
  DateReglementElearning: {
    type: Date,
  },
  CoutCertification: {
    type: String,
  },
  DateReglementCertif: {
    type: Date,
  },
  ElearningPaye: {
    type: Boolean,
    default: false,
  },
  CertifPaye: {
    type: Boolean,
  },
  AutreCout1: {
    type: String,
  },
  AutreCout2: {
    type: String,
  },
  DateReglementCout1: {
    type: Date,
  },
  DateReglementCout2: {
    type: Date,
  },
  Cout1Paye: {
    type: Boolean,
  },
  Cout2Paye: {
    type: Boolean,
  },
  CoutCoach: {
    type: String,
  },
  DateReglementCoach: {
    type: Date,
  },
  CoachPaye: {
    type: Boolean,
  },
  CoutVendeur: {
    type: String,
  },
  DateReglementVendeur: {
    type: Date,
  },
  VendeurPaye: {
    type: Boolean,
  },
  Factor: {
    type: Boolean,
  },
});
const Facturation = mongoose.model("Facturation", FacturationSchema);

exports.Facturation = Facturation;
