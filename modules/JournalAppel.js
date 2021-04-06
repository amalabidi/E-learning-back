const mongoose = require("mongoose");

const JournalAppelSchema = new mongoose.Schema({
  Date: {
    type: Date,
    default: Date.now,
  },
  Sujet: {
    type: String,
  },
  Commentaire: {
    type: String,
  },
});

const JournalAppel = mongoose.model("JournalAppel ", JournalAppelSchema);

exports.JournalAppel = JournalAppel;
