var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const dossierSchema = new mongoose.Schema(
  {
    status: {
      type: String,
    },
    type: {
      type: String,
      required: true,
    },
    provenance: {
      type: Schema.Types.ObjectId,
      ref: "Provenance",
    },
    statusCall: {
      type: String,
      required: true,
    },
    vendeur: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    categorie: {
      type: String,
      required: true,
    },
    entreprise: {
      type: String,
    },
    numeroEdOF: {
      type: String,
    },
    rappelGestionnaire: {
      type: Date,
    },
    dateRappel: {
      type: Date,
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: "Client",
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
      type: Schema.Types.ObjectId,
      ref: "Workshop",
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
      type: Schema.Types.ObjectId,
      ref: "Facturation",
    },

    files: {
      type: [String],
      default: [],
    },
    journalAppel: {
      type: [Schema.Types.ObjectId],
      ref: "JournalAppel",
    },
  },
  { timestamps: true }
);

const Dossier = mongoose.model("Dossier", dossierSchema);

exports.Dossier = Dossier;
