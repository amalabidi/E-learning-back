const mongoose = require("mongoose");

const EvaluationSchema = new mongoose.Schema({
  Attentes: {
    type: [String],
  },
  duree: {
    type: String,
  },
  ProchainesAttentes: {
    type: String,
  },
  autorisation: {
    type: Boolean,
    default: false,
  },
  Estimation: {
    type: String,
  },
  QuestionsRestées: {
    type: Boolean,
  },
  AvisPasserelle: {
    type: String,
  },
  AvisExplication: {
    type: String,
  },
  Suggestions: {
    type: String,
  },
});

const Evaluation = mongoose.model("Evaluation", EvaluationSchema);

exports.Evaluation = Evaluation;
