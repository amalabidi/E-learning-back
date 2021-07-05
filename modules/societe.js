const mongoose = require("mongoose");

const SocieteSchema = new mongoose.Schema({
  representant: {
    type: String,
  },
  societe: {
    nom: String,
  },
  qualite:{
    type:String,
  },
  telephone: {
    type: String,
  },
  mail: {
    type: String,
  },
  url: {
    type: String,
  },
  adresse: {
    type: String,
  },
  code_postal: {
    type: Number,
  },
  ville: {
    type: String,
  },
  siret: {
    type: String,
  },
  SAS: {
    type: String,
  },
  RCS: {
    type: String,
    default: "",
  },
  TVA_infra: {
    type: String,
  },
  NDeclaration_activite: {
    type: String,
  },
  code_NAF: {
    type: String,
  },
  forme_juridique: {
    type: String,
  },
  region: {
    type: String,
  },
  banque_principal: {
    type: String,
  },
  banque_factor: {
    type: String,
  },
  logo: {
    type: String,
  },
  cachet: {
    type: String,
  },
  email_communication: {
    type: String,
  },
  email_relance: {
    type: String,
  },
});

const Societe = mongoose.model("Societe", SocieteSchema);

exports.Societe = Societe;
