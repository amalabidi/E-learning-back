var mongoose = require("mongoose");

const dossierSchema = new mongoose.Schema({
  status: {
    type: String,
  },
  type: {
    type: String,
    required: true,
  },
  provenance: {
    type: String,
    required: true,
  },
  statusCall: {
    type: String,
    required: true,
  },
  vendeur: { type: String, required: true },
  categorie: {
    type: String,
    required: true,
  },
  entreprise: {
    type: String,
  },
  numeroEDOF: {
    type: String,
  },
  rappelGestionnaire: {
    type: Date,
  },
  dateRappel: {
    type: Date,
  },
  client: {
    type: String,
    required: true,
  },
  confidentialObservation: {
    type: String,
  },
  observation: {
    // a folder has two listes of observation : normal obervations and tracking observations
    type: [String],
  },
  tracking: {
    type: [String],
  },
  idWorkshop: {
    type: String,
  },
  priseEnCharge: {
    type: String,
    required: true,
    default: "CPF",
  },
  remise: {
    type: String,
  },
  workshopBeginDate: {
    type: Date,
  },
  workshopEndDate: {
    type: Date,
  },
  workshopDescription: {
    // la formation a été
    type: String,
  },
  coaching: {
    type: Boolean,
    default: false,
  },
  coach: {
    type: String,
  },
  certification: {
    type: Boolean,
  },
  certificationId: {
    type: String,
    default: false,
  },
  certificationPassword: {
    type: String,
  },
  appointments: {
    type: [Date],
    maxlength: 4,
  },
  performedAppointments: {
    type: [Boolean],
    required: function () {
      return this.performedAppointments.length < 3;
    },
  },
  appointmentsObservation: {
    type: [String],
  },
  preEvaluation: {
    type: String,
  },
  evaluation: {
    type: String,
  },
  crCoach: {
    type: String,
  },
  facturation: {
    type: String,
  },
  files: {
    type: [String],
    default: null,
  },
});

const Dossier = mongoose.model("Dossier", dossierSchema);

exports.Dossier = Dossier;
