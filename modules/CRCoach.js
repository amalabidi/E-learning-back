const mongoose = require("mongoose");

const CRCoachSchema = new mongoose.Schema({
  Connaissance: {
    type: Boolean,
    default: false,
  },
  CorrespondanceFormation: {
    type: Boolean,
  },
  ImplicationStagiaire: {
    type: Boolean,
  },
  CompteRenduFormation: {
    type: String,
  },
  ProgrammeVu: {
    type: Boolean,
  },
  ProgressionStagiaire: {
    type: Boolean,
  },
});

const CRCoach = mongoose.model("CRCoach", CRCoachSchema);

exports.CRCoach = CRCoach;
