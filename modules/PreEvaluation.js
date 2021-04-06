const mongoose = require("mongoose");

const PreEvaluationSchema = new mongoose.Schema({
  langue: {
    type: Boolean,
    default: false,
  },
  niveau: {
    type: String,
  },
  NiveauEstimation: {
    type: String,
  },
  note: {
    type: String,
  },
  Grammaire: {
    type: [String],
  },
  Vocabulaire: {
    type: [String],
  },
  comprehensionOrale: {
    type: [String],
  },
});

const PreEvaluation = mongoose.model("PreEvaluation", PreEvaluationSchema);

exports.PreEvaluation = PreEvaluation;
