const mongoose = require("mongoose");

// Creating a user Schema
const WorkshopSchema = new mongoose.Schema({
  etat: {
    type: Boolean,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  environment: {
    type: String,
    required: true,
  },
  intitule: {
    type: String,
    maxlength: 250,
  },
  designation: {
    type: String,
    maxlength: 250,
  },
  reference: {
    type: String,
  },
  nombre_Heures: {
    type: Number,
  },
  tarif: {
    type: Number,
  },
  code_tarif: {
    type: String,
    required: true,
  },
  code_BFP: {
    type: String,
  },
  Url_Formation: {
    type: String,
  },
  prestataire_Elearning: {
    type: String,
  },
  Cout_Elearning: {
    type: Number,
  },
  CoutCertification: {
    type: Number,
  },
  PrestataireCertification: {
    type: String,
  },
  intituleCertification: {
    type: String,
  },
  UrlCertification: {
    type: String,
  },
  modalitePedagogique: {
    type: String,
    maxlength: 1000,
  },

  Objectifs: {
    type: String,
    maxlength: 1500,
  },
  Prerequis: {
    type: String,
  },
  resultats_attendus: {
    type: String,
    maxlength: 2000,
  },

  Duree: {
    type: String,
  },
  public: {
    type: String,
  },
  certification: {
    type: String,
  },
  contenu: {
    type: String,
    maxlength: 4000,
  },
  date_modif: {
    type: Date,
  }
});

// Creating a model from a Schema

const Workshop = mongoose.model("Workshop", WorkshopSchema);

exports.Workshop = Workshop;
